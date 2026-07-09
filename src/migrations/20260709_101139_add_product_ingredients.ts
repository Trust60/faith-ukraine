import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// IF NOT EXISTS: у dev адаптер пушить схему напряму, тож на момент деплою колонки
// можуть уже існувати — без цього `payload migrate` упав би на дублі.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "ingredients" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_ingredients" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP COLUMN IF EXISTS "ingredients";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_ingredients";`)
}
