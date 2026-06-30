import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "concerns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skin_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_key_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"benefit" varchar
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"concerns_id" integer,
  	"skin_types_id" integer
  );
  
  CREATE TABLE "_products_v_version_key_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"benefit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"concerns_id" integer,
  	"skin_types_id" integer
  );
  
  ALTER TABLE "products" ADD COLUMN "category_id" integer;
  ALTER TABLE "products" ADD COLUMN "type_id" integer;
  ALTER TABLE "products" ADD COLUMN "short_description" varchar;
  ALTER TABLE "products" ADD COLUMN "how_to_use" jsonb;
  ALTER TABLE "_products_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_type_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_short_description" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_how_to_use" jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "concerns_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "skin_types_id" integer;
  ALTER TABLE "products_key_ingredients" ADD CONSTRAINT "products_key_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_concerns_fk" FOREIGN KEY ("concerns_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_skin_types_fk" FOREIGN KEY ("skin_types_id") REFERENCES "public"."skin_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_key_ingredients" ADD CONSTRAINT "_products_v_version_key_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_concerns_fk" FOREIGN KEY ("concerns_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_skin_types_fk" FOREIGN KEY ("skin_types_id") REFERENCES "public"."skin_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "product_types_slug_idx" ON "product_types" USING btree ("slug");
  CREATE INDEX "product_types_updated_at_idx" ON "product_types" USING btree ("updated_at");
  CREATE INDEX "product_types_created_at_idx" ON "product_types" USING btree ("created_at");
  CREATE UNIQUE INDEX "concerns_slug_idx" ON "concerns" USING btree ("slug");
  CREATE INDEX "concerns_updated_at_idx" ON "concerns" USING btree ("updated_at");
  CREATE INDEX "concerns_created_at_idx" ON "concerns" USING btree ("created_at");
  CREATE UNIQUE INDEX "skin_types_slug_idx" ON "skin_types" USING btree ("slug");
  CREATE INDEX "skin_types_updated_at_idx" ON "skin_types" USING btree ("updated_at");
  CREATE INDEX "skin_types_created_at_idx" ON "skin_types" USING btree ("created_at");
  CREATE INDEX "products_key_ingredients_order_idx" ON "products_key_ingredients" USING btree ("_order");
  CREATE INDEX "products_key_ingredients_parent_id_idx" ON "products_key_ingredients" USING btree ("_parent_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_concerns_id_idx" ON "products_rels" USING btree ("concerns_id");
  CREATE INDEX "products_rels_skin_types_id_idx" ON "products_rels" USING btree ("skin_types_id");
  CREATE INDEX "_products_v_version_key_ingredients_order_idx" ON "_products_v_version_key_ingredients" USING btree ("_order");
  CREATE INDEX "_products_v_version_key_ingredients_parent_id_idx" ON "_products_v_version_key_ingredients" USING btree ("_parent_id");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_concerns_id_idx" ON "_products_v_rels" USING btree ("concerns_id");
  CREATE INDEX "_products_v_rels_skin_types_id_idx" ON "_products_v_rels" USING btree ("skin_types_id");
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_type_id_product_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."product_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_product_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_type_id_product_types_id_fk" FOREIGN KEY ("version_type_id") REFERENCES "public"."product_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_types_fk" FOREIGN KEY ("product_types_id") REFERENCES "public"."product_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_concerns_fk" FOREIGN KEY ("concerns_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skin_types_fk" FOREIGN KEY ("skin_types_id") REFERENCES "public"."skin_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_type_idx" ON "products" USING btree ("type_id");
  CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX "_products_v_version_version_type_idx" ON "_products_v" USING btree ("version_type_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_product_types_id_idx" ON "payload_locked_documents_rels" USING btree ("product_types_id");
  CREATE INDEX "payload_locked_documents_rels_concerns_id_idx" ON "payload_locked_documents_rels" USING btree ("concerns_id");
  CREATE INDEX "payload_locked_documents_rels_skin_types_id_idx" ON "payload_locked_documents_rels" USING btree ("skin_types_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "concerns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "skin_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_key_ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_key_ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "product_types" CASCADE;
  DROP TABLE "concerns" CASCADE;
  DROP TABLE "skin_types" CASCADE;
  DROP TABLE "products_key_ingredients" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_key_ingredients" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_category_id_product_categories_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_type_id_product_types_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_category_id_product_categories_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_type_id_product_types_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_concerns_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_skin_types_fk";
  
  DROP INDEX "products_category_idx";
  DROP INDEX "products_type_idx";
  DROP INDEX "_products_v_version_version_category_idx";
  DROP INDEX "_products_v_version_version_type_idx";
  DROP INDEX "payload_locked_documents_rels_product_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_types_id_idx";
  DROP INDEX "payload_locked_documents_rels_concerns_id_idx";
  DROP INDEX "payload_locked_documents_rels_skin_types_id_idx";
  ALTER TABLE "products" DROP COLUMN "category_id";
  ALTER TABLE "products" DROP COLUMN "type_id";
  ALTER TABLE "products" DROP COLUMN "short_description";
  ALTER TABLE "products" DROP COLUMN "how_to_use";
  ALTER TABLE "_products_v" DROP COLUMN "version_category_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_type_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_short_description";
  ALTER TABLE "_products_v" DROP COLUMN "version_how_to_use";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "concerns_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "skin_types_id";`)
}
