import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Ingredients (INCI): textarea (varchar) → richText (jsonb, lexical-стейт).
// Прямий ALTER SET DATA TYPE неможливий (каста varchar→jsonb немає), тож:
// rename → add jsonb → UPDATE-конвертація → drop тимчасової колонки. Guard по
// information_schema (data_type = varchar) робить стейтменти ідемпотентними: у dev
// адаптер пушить схему напряму, а власник застосовує SQL у Supabase вручну —
// повторний запуск через `payload migrate` на деплої має пройти як no-op.
// Текст конвертуємо у lexical-дерево root > paragraph(и) > text: split по \n
// (CRLF чистимо), порожні рядки пропускаємо; порожній/пробільний текст → NULL.
// Обидві таблиці (products і _products_v) — в одному DO-блоці: без копії у
// versions адмінка (drafts) показала б порожнє поле і наступний save затер би дані.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'products'
        AND column_name = 'ingredients' AND data_type = 'character varying'
    ) THEN
      ALTER TABLE "products" RENAME COLUMN "ingredients" TO "ingredients_txt";
      ALTER TABLE "products" ADD COLUMN "ingredients" jsonb;

      UPDATE "products" p
      SET "ingredients" = jsonb_build_object('root', jsonb_build_object(
        'type', 'root', 'version', 1, 'direction', 'ltr', 'format', '', 'indent', 0,
        'children', src.paragraphs
      ))
      FROM (
        SELECT t."id" AS pid,
               jsonb_agg(
                 jsonb_build_object(
                   'type', 'paragraph', 'version', 1, 'direction', 'ltr',
                   'format', '', 'indent', 0, 'textFormat', 0, 'textStyle', '',
                   'children', jsonb_build_array(jsonb_build_object(
                     'type', 'text', 'version', 1, 'detail', 0, 'format', 0,
                     'mode', 'normal', 'style', '', 'text', line.txt
                   ))
                 ) ORDER BY line.ord
               ) AS paragraphs
        FROM "products" t
        CROSS JOIN LATERAL (
          SELECT btrim(part) AS txt, ord
          FROM unnest(string_to_array(replace(t."ingredients_txt", chr(13), ''), chr(10)))
               WITH ORDINALITY AS u(part, ord)
          WHERE btrim(part) <> ''
        ) line
        WHERE COALESCE(btrim(t."ingredients_txt"), '') <> ''
        GROUP BY t."id"
      ) src
      WHERE p."id" = src.pid;

      ALTER TABLE "products" DROP COLUMN "ingredients_txt";
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '_products_v'
        AND column_name = 'version_ingredients' AND data_type = 'character varying'
    ) THEN
      ALTER TABLE "_products_v" RENAME COLUMN "version_ingredients" TO "version_ingredients_txt";
      ALTER TABLE "_products_v" ADD COLUMN "version_ingredients" jsonb;

      UPDATE "_products_v" v
      SET "version_ingredients" = jsonb_build_object('root', jsonb_build_object(
        'type', 'root', 'version', 1, 'direction', 'ltr', 'format', '', 'indent', 0,
        'children', src.paragraphs
      ))
      FROM (
        SELECT t."id" AS pid,
               jsonb_agg(
                 jsonb_build_object(
                   'type', 'paragraph', 'version', 1, 'direction', 'ltr',
                   'format', '', 'indent', 0, 'textFormat', 0, 'textStyle', '',
                   'children', jsonb_build_array(jsonb_build_object(
                     'type', 'text', 'version', 1, 'detail', 0, 'format', 0,
                     'mode', 'normal', 'style', '', 'text', line.txt
                   ))
                 ) ORDER BY line.ord
               ) AS paragraphs
        FROM "_products_v" t
        CROSS JOIN LATERAL (
          SELECT btrim(part) AS txt, ord
          FROM unnest(string_to_array(replace(t."version_ingredients_txt", chr(13), ''), chr(10)))
               WITH ORDINALITY AS u(part, ord)
          WHERE btrim(part) <> ''
        ) line
        WHERE COALESCE(btrim(t."version_ingredients_txt"), '') <> ''
        GROUP BY t."id"
      ) src
      WHERE v."id" = src.pid;

      ALTER TABLE "_products_v" DROP COLUMN "version_ingredients_txt";
    END IF;
  END $$;`)
}

// Відкат: jsonb → varchar. Текст витягуємо з text-вузлів (абзаци склеюємо через \n) —
// форматування втрачається, як і в down() попередніх міграцій.
export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'products'
        AND column_name = 'ingredients' AND data_type = 'jsonb'
    ) THEN
      ALTER TABLE "products" RENAME COLUMN "ingredients" TO "ingredients_rt";
      ALTER TABLE "products" ADD COLUMN "ingredients" varchar;

      UPDATE "products" p
      SET "ingredients" = src.txt
      FROM (
        SELECT t."id" AS pid, string_agg(para.txt, chr(10) ORDER BY para.ord) AS txt
        FROM "products" t
        CROSS JOIN LATERAL (
          SELECT pe.ord,
                 (SELECT string_agg(ch.node->>'text', '' ORDER BY ch.ord)
                  FROM jsonb_array_elements(pe.node->'children') WITH ORDINALITY AS ch(node, ord)) AS txt
          FROM jsonb_array_elements(t."ingredients_rt"->'root'->'children') WITH ORDINALITY AS pe(node, ord)
        ) para
        WHERE jsonb_typeof(t."ingredients_rt"->'root'->'children') = 'array'
          AND COALESCE(para.txt, '') <> ''
        GROUP BY t."id"
      ) src
      WHERE p."id" = src.pid;

      ALTER TABLE "products" DROP COLUMN "ingredients_rt";
    END IF;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = '_products_v'
        AND column_name = 'version_ingredients' AND data_type = 'jsonb'
    ) THEN
      ALTER TABLE "_products_v" RENAME COLUMN "version_ingredients" TO "version_ingredients_rt";
      ALTER TABLE "_products_v" ADD COLUMN "version_ingredients" varchar;

      UPDATE "_products_v" v
      SET "version_ingredients" = src.txt
      FROM (
        SELECT t."id" AS pid, string_agg(para.txt, chr(10) ORDER BY para.ord) AS txt
        FROM "_products_v" t
        CROSS JOIN LATERAL (
          SELECT pe.ord,
                 (SELECT string_agg(ch.node->>'text', '' ORDER BY ch.ord)
                  FROM jsonb_array_elements(pe.node->'children') WITH ORDINALITY AS ch(node, ord)) AS txt
          FROM jsonb_array_elements(t."version_ingredients_rt"->'root'->'children') WITH ORDINALITY AS pe(node, ord)
        ) para
        WHERE jsonb_typeof(t."version_ingredients_rt"->'root'->'children') = 'array'
          AND COALESCE(para.txt, '') <> ''
        GROUP BY t."id"
      ) src
      WHERE v."id" = src.pid;

      ALTER TABLE "_products_v" DROP COLUMN "version_ingredients_rt";
    END IF;
  END $$;`)
}
