import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// «Активні компоненти»: array-поле keyIngredients → плоске textarea activeComponents.
// Усі стейтменти ідемпотентні (IF EXISTS / to_regclass / IS NULL): у dev адаптер пушить
// схему напряму, а власник застосовує SQL у Supabase вручну — повторний запуск через
// `payload migrate` на деплої має пройти як no-op. Дані з products_key_ingredients
// переносимо рядками «Назва – дія» (порядок _order) в обидві таблиці: без копії в
// _products_v адмінка (drafts) показала б порожнє поле і наступний save затер би дані.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "active_components" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_active_components" varchar;

  DO $$ BEGIN
    IF to_regclass('public.products_key_ingredients') IS NOT NULL THEN
      UPDATE "products" p
      SET "active_components" = src.txt
      FROM (
        SELECT "_parent_id" AS parent_id,
               string_agg(
                 "name" || CASE WHEN COALESCE("benefit", '') <> '' THEN ' – ' || "benefit" ELSE '' END,
                 chr(10) ORDER BY "_order"
               ) AS txt
        FROM "products_key_ingredients"
        WHERE COALESCE("name", '') <> ''
        GROUP BY "_parent_id"
      ) src
      WHERE p."id" = src.parent_id AND p."active_components" IS NULL;
    END IF;

    IF to_regclass('public._products_v_version_key_ingredients') IS NOT NULL THEN
      UPDATE "_products_v" v
      SET "version_active_components" = src.txt
      FROM (
        SELECT "_parent_id" AS parent_id,
               string_agg(
                 "name" || CASE WHEN COALESCE("benefit", '') <> '' THEN ' – ' || "benefit" ELSE '' END,
                 chr(10) ORDER BY "_order"
               ) AS txt
        FROM "_products_v_version_key_ingredients"
        WHERE COALESCE("name", '') <> ''
        GROUP BY "_parent_id"
      ) src
      WHERE v."id" = src.parent_id AND v."version_active_components" IS NULL;
    END IF;
  END $$;

  DROP TABLE IF EXISTS "products_key_ingredients" CASCADE;
  DROP TABLE IF EXISTS "_products_v_version_key_ingredients" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "products_key_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"benefit" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_key_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"benefit" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "products_key_ingredients" ADD CONSTRAINT "products_key_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_key_ingredients" ADD CONSTRAINT "_products_v_version_key_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_key_ingredients_order_idx" ON "products_key_ingredients" USING btree ("_order");
  CREATE INDEX "products_key_ingredients_parent_id_idx" ON "products_key_ingredients" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_key_ingredients_order_idx" ON "_products_v_version_key_ingredients" USING btree ("_order");
  CREATE INDEX "_products_v_version_key_ingredients_parent_id_idx" ON "_products_v_version_key_ingredients" USING btree ("_parent_id");
  ALTER TABLE "products" DROP COLUMN IF EXISTS "active_components";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_active_components";`)
}
