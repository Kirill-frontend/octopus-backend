import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prodc" ADD COLUMN "transparent_cards" boolean DEFAULT false;
  ALTER TABLE "_prodc_v" ADD COLUMN "transparent_cards" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prodc" DROP COLUMN "transparent_cards";
  ALTER TABLE "_prodc_v" DROP COLUMN "transparent_cards";`)
}
