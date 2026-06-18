import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "cimg" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cimg_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pcc" ADD COLUMN "approach_image_id" integer;
  ALTER TABLE "pcc" ADD COLUMN "support_image_id" integer;
  ALTER TABLE "_pcc_v" ADD COLUMN "approach_image_id" integer;
  ALTER TABLE "_pcc_v" ADD COLUMN "support_image_id" integer;
  ALTER TABLE "cimg" ADD CONSTRAINT "cimg_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cimg" ADD CONSTRAINT "cimg_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cimg_v" ADD CONSTRAINT "_cimg_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cimg_v" ADD CONSTRAINT "_cimg_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cimg_order_idx" ON "cimg" USING btree ("_order");
  CREATE INDEX "cimg_parent_id_idx" ON "cimg" USING btree ("_parent_id");
  CREATE INDEX "cimg_path_idx" ON "cimg" USING btree ("_path");
  CREATE INDEX "cimg_image_idx" ON "cimg" USING btree ("image_id");
  CREATE INDEX "_cimg_v_order_idx" ON "_cimg_v" USING btree ("_order");
  CREATE INDEX "_cimg_v_parent_id_idx" ON "_cimg_v" USING btree ("_parent_id");
  CREATE INDEX "_cimg_v_path_idx" ON "_cimg_v" USING btree ("_path");
  CREATE INDEX "_cimg_v_image_idx" ON "_cimg_v" USING btree ("image_id");
  ALTER TABLE "pcc" ADD CONSTRAINT "pcc_approach_image_id_media_id_fk" FOREIGN KEY ("approach_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcc" ADD CONSTRAINT "pcc_support_image_id_media_id_fk" FOREIGN KEY ("support_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pcc_v" ADD CONSTRAINT "_pcc_v_approach_image_id_media_id_fk" FOREIGN KEY ("approach_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pcc_v" ADD CONSTRAINT "_pcc_v_support_image_id_media_id_fk" FOREIGN KEY ("support_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pcc_approach_image_idx" ON "pcc" USING btree ("approach_image_id");
  CREATE INDEX "pcc_support_image_idx" ON "pcc" USING btree ("support_image_id");
  CREATE INDEX "_pcc_v_approach_image_idx" ON "_pcc_v" USING btree ("approach_image_id");
  CREATE INDEX "_pcc_v_support_image_idx" ON "_pcc_v" USING btree ("support_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cimg" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cimg_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cimg" CASCADE;
  DROP TABLE "_cimg_v" CASCADE;
  ALTER TABLE "pcc" DROP CONSTRAINT "pcc_approach_image_id_media_id_fk";
  
  ALTER TABLE "pcc" DROP CONSTRAINT "pcc_support_image_id_media_id_fk";
  
  ALTER TABLE "_pcc_v" DROP CONSTRAINT "_pcc_v_approach_image_id_media_id_fk";
  
  ALTER TABLE "_pcc_v" DROP CONSTRAINT "_pcc_v_support_image_id_media_id_fk";
  
  DROP INDEX "pcc_approach_image_idx";
  DROP INDEX "pcc_support_image_idx";
  DROP INDEX "_pcc_v_approach_image_idx";
  DROP INDEX "_pcc_v_support_image_idx";
  ALTER TABLE "pcc" DROP COLUMN "approach_image_id";
  ALTER TABLE "pcc" DROP COLUMN "support_image_id";
  ALTER TABLE "_pcc_v" DROP COLUMN "approach_image_id";
  ALTER TABLE "_pcc_v" DROP COLUMN "support_image_id";`)
}
