import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."it" AS ENUM('text', 'email', 'tel', 'textarea');
  CREATE TYPE "public"."enum_cgrid_cards_tone" AS ENUM('light', 'dark', 'ghost');
  CREATE TYPE "public"."enum_service_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cgrid_cards_v_tone" AS ENUM('light', 'dark', 'ghost');
  CREATE TYPE "public"."enum__service_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_form_submissions_submission_type" AS ENUM('contact', 'quote-request', 'callback-request');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'in-progress', 'closed');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_header_nav_items_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_footer_main_links_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_footer_main_links_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_footer_utility_links_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_footer_utility_links_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_home_page_featured_services_position" AS ENUM('top', 'left-upper', 'right-upper', 'center-upper', 'left-lower', 'center-lower', 'right-lower');
  CREATE TYPE "public"."enum_about_page_hero_primary_action_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_about_page_hero_primary_action_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_about_page_hero_secondary_action_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_about_page_hero_secondary_action_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_about_page_about_story_cta_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_about_page_about_story_cta_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_about_page_office_visit_link_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_about_page_office_visit_link_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_about_page_cta_button_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_about_page_cta_button_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_about_page_cta_variant" AS ENUM('default', 'service');
  CREATE TYPE "public"."enum_services_page_cta_button_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_services_page_cta_button_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_services_page_cta_variant" AS ENUM('default', 'service');
  CREATE TYPE "public"."enum_contact_page_hero_contact_methods_icon" AS ENUM('email', 'phone');
  CREATE TYPE "public"."enum_contact_page_office_visit_link_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_contact_page_office_visit_link_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_contact_page_cta_button_type" AS ENUM('custom', 'servicePage', 'pageRef');
  CREATE TYPE "public"."enum_contact_page_cta_button_page_ref" AS ENUM('home', 'about', 'services', 'contact', 'faq');
  CREATE TYPE "public"."enum_contact_page_cta_variant" AS ENUM('default', 'service');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "ff" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"input_type" "it",
  	"placeholder" varchar,
  	"required" boolean DEFAULT false
  );
  
  CREATE TABLE "sh" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"form_title" varchar,
  	"button_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "os_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "os" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_text" jsonb,
  	"intro_image_id" integer,
  	"section_title" varchar,
  	"outro_text" jsonb,
  	"detail_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "conf_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "conf" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"facts_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "eqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_text" varchar,
  	"center_text" varchar,
  	"right_text" varchar,
  	"left_symbol" varchar DEFAULT '+',
  	"right_symbol" varchar DEFAULT '=',
  	"block_name" varchar
  );
  
  CREATE TABLE "rgrid_top_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "rgrid_bottom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "rgrid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "psteps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "psteps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "rgns_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "rgns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sup_cards_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sup_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "supc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ceq_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "ceq_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "ceq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "wsteps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"reverse" boolean DEFAULT false,
  	"image_id" integer
  );
  
  CREATE TABLE "walt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "struct_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "scards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_top" varchar,
  	"intro_bottom" varchar,
  	"outro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "prodc_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "prodc_compliance_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "prodc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "cgrid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"tone" "enum_cgrid_cards_tone"
  );
  
  CREATE TABLE "rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cgrid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_top" varchar,
  	"intro_bottom" varchar,
  	"outro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "soff_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "soff" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "acomp_review_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "acomp_included_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "acomp_excluded_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "acomp_bottom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "acomp" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"top_title" varchar,
  	"top_text" varchar,
  	"background_image_id" integer,
  	"review_label" varchar,
  	"included_title" varchar,
  	"included_subtitle" varchar,
  	"excluded_title" varchar,
  	"excluded_subtitle" varchar,
  	"bottom_label" varchar,
  	"bottom_title" varchar,
  	"bottom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "paras" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb
  );
  
  CREATE TABLE "rti" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "ovip_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "ovip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"intro_text" varchar,
  	"outro_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ssplit_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "ssplit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_label" varchar,
  	"right_title" varchar,
  	"right_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pcc_approach_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pcc_support_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pcc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"approach_title" varchar,
  	"approach_text" varchar,
  	"approach_label" varchar,
  	"support_label" varchar,
  	"support_title" varchar,
  	"support_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"image_id" integer,
  	"dark_mode" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "tlst_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "tlst" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "fhs_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "fhs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "aspl_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "aspl" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ibdg" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_text" varchar,
  	"badge_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tcs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "tcs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"short_label" varchar,
  	"excerpt" varchar,
  	"card_label" varchar,
  	"hero_image_id" integer,
  	"listing_image_id" integer,
  	"show_in_homepage_picker" boolean DEFAULT true,
  	"show_in_services_page" boolean DEFAULT true,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_favicon_svg_override_id" integer,
  	"seo_favicon_ico_override_id" integer,
  	"seo_apple_touch_icon_override_id" integer,
  	"sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_service_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_ff_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"input_type" "it",
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sh_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"form_title" varchar,
  	"button_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_os_v_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_os_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_text" jsonb,
  	"intro_image_id" integer,
  	"section_title" varchar,
  	"outro_text" jsonb,
  	"detail_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_conf_v_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_conf_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"facts_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_eqs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_text" varchar,
  	"center_text" varchar,
  	"right_text" varchar,
  	"left_symbol" varchar DEFAULT '+',
  	"right_symbol" varchar DEFAULT '=',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_rgrid_v_top_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rgrid_v_bottom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rgrid_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_psteps_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_psteps_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_rgns_v_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rgns_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sup_cards_v_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sup_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_supc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ceq_v_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ceq_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ceq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_wsteps_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"reverse" boolean DEFAULT false,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_walt_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_struct_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_top" varchar,
  	"intro_bottom" varchar,
  	"outro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_prodc_v_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodc_v_compliance_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_prodc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cgrid_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"tone" "enum__cgrid_cards_v_tone",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rows_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cgrid_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_top" varchar,
  	"intro_bottom" varchar,
  	"outro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_soff_v_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_soff_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_acomp_v_review_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_acomp_v_included_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_acomp_v_excluded_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_acomp_v_bottom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_acomp_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"top_title" varchar,
  	"top_text" varchar,
  	"background_image_id" integer,
  	"review_label" varchar,
  	"included_title" varchar,
  	"included_subtitle" varchar,
  	"excluded_title" varchar,
  	"excluded_subtitle" varchar,
  	"bottom_label" varchar,
  	"bottom_title" varchar,
  	"bottom_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paras_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rti_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ovip_v_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ovip_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"intro_text" varchar,
  	"outro_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ssplit_v_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ssplit_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_label" varchar,
  	"right_title" varchar,
  	"right_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pcc_v_approach_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pcc_v_support_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pcc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"approach_title" varchar,
  	"approach_text" varchar,
  	"approach_label" varchar,
  	"support_label" varchar,
  	"support_title" varchar,
  	"support_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"image_id" integer,
  	"dark_mode" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tlst_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tlst_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_fhs_v_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fhs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_aspl_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_aspl_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ibdg_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_text" varchar,
  	"badge_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tcs_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tcs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_service_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_label" varchar,
  	"version_excerpt" varchar,
  	"version_card_label" varchar,
  	"version_hero_image_id" integer,
  	"version_listing_image_id" integer,
  	"version_show_in_homepage_picker" boolean DEFAULT true,
  	"version_show_in_services_page" boolean DEFAULT true,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_favicon_svg_override_id" integer,
  	"version_seo_favicon_ico_override_id" integer,
  	"version_seo_apple_touch_icon_override_id" integer,
  	"version_sort_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__service_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"subject" varchar,
  	"submission_type" "enum_form_submissions_submission_type" DEFAULT 'contact' NOT NULL,
  	"service_page_id" integer,
  	"message" varchar,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"service_pages_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"site_url" varchar NOT NULL,
  	"default_title" varchar NOT NULL,
  	"title_template" varchar NOT NULL,
  	"default_description" varchar NOT NULL,
  	"default_robots" varchar DEFAULT 'index,follow',
  	"theme_color" varchar DEFAULT '#0E3B5B',
  	"locale" varchar DEFAULT 'en',
  	"favicon_svg_id" integer,
  	"favicon_ico_id" integer,
  	"apple_touch_icon_id" integer,
  	"default_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'pageRef' NOT NULL,
  	"url" varchar,
  	"service_page_id" integer,
  	"page_ref" "enum_header_nav_items_page_ref",
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"mobile_logo_id" integer,
  	"cta_label" varchar NOT NULL,
  	"cta_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_main_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_footer_main_links_type" DEFAULT 'pageRef' NOT NULL,
  	"url" varchar,
  	"service_page_id" integer,
  	"page_ref" "enum_footer_main_links_page_ref",
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_utility_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_footer_utility_links_type" DEFAULT 'pageRef' NOT NULL,
  	"url" varchar,
  	"service_page_id" integer,
  	"page_ref" "enum_footer_utility_links_page_ref",
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"newsletter_title" varchar NOT NULL,
  	"newsletter_text" varchar NOT NULL,
  	"newsletter_form_enabled" boolean DEFAULT true,
  	"copyright_text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_featured_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_id" integer NOT NULL,
  	"position" "enum_home_page_featured_services_position" NOT NULL,
  	"custom_label" varchar,
  	"is_visible" boolean DEFAULT true
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_background_image_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_favicon_svg_override_id" integer,
  	"seo_favicon_ico_override_id" integer,
  	"seo_apple_touch_icon_override_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon_id" integer,
  	"icon_url" varchar,
  	"icon_alt" varchar
  );
  
  CREATE TABLE "about_page_office_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "about_page_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"image_alt" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"lead" varchar,
  	"content" jsonb,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"hero_primary_action_label" varchar NOT NULL,
  	"hero_primary_action_type" "enum_about_page_hero_primary_action_type" DEFAULT 'pageRef' NOT NULL,
  	"hero_primary_action_url" varchar,
  	"hero_primary_action_service_page_id" integer,
  	"hero_primary_action_page_ref" "enum_about_page_hero_primary_action_page_ref",
  	"hero_primary_action_new_tab" boolean DEFAULT false,
  	"hero_secondary_action_label" varchar NOT NULL,
  	"hero_secondary_action_type" "enum_about_page_hero_secondary_action_type" DEFAULT 'pageRef' NOT NULL,
  	"hero_secondary_action_url" varchar,
  	"hero_secondary_action_service_page_id" integer,
  	"hero_secondary_action_page_ref" "enum_about_page_hero_secondary_action_page_ref",
  	"hero_secondary_action_new_tab" boolean DEFAULT false,
  	"hero_image_id" integer,
  	"hero_image_url" varchar,
  	"hero_image_alt" varchar,
  	"about_story_eyebrow" varchar NOT NULL,
  	"about_story_title" varchar NOT NULL,
  	"about_story_body" jsonb NOT NULL,
  	"about_story_cta_label" varchar NOT NULL,
  	"about_story_cta_type" "enum_about_page_about_story_cta_type" DEFAULT 'pageRef' NOT NULL,
  	"about_story_cta_url" varchar,
  	"about_story_cta_service_page_id" integer,
  	"about_story_cta_page_ref" "enum_about_page_about_story_cta_page_ref",
  	"about_story_cta_new_tab" boolean DEFAULT false,
  	"about_story_image_id" integer,
  	"about_story_image_url" varchar,
  	"about_story_image_alt" varchar,
  	"values_eyebrow" varchar NOT NULL,
  	"values_title" varchar NOT NULL,
  	"values_intro_text" varchar NOT NULL,
  	"office_eyebrow" varchar NOT NULL,
  	"office_title" varchar NOT NULL,
  	"office_text" varchar NOT NULL,
  	"office_image_id" integer,
  	"office_image_url" varchar,
  	"office_image_alt" varchar,
  	"office_visit_link_label" varchar NOT NULL,
  	"office_visit_link_type" "enum_about_page_office_visit_link_type" DEFAULT 'pageRef' NOT NULL,
  	"office_visit_link_url" varchar,
  	"office_visit_link_service_page_id" integer,
  	"office_visit_link_page_ref" "enum_about_page_office_visit_link_page_ref",
  	"office_visit_link_new_tab" boolean DEFAULT false,
  	"team_eyebrow" varchar NOT NULL,
  	"team_title" varchar NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_description" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_type" "enum_about_page_cta_button_type" DEFAULT 'pageRef' NOT NULL,
  	"cta_button_url" varchar,
  	"cta_button_service_page_id" integer,
  	"cta_button_page_ref" "enum_about_page_cta_button_page_ref",
  	"cta_button_new_tab" boolean DEFAULT false,
  	"cta_show_arrow" boolean DEFAULT true,
  	"cta_variant" "enum_about_page_cta_variant" DEFAULT 'default',
  	"cta_image_id" integer,
  	"cta_image_url" varchar,
  	"cta_image_alt" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_favicon_svg_override_id" integer,
  	"seo_favicon_ico_override_id" integer,
  	"seo_apple_touch_icon_override_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_values_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"lead" varchar,
  	"content" jsonb,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_text" varchar NOT NULL,
  	"values_grid_eyebrow" varchar NOT NULL,
  	"values_grid_title" varchar NOT NULL,
  	"values_grid_text" varchar NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_description" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_type" "enum_services_page_cta_button_type" DEFAULT 'pageRef' NOT NULL,
  	"cta_button_url" varchar,
  	"cta_button_service_page_id" integer,
  	"cta_button_page_ref" "enum_services_page_cta_button_page_ref",
  	"cta_button_new_tab" boolean DEFAULT false,
  	"cta_show_arrow" boolean DEFAULT false,
  	"cta_variant" "enum_services_page_cta_variant" DEFAULT 'service',
  	"cta_image_id" integer,
  	"cta_image_url" varchar,
  	"cta_image_alt" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_favicon_svg_override_id" integer,
  	"seo_favicon_ico_override_id" integer,
  	"seo_apple_touch_icon_override_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_hero_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"icon" "enum_contact_page_hero_contact_methods_icon" NOT NULL
  );
  
  CREATE TABLE "contact_page_office_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "contact_page_partners_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"image_alt" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"lead" varchar,
  	"content" jsonb,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"hero_form_name_placeholder" varchar NOT NULL,
  	"hero_form_email_placeholder" varchar NOT NULL,
  	"hero_form_phone_placeholder" varchar NOT NULL,
  	"hero_form_subject_placeholder" varchar NOT NULL,
  	"hero_form_message_placeholder" varchar NOT NULL,
  	"hero_form_submit_label" varchar NOT NULL,
  	"office_eyebrow" varchar NOT NULL,
  	"office_title" varchar NOT NULL,
  	"office_text" varchar NOT NULL,
  	"office_image_id" integer,
  	"office_image_url" varchar,
  	"office_image_alt" varchar,
  	"office_visit_link_label" varchar NOT NULL,
  	"office_visit_link_type" "enum_contact_page_office_visit_link_type" DEFAULT 'pageRef' NOT NULL,
  	"office_visit_link_url" varchar,
  	"office_visit_link_service_page_id" integer,
  	"office_visit_link_page_ref" "enum_contact_page_office_visit_link_page_ref",
  	"office_visit_link_new_tab" boolean DEFAULT false,
  	"partners_eyebrow" varchar NOT NULL,
  	"partners_title" varchar NOT NULL,
  	"partners_text" varchar NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_description" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_type" "enum_contact_page_cta_button_type" DEFAULT 'pageRef' NOT NULL,
  	"cta_button_url" varchar,
  	"cta_button_service_page_id" integer,
  	"cta_button_page_ref" "enum_contact_page_cta_button_page_ref",
  	"cta_button_new_tab" boolean DEFAULT false,
  	"cta_show_arrow" boolean DEFAULT true,
  	"cta_variant" "enum_contact_page_cta_variant" DEFAULT 'default',
  	"cta_image_id" integer,
  	"cta_image_url" varchar,
  	"cta_image_alt" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_favicon_svg_override_id" integer,
  	"seo_favicon_ico_override_id" integer,
  	"seo_apple_touch_icon_override_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_page_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "faq_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"lead" varchar,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_favicon_svg_override_id" integer,
  	"seo_favicon_ico_override_id" integer,
  	"seo_apple_touch_icon_override_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ff" ADD CONSTRAINT "ff_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sh" ADD CONSTRAINT "sh_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sh" ADD CONSTRAINT "sh_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "os_deliverables" ADD CONSTRAINT "os_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."os"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "os" ADD CONSTRAINT "os_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "os" ADD CONSTRAINT "os_detail_image_id_media_id_fk" FOREIGN KEY ("detail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "os" ADD CONSTRAINT "os_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "conf_facts" ADD CONSTRAINT "conf_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."conf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "conf" ADD CONSTRAINT "conf_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "eqs" ADD CONSTRAINT "eqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rgrid_top_items" ADD CONSTRAINT "rgrid_top_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rgrid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rgrid_bottom_items" ADD CONSTRAINT "rgrid_bottom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rgrid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rgrid" ADD CONSTRAINT "rgrid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "psteps_items" ADD CONSTRAINT "psteps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."psteps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "psteps" ADD CONSTRAINT "psteps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rgns_regions" ADD CONSTRAINT "rgns_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rgns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rgns" ADD CONSTRAINT "rgns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sup_cards_lines" ADD CONSTRAINT "sup_cards_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sup_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sup_cards" ADD CONSTRAINT "sup_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."supc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "supc" ADD CONSTRAINT "supc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ceq_lines" ADD CONSTRAINT "ceq_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ceq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ceq_features" ADD CONSTRAINT "ceq_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ceq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ceq" ADD CONSTRAINT "ceq_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ceq" ADD CONSTRAINT "ceq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wsteps_items" ADD CONSTRAINT "wsteps_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wsteps_items" ADD CONSTRAINT "wsteps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."walt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "walt" ADD CONSTRAINT "walt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "struct_cards" ADD CONSTRAINT "struct_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scards" ADD CONSTRAINT "scards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodc_cards" ADD CONSTRAINT "prodc_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodc_compliance_items" ADD CONSTRAINT "prodc_compliance_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prodc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prodc" ADD CONSTRAINT "prodc_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prodc" ADD CONSTRAINT "prodc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cgrid_cards" ADD CONSTRAINT "cgrid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rows" ADD CONSTRAINT "rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cgrid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cgrid" ADD CONSTRAINT "cgrid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "soff_details" ADD CONSTRAINT "soff_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."soff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "soff" ADD CONSTRAINT "soff_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "soff" ADD CONSTRAINT "soff_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acomp_review_items" ADD CONSTRAINT "acomp_review_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."acomp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acomp_included_items" ADD CONSTRAINT "acomp_included_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."acomp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acomp_excluded_items" ADD CONSTRAINT "acomp_excluded_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."acomp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acomp_bottom_items" ADD CONSTRAINT "acomp_bottom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."acomp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acomp" ADD CONSTRAINT "acomp_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "acomp" ADD CONSTRAINT "acomp_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paras" ADD CONSTRAINT "paras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rti" ADD CONSTRAINT "rti_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ovip_services" ADD CONSTRAINT "ovip_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ovip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ovip" ADD CONSTRAINT "ovip_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ovip" ADD CONSTRAINT "ovip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ssplit_left_items" ADD CONSTRAINT "ssplit_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ssplit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ssplit" ADD CONSTRAINT "ssplit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcc_approach_items" ADD CONSTRAINT "pcc_approach_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcc_support_items" ADD CONSTRAINT "pcc_support_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcc" ADD CONSTRAINT "pcc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tlst_items" ADD CONSTRAINT "tlst_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tlst"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tlst" ADD CONSTRAINT "tlst_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fhs_highlights" ADD CONSTRAINT "fhs_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fhs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fhs" ADD CONSTRAINT "fhs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aspl_items" ADD CONSTRAINT "aspl_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aspl"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aspl" ADD CONSTRAINT "aspl_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ibdg" ADD CONSTRAINT "ibdg_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tcs_items" ADD CONSTRAINT "tcs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tcs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tcs" ADD CONSTRAINT "tcs_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tcs" ADD CONSTRAINT "tcs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_listing_image_id_media_id_fk" FOREIGN KEY ("listing_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_seo_favicon_svg_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_svg_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_seo_favicon_ico_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_ico_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_seo_apple_touch_icon_override_id_media_id_fk" FOREIGN KEY ("seo_apple_touch_icon_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ff_v" ADD CONSTRAINT "_ff_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sh_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sh_v" ADD CONSTRAINT "_sh_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sh_v" ADD CONSTRAINT "_sh_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_os_v_deliverables" ADD CONSTRAINT "_os_v_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_os_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_os_v" ADD CONSTRAINT "_os_v_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_os_v" ADD CONSTRAINT "_os_v_detail_image_id_media_id_fk" FOREIGN KEY ("detail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_os_v" ADD CONSTRAINT "_os_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_conf_v_facts" ADD CONSTRAINT "_conf_v_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_conf_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_conf_v" ADD CONSTRAINT "_conf_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_eqs_v" ADD CONSTRAINT "_eqs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rgrid_v_top_items" ADD CONSTRAINT "_rgrid_v_top_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rgrid_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rgrid_v_bottom_items" ADD CONSTRAINT "_rgrid_v_bottom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rgrid_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rgrid_v" ADD CONSTRAINT "_rgrid_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_psteps_items_v" ADD CONSTRAINT "_psteps_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_psteps_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_psteps_v" ADD CONSTRAINT "_psteps_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rgns_v_regions" ADD CONSTRAINT "_rgns_v_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rgns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rgns_v" ADD CONSTRAINT "_rgns_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sup_cards_v_lines" ADD CONSTRAINT "_sup_cards_v_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sup_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sup_cards_v" ADD CONSTRAINT "_sup_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_supc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_supc_v" ADD CONSTRAINT "_supc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ceq_v_lines" ADD CONSTRAINT "_ceq_v_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ceq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ceq_v_features" ADD CONSTRAINT "_ceq_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ceq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ceq_v" ADD CONSTRAINT "_ceq_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ceq_v" ADD CONSTRAINT "_ceq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wsteps_items_v" ADD CONSTRAINT "_wsteps_items_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wsteps_items_v" ADD CONSTRAINT "_wsteps_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_walt_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_walt_v" ADD CONSTRAINT "_walt_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_struct_cards_v" ADD CONSTRAINT "_struct_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scards_v" ADD CONSTRAINT "_scards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodc_v_cards" ADD CONSTRAINT "_prodc_v_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodc_v_compliance_items" ADD CONSTRAINT "_prodc_v_compliance_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prodc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prodc_v" ADD CONSTRAINT "_prodc_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prodc_v" ADD CONSTRAINT "_prodc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cgrid_cards_v" ADD CONSTRAINT "_cgrid_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rows_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rows_v" ADD CONSTRAINT "_rows_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cgrid_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cgrid_v" ADD CONSTRAINT "_cgrid_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_soff_v_details" ADD CONSTRAINT "_soff_v_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_soff_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_soff_v" ADD CONSTRAINT "_soff_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_soff_v" ADD CONSTRAINT "_soff_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_acomp_v_review_items" ADD CONSTRAINT "_acomp_v_review_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_acomp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_acomp_v_included_items" ADD CONSTRAINT "_acomp_v_included_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_acomp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_acomp_v_excluded_items" ADD CONSTRAINT "_acomp_v_excluded_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_acomp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_acomp_v_bottom_items" ADD CONSTRAINT "_acomp_v_bottom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_acomp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_acomp_v" ADD CONSTRAINT "_acomp_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_acomp_v" ADD CONSTRAINT "_acomp_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paras_v" ADD CONSTRAINT "_paras_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rti_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rti_v" ADD CONSTRAINT "_rti_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ovip_v_services" ADD CONSTRAINT "_ovip_v_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ovip_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ovip_v" ADD CONSTRAINT "_ovip_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ovip_v" ADD CONSTRAINT "_ovip_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ssplit_v_left_items" ADD CONSTRAINT "_ssplit_v_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ssplit_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ssplit_v" ADD CONSTRAINT "_ssplit_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcc_v_approach_items" ADD CONSTRAINT "_pcc_v_approach_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcc_v_support_items" ADD CONSTRAINT "_pcc_v_support_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcc_v" ADD CONSTRAINT "_pcc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tlst_v_items" ADD CONSTRAINT "_tlst_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tlst_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tlst_v" ADD CONSTRAINT "_tlst_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fhs_v_highlights" ADD CONSTRAINT "_fhs_v_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fhs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fhs_v" ADD CONSTRAINT "_fhs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aspl_v_items" ADD CONSTRAINT "_aspl_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aspl_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aspl_v" ADD CONSTRAINT "_aspl_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ibdg_v" ADD CONSTRAINT "_ibdg_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tcs_v_items" ADD CONSTRAINT "_tcs_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tcs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tcs_v" ADD CONSTRAINT "_tcs_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tcs_v" ADD CONSTRAINT "_tcs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_parent_id_service_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_version_listing_image_id_media_id_fk" FOREIGN KEY ("version_listing_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_version_seo_favicon_svg_override_id_media_id_fk" FOREIGN KEY ("version_seo_favicon_svg_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_version_seo_favicon_ico_override_id_media_id_fk" FOREIGN KEY ("version_seo_favicon_ico_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_pages_v" ADD CONSTRAINT "_service_pages_v_version_seo_apple_touch_icon_override_id_media_id_fk" FOREIGN KEY ("version_seo_apple_touch_icon_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_service_page_id_service_pages_id_fk" FOREIGN KEY ("service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_svg_id_media_id_fk" FOREIGN KEY ("favicon_svg_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_ico_id_media_id_fk" FOREIGN KEY ("favicon_ico_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_apple_touch_icon_id_media_id_fk" FOREIGN KEY ("apple_touch_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_service_page_id_service_pages_id_fk" FOREIGN KEY ("service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_mobile_logo_id_media_id_fk" FOREIGN KEY ("mobile_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_main_links" ADD CONSTRAINT "footer_main_links_service_page_id_service_pages_id_fk" FOREIGN KEY ("service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_main_links" ADD CONSTRAINT "footer_main_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_utility_links" ADD CONSTRAINT "footer_utility_links_service_page_id_service_pages_id_fk" FOREIGN KEY ("service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_utility_links" ADD CONSTRAINT "footer_utility_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_featured_services" ADD CONSTRAINT "home_page_featured_services_service_id_service_pages_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_featured_services" ADD CONSTRAINT "home_page_featured_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_favicon_svg_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_svg_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_favicon_ico_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_ico_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_apple_touch_icon_override_id_media_id_fk" FOREIGN KEY ("seo_apple_touch_icon_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_hero_stats" ADD CONSTRAINT "about_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_office_details" ADD CONSTRAINT "about_page_office_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_primary_action_service_page_id_service_pages_id_fk" FOREIGN KEY ("hero_primary_action_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_secondary_action_service_page_id_service_pages_id_fk" FOREIGN KEY ("hero_secondary_action_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_about_story_cta_service_page_id_service_pages_id_fk" FOREIGN KEY ("about_story_cta_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_about_story_image_id_media_id_fk" FOREIGN KEY ("about_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_office_image_id_media_id_fk" FOREIGN KEY ("office_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_office_visit_link_service_page_id_service_pages_id_fk" FOREIGN KEY ("office_visit_link_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_cta_button_service_page_id_service_pages_id_fk" FOREIGN KEY ("cta_button_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_favicon_svg_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_svg_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_favicon_ico_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_ico_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_apple_touch_icon_override_id_media_id_fk" FOREIGN KEY ("seo_apple_touch_icon_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_values_grid_items" ADD CONSTRAINT "services_page_values_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_cta_button_service_page_id_service_pages_id_fk" FOREIGN KEY ("cta_button_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_seo_favicon_svg_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_svg_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_seo_favicon_ico_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_ico_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_seo_apple_touch_icon_override_id_media_id_fk" FOREIGN KEY ("seo_apple_touch_icon_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_hero_contact_methods" ADD CONSTRAINT "contact_page_hero_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_office_details" ADD CONSTRAINT "contact_page_office_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_partners_logos" ADD CONSTRAINT "contact_page_partners_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_partners_logos" ADD CONSTRAINT "contact_page_partners_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_office_image_id_media_id_fk" FOREIGN KEY ("office_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_office_visit_link_service_page_id_service_pages_id_fk" FOREIGN KEY ("office_visit_link_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_cta_button_service_page_id_service_pages_id_fk" FOREIGN KEY ("cta_button_service_page_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_favicon_svg_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_svg_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_favicon_ico_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_ico_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_apple_touch_icon_override_id_media_id_fk" FOREIGN KEY ("seo_apple_touch_icon_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page_items" ADD CONSTRAINT "faq_page_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_seo_favicon_svg_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_svg_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_seo_favicon_ico_override_id_media_id_fk" FOREIGN KEY ("seo_favicon_ico_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_seo_apple_touch_icon_override_id_media_id_fk" FOREIGN KEY ("seo_apple_touch_icon_override_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "ff_order_idx" ON "ff" USING btree ("_order");
  CREATE INDEX "ff_parent_id_idx" ON "ff" USING btree ("_parent_id");
  CREATE INDEX "sh_order_idx" ON "sh" USING btree ("_order");
  CREATE INDEX "sh_parent_id_idx" ON "sh" USING btree ("_parent_id");
  CREATE INDEX "sh_path_idx" ON "sh" USING btree ("_path");
  CREATE INDEX "sh_image_idx" ON "sh" USING btree ("image_id");
  CREATE INDEX "os_deliverables_order_idx" ON "os_deliverables" USING btree ("_order");
  CREATE INDEX "os_deliverables_parent_id_idx" ON "os_deliverables" USING btree ("_parent_id");
  CREATE INDEX "os_order_idx" ON "os" USING btree ("_order");
  CREATE INDEX "os_parent_id_idx" ON "os" USING btree ("_parent_id");
  CREATE INDEX "os_path_idx" ON "os" USING btree ("_path");
  CREATE INDEX "os_intro_image_idx" ON "os" USING btree ("intro_image_id");
  CREATE INDEX "os_detail_image_idx" ON "os" USING btree ("detail_image_id");
  CREATE INDEX "conf_facts_order_idx" ON "conf_facts" USING btree ("_order");
  CREATE INDEX "conf_facts_parent_id_idx" ON "conf_facts" USING btree ("_parent_id");
  CREATE INDEX "conf_order_idx" ON "conf" USING btree ("_order");
  CREATE INDEX "conf_parent_id_idx" ON "conf" USING btree ("_parent_id");
  CREATE INDEX "conf_path_idx" ON "conf" USING btree ("_path");
  CREATE INDEX "eqs_order_idx" ON "eqs" USING btree ("_order");
  CREATE INDEX "eqs_parent_id_idx" ON "eqs" USING btree ("_parent_id");
  CREATE INDEX "eqs_path_idx" ON "eqs" USING btree ("_path");
  CREATE INDEX "rgrid_top_items_order_idx" ON "rgrid_top_items" USING btree ("_order");
  CREATE INDEX "rgrid_top_items_parent_id_idx" ON "rgrid_top_items" USING btree ("_parent_id");
  CREATE INDEX "rgrid_bottom_items_order_idx" ON "rgrid_bottom_items" USING btree ("_order");
  CREATE INDEX "rgrid_bottom_items_parent_id_idx" ON "rgrid_bottom_items" USING btree ("_parent_id");
  CREATE INDEX "rgrid_order_idx" ON "rgrid" USING btree ("_order");
  CREATE INDEX "rgrid_parent_id_idx" ON "rgrid" USING btree ("_parent_id");
  CREATE INDEX "rgrid_path_idx" ON "rgrid" USING btree ("_path");
  CREATE INDEX "psteps_items_order_idx" ON "psteps_items" USING btree ("_order");
  CREATE INDEX "psteps_items_parent_id_idx" ON "psteps_items" USING btree ("_parent_id");
  CREATE INDEX "psteps_order_idx" ON "psteps" USING btree ("_order");
  CREATE INDEX "psteps_parent_id_idx" ON "psteps" USING btree ("_parent_id");
  CREATE INDEX "psteps_path_idx" ON "psteps" USING btree ("_path");
  CREATE INDEX "rgns_regions_order_idx" ON "rgns_regions" USING btree ("_order");
  CREATE INDEX "rgns_regions_parent_id_idx" ON "rgns_regions" USING btree ("_parent_id");
  CREATE INDEX "rgns_order_idx" ON "rgns" USING btree ("_order");
  CREATE INDEX "rgns_parent_id_idx" ON "rgns" USING btree ("_parent_id");
  CREATE INDEX "rgns_path_idx" ON "rgns" USING btree ("_path");
  CREATE INDEX "sup_cards_lines_order_idx" ON "sup_cards_lines" USING btree ("_order");
  CREATE INDEX "sup_cards_lines_parent_id_idx" ON "sup_cards_lines" USING btree ("_parent_id");
  CREATE INDEX "sup_cards_order_idx" ON "sup_cards" USING btree ("_order");
  CREATE INDEX "sup_cards_parent_id_idx" ON "sup_cards" USING btree ("_parent_id");
  CREATE INDEX "supc_order_idx" ON "supc" USING btree ("_order");
  CREATE INDEX "supc_parent_id_idx" ON "supc" USING btree ("_parent_id");
  CREATE INDEX "supc_path_idx" ON "supc" USING btree ("_path");
  CREATE INDEX "ceq_lines_order_idx" ON "ceq_lines" USING btree ("_order");
  CREATE INDEX "ceq_lines_parent_id_idx" ON "ceq_lines" USING btree ("_parent_id");
  CREATE INDEX "ceq_features_order_idx" ON "ceq_features" USING btree ("_order");
  CREATE INDEX "ceq_features_parent_id_idx" ON "ceq_features" USING btree ("_parent_id");
  CREATE INDEX "ceq_order_idx" ON "ceq" USING btree ("_order");
  CREATE INDEX "ceq_parent_id_idx" ON "ceq" USING btree ("_parent_id");
  CREATE INDEX "ceq_path_idx" ON "ceq" USING btree ("_path");
  CREATE INDEX "ceq_background_image_idx" ON "ceq" USING btree ("background_image_id");
  CREATE INDEX "wsteps_items_order_idx" ON "wsteps_items" USING btree ("_order");
  CREATE INDEX "wsteps_items_parent_id_idx" ON "wsteps_items" USING btree ("_parent_id");
  CREATE INDEX "wsteps_items_image_idx" ON "wsteps_items" USING btree ("image_id");
  CREATE INDEX "walt_order_idx" ON "walt" USING btree ("_order");
  CREATE INDEX "walt_parent_id_idx" ON "walt" USING btree ("_parent_id");
  CREATE INDEX "walt_path_idx" ON "walt" USING btree ("_path");
  CREATE INDEX "struct_cards_order_idx" ON "struct_cards" USING btree ("_order");
  CREATE INDEX "struct_cards_parent_id_idx" ON "struct_cards" USING btree ("_parent_id");
  CREATE INDEX "scards_order_idx" ON "scards" USING btree ("_order");
  CREATE INDEX "scards_parent_id_idx" ON "scards" USING btree ("_parent_id");
  CREATE INDEX "scards_path_idx" ON "scards" USING btree ("_path");
  CREATE INDEX "prodc_cards_order_idx" ON "prodc_cards" USING btree ("_order");
  CREATE INDEX "prodc_cards_parent_id_idx" ON "prodc_cards" USING btree ("_parent_id");
  CREATE INDEX "prodc_compliance_items_order_idx" ON "prodc_compliance_items" USING btree ("_order");
  CREATE INDEX "prodc_compliance_items_parent_id_idx" ON "prodc_compliance_items" USING btree ("_parent_id");
  CREATE INDEX "prodc_order_idx" ON "prodc" USING btree ("_order");
  CREATE INDEX "prodc_parent_id_idx" ON "prodc" USING btree ("_parent_id");
  CREATE INDEX "prodc_path_idx" ON "prodc" USING btree ("_path");
  CREATE INDEX "prodc_background_image_idx" ON "prodc" USING btree ("background_image_id");
  CREATE INDEX "cgrid_cards_order_idx" ON "cgrid_cards" USING btree ("_order");
  CREATE INDEX "cgrid_cards_parent_id_idx" ON "cgrid_cards" USING btree ("_parent_id");
  CREATE INDEX "rows_order_idx" ON "rows" USING btree ("_order");
  CREATE INDEX "rows_parent_id_idx" ON "rows" USING btree ("_parent_id");
  CREATE INDEX "cgrid_order_idx" ON "cgrid" USING btree ("_order");
  CREATE INDEX "cgrid_parent_id_idx" ON "cgrid" USING btree ("_parent_id");
  CREATE INDEX "cgrid_path_idx" ON "cgrid" USING btree ("_path");
  CREATE INDEX "soff_details_order_idx" ON "soff_details" USING btree ("_order");
  CREATE INDEX "soff_details_parent_id_idx" ON "soff_details" USING btree ("_parent_id");
  CREATE INDEX "soff_order_idx" ON "soff" USING btree ("_order");
  CREATE INDEX "soff_parent_id_idx" ON "soff" USING btree ("_parent_id");
  CREATE INDEX "soff_path_idx" ON "soff" USING btree ("_path");
  CREATE INDEX "soff_image_idx" ON "soff" USING btree ("image_id");
  CREATE INDEX "acomp_review_items_order_idx" ON "acomp_review_items" USING btree ("_order");
  CREATE INDEX "acomp_review_items_parent_id_idx" ON "acomp_review_items" USING btree ("_parent_id");
  CREATE INDEX "acomp_included_items_order_idx" ON "acomp_included_items" USING btree ("_order");
  CREATE INDEX "acomp_included_items_parent_id_idx" ON "acomp_included_items" USING btree ("_parent_id");
  CREATE INDEX "acomp_excluded_items_order_idx" ON "acomp_excluded_items" USING btree ("_order");
  CREATE INDEX "acomp_excluded_items_parent_id_idx" ON "acomp_excluded_items" USING btree ("_parent_id");
  CREATE INDEX "acomp_bottom_items_order_idx" ON "acomp_bottom_items" USING btree ("_order");
  CREATE INDEX "acomp_bottom_items_parent_id_idx" ON "acomp_bottom_items" USING btree ("_parent_id");
  CREATE INDEX "acomp_order_idx" ON "acomp" USING btree ("_order");
  CREATE INDEX "acomp_parent_id_idx" ON "acomp" USING btree ("_parent_id");
  CREATE INDEX "acomp_path_idx" ON "acomp" USING btree ("_path");
  CREATE INDEX "acomp_background_image_idx" ON "acomp" USING btree ("background_image_id");
  CREATE INDEX "paras_order_idx" ON "paras" USING btree ("_order");
  CREATE INDEX "paras_parent_id_idx" ON "paras" USING btree ("_parent_id");
  CREATE INDEX "rti_order_idx" ON "rti" USING btree ("_order");
  CREATE INDEX "rti_parent_id_idx" ON "rti" USING btree ("_parent_id");
  CREATE INDEX "rti_path_idx" ON "rti" USING btree ("_path");
  CREATE INDEX "ovip_services_order_idx" ON "ovip_services" USING btree ("_order");
  CREATE INDEX "ovip_services_parent_id_idx" ON "ovip_services" USING btree ("_parent_id");
  CREATE INDEX "ovip_order_idx" ON "ovip" USING btree ("_order");
  CREATE INDEX "ovip_parent_id_idx" ON "ovip" USING btree ("_parent_id");
  CREATE INDEX "ovip_path_idx" ON "ovip" USING btree ("_path");
  CREATE INDEX "ovip_background_image_idx" ON "ovip" USING btree ("background_image_id");
  CREATE INDEX "ssplit_left_items_order_idx" ON "ssplit_left_items" USING btree ("_order");
  CREATE INDEX "ssplit_left_items_parent_id_idx" ON "ssplit_left_items" USING btree ("_parent_id");
  CREATE INDEX "ssplit_order_idx" ON "ssplit" USING btree ("_order");
  CREATE INDEX "ssplit_parent_id_idx" ON "ssplit" USING btree ("_parent_id");
  CREATE INDEX "ssplit_path_idx" ON "ssplit" USING btree ("_path");
  CREATE INDEX "pcc_approach_items_order_idx" ON "pcc_approach_items" USING btree ("_order");
  CREATE INDEX "pcc_approach_items_parent_id_idx" ON "pcc_approach_items" USING btree ("_parent_id");
  CREATE INDEX "pcc_support_items_order_idx" ON "pcc_support_items" USING btree ("_order");
  CREATE INDEX "pcc_support_items_parent_id_idx" ON "pcc_support_items" USING btree ("_parent_id");
  CREATE INDEX "pcc_order_idx" ON "pcc" USING btree ("_order");
  CREATE INDEX "pcc_parent_id_idx" ON "pcc" USING btree ("_parent_id");
  CREATE INDEX "pcc_path_idx" ON "pcc" USING btree ("_path");
  CREATE INDEX "cta_order_idx" ON "cta" USING btree ("_order");
  CREATE INDEX "cta_parent_id_idx" ON "cta" USING btree ("_parent_id");
  CREATE INDEX "cta_path_idx" ON "cta" USING btree ("_path");
  CREATE INDEX "cta_image_idx" ON "cta" USING btree ("image_id");
  CREATE INDEX "tlst_items_order_idx" ON "tlst_items" USING btree ("_order");
  CREATE INDEX "tlst_items_parent_id_idx" ON "tlst_items" USING btree ("_parent_id");
  CREATE INDEX "tlst_order_idx" ON "tlst" USING btree ("_order");
  CREATE INDEX "tlst_parent_id_idx" ON "tlst" USING btree ("_parent_id");
  CREATE INDEX "tlst_path_idx" ON "tlst" USING btree ("_path");
  CREATE INDEX "fhs_highlights_order_idx" ON "fhs_highlights" USING btree ("_order");
  CREATE INDEX "fhs_highlights_parent_id_idx" ON "fhs_highlights" USING btree ("_parent_id");
  CREATE INDEX "fhs_order_idx" ON "fhs" USING btree ("_order");
  CREATE INDEX "fhs_parent_id_idx" ON "fhs" USING btree ("_parent_id");
  CREATE INDEX "fhs_path_idx" ON "fhs" USING btree ("_path");
  CREATE INDEX "aspl_items_order_idx" ON "aspl_items" USING btree ("_order");
  CREATE INDEX "aspl_items_parent_id_idx" ON "aspl_items" USING btree ("_parent_id");
  CREATE INDEX "aspl_order_idx" ON "aspl" USING btree ("_order");
  CREATE INDEX "aspl_parent_id_idx" ON "aspl" USING btree ("_parent_id");
  CREATE INDEX "aspl_path_idx" ON "aspl" USING btree ("_path");
  CREATE INDEX "ibdg_order_idx" ON "ibdg" USING btree ("_order");
  CREATE INDEX "ibdg_parent_id_idx" ON "ibdg" USING btree ("_parent_id");
  CREATE INDEX "ibdg_path_idx" ON "ibdg" USING btree ("_path");
  CREATE INDEX "tcs_items_order_idx" ON "tcs_items" USING btree ("_order");
  CREATE INDEX "tcs_items_parent_id_idx" ON "tcs_items" USING btree ("_parent_id");
  CREATE INDEX "tcs_order_idx" ON "tcs" USING btree ("_order");
  CREATE INDEX "tcs_parent_id_idx" ON "tcs" USING btree ("_parent_id");
  CREATE INDEX "tcs_path_idx" ON "tcs" USING btree ("_path");
  CREATE INDEX "tcs_background_image_idx" ON "tcs" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "service_pages_slug_idx" ON "service_pages" USING btree ("slug");
  CREATE INDEX "service_pages_hero_image_idx" ON "service_pages" USING btree ("hero_image_id");
  CREATE INDEX "service_pages_listing_image_idx" ON "service_pages" USING btree ("listing_image_id");
  CREATE INDEX "service_pages_seo_seo_og_image_idx" ON "service_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "service_pages_seo_seo_favicon_svg_override_idx" ON "service_pages" USING btree ("seo_favicon_svg_override_id");
  CREATE INDEX "service_pages_seo_seo_favicon_ico_override_idx" ON "service_pages" USING btree ("seo_favicon_ico_override_id");
  CREATE INDEX "service_pages_seo_seo_apple_touch_icon_override_idx" ON "service_pages" USING btree ("seo_apple_touch_icon_override_id");
  CREATE INDEX "service_pages_updated_at_idx" ON "service_pages" USING btree ("updated_at");
  CREATE INDEX "service_pages_created_at_idx" ON "service_pages" USING btree ("created_at");
  CREATE INDEX "service_pages__status_idx" ON "service_pages" USING btree ("_status");
  CREATE INDEX "_ff_v_order_idx" ON "_ff_v" USING btree ("_order");
  CREATE INDEX "_ff_v_parent_id_idx" ON "_ff_v" USING btree ("_parent_id");
  CREATE INDEX "_sh_v_order_idx" ON "_sh_v" USING btree ("_order");
  CREATE INDEX "_sh_v_parent_id_idx" ON "_sh_v" USING btree ("_parent_id");
  CREATE INDEX "_sh_v_path_idx" ON "_sh_v" USING btree ("_path");
  CREATE INDEX "_sh_v_image_idx" ON "_sh_v" USING btree ("image_id");
  CREATE INDEX "_os_v_deliverables_order_idx" ON "_os_v_deliverables" USING btree ("_order");
  CREATE INDEX "_os_v_deliverables_parent_id_idx" ON "_os_v_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_os_v_order_idx" ON "_os_v" USING btree ("_order");
  CREATE INDEX "_os_v_parent_id_idx" ON "_os_v" USING btree ("_parent_id");
  CREATE INDEX "_os_v_path_idx" ON "_os_v" USING btree ("_path");
  CREATE INDEX "_os_v_intro_image_idx" ON "_os_v" USING btree ("intro_image_id");
  CREATE INDEX "_os_v_detail_image_idx" ON "_os_v" USING btree ("detail_image_id");
  CREATE INDEX "_conf_v_facts_order_idx" ON "_conf_v_facts" USING btree ("_order");
  CREATE INDEX "_conf_v_facts_parent_id_idx" ON "_conf_v_facts" USING btree ("_parent_id");
  CREATE INDEX "_conf_v_order_idx" ON "_conf_v" USING btree ("_order");
  CREATE INDEX "_conf_v_parent_id_idx" ON "_conf_v" USING btree ("_parent_id");
  CREATE INDEX "_conf_v_path_idx" ON "_conf_v" USING btree ("_path");
  CREATE INDEX "_eqs_v_order_idx" ON "_eqs_v" USING btree ("_order");
  CREATE INDEX "_eqs_v_parent_id_idx" ON "_eqs_v" USING btree ("_parent_id");
  CREATE INDEX "_eqs_v_path_idx" ON "_eqs_v" USING btree ("_path");
  CREATE INDEX "_rgrid_v_top_items_order_idx" ON "_rgrid_v_top_items" USING btree ("_order");
  CREATE INDEX "_rgrid_v_top_items_parent_id_idx" ON "_rgrid_v_top_items" USING btree ("_parent_id");
  CREATE INDEX "_rgrid_v_bottom_items_order_idx" ON "_rgrid_v_bottom_items" USING btree ("_order");
  CREATE INDEX "_rgrid_v_bottom_items_parent_id_idx" ON "_rgrid_v_bottom_items" USING btree ("_parent_id");
  CREATE INDEX "_rgrid_v_order_idx" ON "_rgrid_v" USING btree ("_order");
  CREATE INDEX "_rgrid_v_parent_id_idx" ON "_rgrid_v" USING btree ("_parent_id");
  CREATE INDEX "_rgrid_v_path_idx" ON "_rgrid_v" USING btree ("_path");
  CREATE INDEX "_psteps_items_v_order_idx" ON "_psteps_items_v" USING btree ("_order");
  CREATE INDEX "_psteps_items_v_parent_id_idx" ON "_psteps_items_v" USING btree ("_parent_id");
  CREATE INDEX "_psteps_v_order_idx" ON "_psteps_v" USING btree ("_order");
  CREATE INDEX "_psteps_v_parent_id_idx" ON "_psteps_v" USING btree ("_parent_id");
  CREATE INDEX "_psteps_v_path_idx" ON "_psteps_v" USING btree ("_path");
  CREATE INDEX "_rgns_v_regions_order_idx" ON "_rgns_v_regions" USING btree ("_order");
  CREATE INDEX "_rgns_v_regions_parent_id_idx" ON "_rgns_v_regions" USING btree ("_parent_id");
  CREATE INDEX "_rgns_v_order_idx" ON "_rgns_v" USING btree ("_order");
  CREATE INDEX "_rgns_v_parent_id_idx" ON "_rgns_v" USING btree ("_parent_id");
  CREATE INDEX "_rgns_v_path_idx" ON "_rgns_v" USING btree ("_path");
  CREATE INDEX "_sup_cards_v_lines_order_idx" ON "_sup_cards_v_lines" USING btree ("_order");
  CREATE INDEX "_sup_cards_v_lines_parent_id_idx" ON "_sup_cards_v_lines" USING btree ("_parent_id");
  CREATE INDEX "_sup_cards_v_order_idx" ON "_sup_cards_v" USING btree ("_order");
  CREATE INDEX "_sup_cards_v_parent_id_idx" ON "_sup_cards_v" USING btree ("_parent_id");
  CREATE INDEX "_supc_v_order_idx" ON "_supc_v" USING btree ("_order");
  CREATE INDEX "_supc_v_parent_id_idx" ON "_supc_v" USING btree ("_parent_id");
  CREATE INDEX "_supc_v_path_idx" ON "_supc_v" USING btree ("_path");
  CREATE INDEX "_ceq_v_lines_order_idx" ON "_ceq_v_lines" USING btree ("_order");
  CREATE INDEX "_ceq_v_lines_parent_id_idx" ON "_ceq_v_lines" USING btree ("_parent_id");
  CREATE INDEX "_ceq_v_features_order_idx" ON "_ceq_v_features" USING btree ("_order");
  CREATE INDEX "_ceq_v_features_parent_id_idx" ON "_ceq_v_features" USING btree ("_parent_id");
  CREATE INDEX "_ceq_v_order_idx" ON "_ceq_v" USING btree ("_order");
  CREATE INDEX "_ceq_v_parent_id_idx" ON "_ceq_v" USING btree ("_parent_id");
  CREATE INDEX "_ceq_v_path_idx" ON "_ceq_v" USING btree ("_path");
  CREATE INDEX "_ceq_v_background_image_idx" ON "_ceq_v" USING btree ("background_image_id");
  CREATE INDEX "_wsteps_items_v_order_idx" ON "_wsteps_items_v" USING btree ("_order");
  CREATE INDEX "_wsteps_items_v_parent_id_idx" ON "_wsteps_items_v" USING btree ("_parent_id");
  CREATE INDEX "_wsteps_items_v_image_idx" ON "_wsteps_items_v" USING btree ("image_id");
  CREATE INDEX "_walt_v_order_idx" ON "_walt_v" USING btree ("_order");
  CREATE INDEX "_walt_v_parent_id_idx" ON "_walt_v" USING btree ("_parent_id");
  CREATE INDEX "_walt_v_path_idx" ON "_walt_v" USING btree ("_path");
  CREATE INDEX "_struct_cards_v_order_idx" ON "_struct_cards_v" USING btree ("_order");
  CREATE INDEX "_struct_cards_v_parent_id_idx" ON "_struct_cards_v" USING btree ("_parent_id");
  CREATE INDEX "_scards_v_order_idx" ON "_scards_v" USING btree ("_order");
  CREATE INDEX "_scards_v_parent_id_idx" ON "_scards_v" USING btree ("_parent_id");
  CREATE INDEX "_scards_v_path_idx" ON "_scards_v" USING btree ("_path");
  CREATE INDEX "_prodc_v_cards_order_idx" ON "_prodc_v_cards" USING btree ("_order");
  CREATE INDEX "_prodc_v_cards_parent_id_idx" ON "_prodc_v_cards" USING btree ("_parent_id");
  CREATE INDEX "_prodc_v_compliance_items_order_idx" ON "_prodc_v_compliance_items" USING btree ("_order");
  CREATE INDEX "_prodc_v_compliance_items_parent_id_idx" ON "_prodc_v_compliance_items" USING btree ("_parent_id");
  CREATE INDEX "_prodc_v_order_idx" ON "_prodc_v" USING btree ("_order");
  CREATE INDEX "_prodc_v_parent_id_idx" ON "_prodc_v" USING btree ("_parent_id");
  CREATE INDEX "_prodc_v_path_idx" ON "_prodc_v" USING btree ("_path");
  CREATE INDEX "_prodc_v_background_image_idx" ON "_prodc_v" USING btree ("background_image_id");
  CREATE INDEX "_cgrid_cards_v_order_idx" ON "_cgrid_cards_v" USING btree ("_order");
  CREATE INDEX "_cgrid_cards_v_parent_id_idx" ON "_cgrid_cards_v" USING btree ("_parent_id");
  CREATE INDEX "_rows_v_order_idx" ON "_rows_v" USING btree ("_order");
  CREATE INDEX "_rows_v_parent_id_idx" ON "_rows_v" USING btree ("_parent_id");
  CREATE INDEX "_cgrid_v_order_idx" ON "_cgrid_v" USING btree ("_order");
  CREATE INDEX "_cgrid_v_parent_id_idx" ON "_cgrid_v" USING btree ("_parent_id");
  CREATE INDEX "_cgrid_v_path_idx" ON "_cgrid_v" USING btree ("_path");
  CREATE INDEX "_soff_v_details_order_idx" ON "_soff_v_details" USING btree ("_order");
  CREATE INDEX "_soff_v_details_parent_id_idx" ON "_soff_v_details" USING btree ("_parent_id");
  CREATE INDEX "_soff_v_order_idx" ON "_soff_v" USING btree ("_order");
  CREATE INDEX "_soff_v_parent_id_idx" ON "_soff_v" USING btree ("_parent_id");
  CREATE INDEX "_soff_v_path_idx" ON "_soff_v" USING btree ("_path");
  CREATE INDEX "_soff_v_image_idx" ON "_soff_v" USING btree ("image_id");
  CREATE INDEX "_acomp_v_review_items_order_idx" ON "_acomp_v_review_items" USING btree ("_order");
  CREATE INDEX "_acomp_v_review_items_parent_id_idx" ON "_acomp_v_review_items" USING btree ("_parent_id");
  CREATE INDEX "_acomp_v_included_items_order_idx" ON "_acomp_v_included_items" USING btree ("_order");
  CREATE INDEX "_acomp_v_included_items_parent_id_idx" ON "_acomp_v_included_items" USING btree ("_parent_id");
  CREATE INDEX "_acomp_v_excluded_items_order_idx" ON "_acomp_v_excluded_items" USING btree ("_order");
  CREATE INDEX "_acomp_v_excluded_items_parent_id_idx" ON "_acomp_v_excluded_items" USING btree ("_parent_id");
  CREATE INDEX "_acomp_v_bottom_items_order_idx" ON "_acomp_v_bottom_items" USING btree ("_order");
  CREATE INDEX "_acomp_v_bottom_items_parent_id_idx" ON "_acomp_v_bottom_items" USING btree ("_parent_id");
  CREATE INDEX "_acomp_v_order_idx" ON "_acomp_v" USING btree ("_order");
  CREATE INDEX "_acomp_v_parent_id_idx" ON "_acomp_v" USING btree ("_parent_id");
  CREATE INDEX "_acomp_v_path_idx" ON "_acomp_v" USING btree ("_path");
  CREATE INDEX "_acomp_v_background_image_idx" ON "_acomp_v" USING btree ("background_image_id");
  CREATE INDEX "_paras_v_order_idx" ON "_paras_v" USING btree ("_order");
  CREATE INDEX "_paras_v_parent_id_idx" ON "_paras_v" USING btree ("_parent_id");
  CREATE INDEX "_rti_v_order_idx" ON "_rti_v" USING btree ("_order");
  CREATE INDEX "_rti_v_parent_id_idx" ON "_rti_v" USING btree ("_parent_id");
  CREATE INDEX "_rti_v_path_idx" ON "_rti_v" USING btree ("_path");
  CREATE INDEX "_ovip_v_services_order_idx" ON "_ovip_v_services" USING btree ("_order");
  CREATE INDEX "_ovip_v_services_parent_id_idx" ON "_ovip_v_services" USING btree ("_parent_id");
  CREATE INDEX "_ovip_v_order_idx" ON "_ovip_v" USING btree ("_order");
  CREATE INDEX "_ovip_v_parent_id_idx" ON "_ovip_v" USING btree ("_parent_id");
  CREATE INDEX "_ovip_v_path_idx" ON "_ovip_v" USING btree ("_path");
  CREATE INDEX "_ovip_v_background_image_idx" ON "_ovip_v" USING btree ("background_image_id");
  CREATE INDEX "_ssplit_v_left_items_order_idx" ON "_ssplit_v_left_items" USING btree ("_order");
  CREATE INDEX "_ssplit_v_left_items_parent_id_idx" ON "_ssplit_v_left_items" USING btree ("_parent_id");
  CREATE INDEX "_ssplit_v_order_idx" ON "_ssplit_v" USING btree ("_order");
  CREATE INDEX "_ssplit_v_parent_id_idx" ON "_ssplit_v" USING btree ("_parent_id");
  CREATE INDEX "_ssplit_v_path_idx" ON "_ssplit_v" USING btree ("_path");
  CREATE INDEX "_pcc_v_approach_items_order_idx" ON "_pcc_v_approach_items" USING btree ("_order");
  CREATE INDEX "_pcc_v_approach_items_parent_id_idx" ON "_pcc_v_approach_items" USING btree ("_parent_id");
  CREATE INDEX "_pcc_v_support_items_order_idx" ON "_pcc_v_support_items" USING btree ("_order");
  CREATE INDEX "_pcc_v_support_items_parent_id_idx" ON "_pcc_v_support_items" USING btree ("_parent_id");
  CREATE INDEX "_pcc_v_order_idx" ON "_pcc_v" USING btree ("_order");
  CREATE INDEX "_pcc_v_parent_id_idx" ON "_pcc_v" USING btree ("_parent_id");
  CREATE INDEX "_pcc_v_path_idx" ON "_pcc_v" USING btree ("_path");
  CREATE INDEX "_cta_v_order_idx" ON "_cta_v" USING btree ("_order");
  CREATE INDEX "_cta_v_parent_id_idx" ON "_cta_v" USING btree ("_parent_id");
  CREATE INDEX "_cta_v_path_idx" ON "_cta_v" USING btree ("_path");
  CREATE INDEX "_cta_v_image_idx" ON "_cta_v" USING btree ("image_id");
  CREATE INDEX "_tlst_v_items_order_idx" ON "_tlst_v_items" USING btree ("_order");
  CREATE INDEX "_tlst_v_items_parent_id_idx" ON "_tlst_v_items" USING btree ("_parent_id");
  CREATE INDEX "_tlst_v_order_idx" ON "_tlst_v" USING btree ("_order");
  CREATE INDEX "_tlst_v_parent_id_idx" ON "_tlst_v" USING btree ("_parent_id");
  CREATE INDEX "_tlst_v_path_idx" ON "_tlst_v" USING btree ("_path");
  CREATE INDEX "_fhs_v_highlights_order_idx" ON "_fhs_v_highlights" USING btree ("_order");
  CREATE INDEX "_fhs_v_highlights_parent_id_idx" ON "_fhs_v_highlights" USING btree ("_parent_id");
  CREATE INDEX "_fhs_v_order_idx" ON "_fhs_v" USING btree ("_order");
  CREATE INDEX "_fhs_v_parent_id_idx" ON "_fhs_v" USING btree ("_parent_id");
  CREATE INDEX "_fhs_v_path_idx" ON "_fhs_v" USING btree ("_path");
  CREATE INDEX "_aspl_v_items_order_idx" ON "_aspl_v_items" USING btree ("_order");
  CREATE INDEX "_aspl_v_items_parent_id_idx" ON "_aspl_v_items" USING btree ("_parent_id");
  CREATE INDEX "_aspl_v_order_idx" ON "_aspl_v" USING btree ("_order");
  CREATE INDEX "_aspl_v_parent_id_idx" ON "_aspl_v" USING btree ("_parent_id");
  CREATE INDEX "_aspl_v_path_idx" ON "_aspl_v" USING btree ("_path");
  CREATE INDEX "_ibdg_v_order_idx" ON "_ibdg_v" USING btree ("_order");
  CREATE INDEX "_ibdg_v_parent_id_idx" ON "_ibdg_v" USING btree ("_parent_id");
  CREATE INDEX "_ibdg_v_path_idx" ON "_ibdg_v" USING btree ("_path");
  CREATE INDEX "_tcs_v_items_order_idx" ON "_tcs_v_items" USING btree ("_order");
  CREATE INDEX "_tcs_v_items_parent_id_idx" ON "_tcs_v_items" USING btree ("_parent_id");
  CREATE INDEX "_tcs_v_order_idx" ON "_tcs_v" USING btree ("_order");
  CREATE INDEX "_tcs_v_parent_id_idx" ON "_tcs_v" USING btree ("_parent_id");
  CREATE INDEX "_tcs_v_path_idx" ON "_tcs_v" USING btree ("_path");
  CREATE INDEX "_tcs_v_background_image_idx" ON "_tcs_v" USING btree ("background_image_id");
  CREATE INDEX "_service_pages_v_parent_idx" ON "_service_pages_v" USING btree ("parent_id");
  CREATE INDEX "_service_pages_v_version_version_slug_idx" ON "_service_pages_v" USING btree ("version_slug");
  CREATE INDEX "_service_pages_v_version_version_hero_image_idx" ON "_service_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_service_pages_v_version_version_listing_image_idx" ON "_service_pages_v" USING btree ("version_listing_image_id");
  CREATE INDEX "_service_pages_v_version_seo_version_seo_og_image_idx" ON "_service_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_service_pages_v_version_seo_version_seo_favicon_svg_ove_idx" ON "_service_pages_v" USING btree ("version_seo_favicon_svg_override_id");
  CREATE INDEX "_service_pages_v_version_seo_version_seo_favicon_ico_ove_idx" ON "_service_pages_v" USING btree ("version_seo_favicon_ico_override_id");
  CREATE INDEX "_service_pages_v_version_seo_version_seo_apple_touch_ico_idx" ON "_service_pages_v" USING btree ("version_seo_apple_touch_icon_override_id");
  CREATE INDEX "_service_pages_v_version_version_updated_at_idx" ON "_service_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_service_pages_v_version_version_created_at_idx" ON "_service_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_service_pages_v_version_version__status_idx" ON "_service_pages_v" USING btree ("version__status");
  CREATE INDEX "_service_pages_v_created_at_idx" ON "_service_pages_v" USING btree ("created_at");
  CREATE INDEX "_service_pages_v_updated_at_idx" ON "_service_pages_v" USING btree ("updated_at");
  CREATE INDEX "_service_pages_v_latest_idx" ON "_service_pages_v" USING btree ("latest");
  CREATE INDEX "form_submissions_service_page_idx" ON "form_submissions" USING btree ("service_page_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_service_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("service_pages_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_favicon_svg_idx" ON "site_settings" USING btree ("favicon_svg_id");
  CREATE INDEX "site_settings_favicon_ico_idx" ON "site_settings" USING btree ("favicon_ico_id");
  CREATE INDEX "site_settings_apple_touch_icon_idx" ON "site_settings" USING btree ("apple_touch_icon_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_service_page_idx" ON "header_nav_items" USING btree ("service_page_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_mobile_logo_idx" ON "header" USING btree ("mobile_logo_id");
  CREATE INDEX "footer_main_links_order_idx" ON "footer_main_links" USING btree ("_order");
  CREATE INDEX "footer_main_links_parent_id_idx" ON "footer_main_links" USING btree ("_parent_id");
  CREATE INDEX "footer_main_links_service_page_idx" ON "footer_main_links" USING btree ("service_page_id");
  CREATE INDEX "footer_utility_links_order_idx" ON "footer_utility_links" USING btree ("_order");
  CREATE INDEX "footer_utility_links_parent_id_idx" ON "footer_utility_links" USING btree ("_parent_id");
  CREATE INDEX "footer_utility_links_service_page_idx" ON "footer_utility_links" USING btree ("service_page_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "home_page_featured_services_order_idx" ON "home_page_featured_services" USING btree ("_order");
  CREATE INDEX "home_page_featured_services_parent_id_idx" ON "home_page_featured_services" USING btree ("_parent_id");
  CREATE INDEX "home_page_featured_services_service_idx" ON "home_page_featured_services" USING btree ("service_id");
  CREATE INDEX "home_page_hero_hero_background_image_idx" ON "home_page" USING btree ("hero_background_image_id");
  CREATE INDEX "home_page_seo_seo_og_image_idx" ON "home_page" USING btree ("seo_og_image_id");
  CREATE INDEX "home_page_seo_seo_favicon_svg_override_idx" ON "home_page" USING btree ("seo_favicon_svg_override_id");
  CREATE INDEX "home_page_seo_seo_favicon_ico_override_idx" ON "home_page" USING btree ("seo_favicon_ico_override_id");
  CREATE INDEX "home_page_seo_seo_apple_touch_icon_override_idx" ON "home_page" USING btree ("seo_apple_touch_icon_override_id");
  CREATE INDEX "about_page_hero_stats_order_idx" ON "about_page_hero_stats" USING btree ("_order");
  CREATE INDEX "about_page_hero_stats_parent_id_idx" ON "about_page_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_items_order_idx" ON "about_page_values_items" USING btree ("_order");
  CREATE INDEX "about_page_values_items_parent_id_idx" ON "about_page_values_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_items_icon_idx" ON "about_page_values_items" USING btree ("icon_id");
  CREATE INDEX "about_page_office_details_order_idx" ON "about_page_office_details" USING btree ("_order");
  CREATE INDEX "about_page_office_details_parent_id_idx" ON "about_page_office_details" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_members_order_idx" ON "about_page_team_members" USING btree ("_order");
  CREATE INDEX "about_page_team_members_parent_id_idx" ON "about_page_team_members" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_members_image_idx" ON "about_page_team_members" USING btree ("image_id");
  CREATE INDEX "about_page_hero_primary_action_hero_primary_action_servi_idx" ON "about_page" USING btree ("hero_primary_action_service_page_id");
  CREATE INDEX "about_page_hero_secondary_action_hero_secondary_action_s_idx" ON "about_page" USING btree ("hero_secondary_action_service_page_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_about_story_cta_about_story_cta_service_page_idx" ON "about_page" USING btree ("about_story_cta_service_page_id");
  CREATE INDEX "about_page_about_story_about_story_image_idx" ON "about_page" USING btree ("about_story_image_id");
  CREATE INDEX "about_page_office_office_image_idx" ON "about_page" USING btree ("office_image_id");
  CREATE INDEX "about_page_office_visit_link_office_visit_link_service_p_idx" ON "about_page" USING btree ("office_visit_link_service_page_id");
  CREATE INDEX "about_page_cta_button_cta_button_service_page_idx" ON "about_page" USING btree ("cta_button_service_page_id");
  CREATE INDEX "about_page_cta_cta_image_idx" ON "about_page" USING btree ("cta_image_id");
  CREATE INDEX "about_page_seo_seo_og_image_idx" ON "about_page" USING btree ("seo_og_image_id");
  CREATE INDEX "about_page_seo_seo_favicon_svg_override_idx" ON "about_page" USING btree ("seo_favicon_svg_override_id");
  CREATE INDEX "about_page_seo_seo_favicon_ico_override_idx" ON "about_page" USING btree ("seo_favicon_ico_override_id");
  CREATE INDEX "about_page_seo_seo_apple_touch_icon_override_idx" ON "about_page" USING btree ("seo_apple_touch_icon_override_id");
  CREATE INDEX "services_page_values_grid_items_order_idx" ON "services_page_values_grid_items" USING btree ("_order");
  CREATE INDEX "services_page_values_grid_items_parent_id_idx" ON "services_page_values_grid_items" USING btree ("_parent_id");
  CREATE INDEX "services_page_cta_button_cta_button_service_page_idx" ON "services_page" USING btree ("cta_button_service_page_id");
  CREATE INDEX "services_page_cta_cta_image_idx" ON "services_page" USING btree ("cta_image_id");
  CREATE INDEX "services_page_seo_seo_og_image_idx" ON "services_page" USING btree ("seo_og_image_id");
  CREATE INDEX "services_page_seo_seo_favicon_svg_override_idx" ON "services_page" USING btree ("seo_favicon_svg_override_id");
  CREATE INDEX "services_page_seo_seo_favicon_ico_override_idx" ON "services_page" USING btree ("seo_favicon_ico_override_id");
  CREATE INDEX "services_page_seo_seo_apple_touch_icon_override_idx" ON "services_page" USING btree ("seo_apple_touch_icon_override_id");
  CREATE INDEX "contact_page_hero_contact_methods_order_idx" ON "contact_page_hero_contact_methods" USING btree ("_order");
  CREATE INDEX "contact_page_hero_contact_methods_parent_id_idx" ON "contact_page_hero_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "contact_page_office_details_order_idx" ON "contact_page_office_details" USING btree ("_order");
  CREATE INDEX "contact_page_office_details_parent_id_idx" ON "contact_page_office_details" USING btree ("_parent_id");
  CREATE INDEX "contact_page_partners_logos_order_idx" ON "contact_page_partners_logos" USING btree ("_order");
  CREATE INDEX "contact_page_partners_logos_parent_id_idx" ON "contact_page_partners_logos" USING btree ("_parent_id");
  CREATE INDEX "contact_page_partners_logos_image_idx" ON "contact_page_partners_logos" USING btree ("image_id");
  CREATE INDEX "contact_page_office_office_image_idx" ON "contact_page" USING btree ("office_image_id");
  CREATE INDEX "contact_page_office_visit_link_office_visit_link_service_idx" ON "contact_page" USING btree ("office_visit_link_service_page_id");
  CREATE INDEX "contact_page_cta_button_cta_button_service_page_idx" ON "contact_page" USING btree ("cta_button_service_page_id");
  CREATE INDEX "contact_page_cta_cta_image_idx" ON "contact_page" USING btree ("cta_image_id");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "contact_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contact_page_seo_seo_favicon_svg_override_idx" ON "contact_page" USING btree ("seo_favicon_svg_override_id");
  CREATE INDEX "contact_page_seo_seo_favicon_ico_override_idx" ON "contact_page" USING btree ("seo_favicon_ico_override_id");
  CREATE INDEX "contact_page_seo_seo_apple_touch_icon_override_idx" ON "contact_page" USING btree ("seo_apple_touch_icon_override_id");
  CREATE INDEX "faq_page_items_order_idx" ON "faq_page_items" USING btree ("_order");
  CREATE INDEX "faq_page_items_parent_id_idx" ON "faq_page_items" USING btree ("_parent_id");
  CREATE INDEX "faq_page_seo_seo_og_image_idx" ON "faq_page" USING btree ("seo_og_image_id");
  CREATE INDEX "faq_page_seo_seo_favicon_svg_override_idx" ON "faq_page" USING btree ("seo_favicon_svg_override_id");
  CREATE INDEX "faq_page_seo_seo_favicon_ico_override_idx" ON "faq_page" USING btree ("seo_favicon_ico_override_id");
  CREATE INDEX "faq_page_seo_seo_apple_touch_icon_override_idx" ON "faq_page" USING btree ("seo_apple_touch_icon_override_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "ff" CASCADE;
  DROP TABLE "sh" CASCADE;
  DROP TABLE "os_deliverables" CASCADE;
  DROP TABLE "os" CASCADE;
  DROP TABLE "conf_facts" CASCADE;
  DROP TABLE "conf" CASCADE;
  DROP TABLE "eqs" CASCADE;
  DROP TABLE "rgrid_top_items" CASCADE;
  DROP TABLE "rgrid_bottom_items" CASCADE;
  DROP TABLE "rgrid" CASCADE;
  DROP TABLE "psteps_items" CASCADE;
  DROP TABLE "psteps" CASCADE;
  DROP TABLE "rgns_regions" CASCADE;
  DROP TABLE "rgns" CASCADE;
  DROP TABLE "sup_cards_lines" CASCADE;
  DROP TABLE "sup_cards" CASCADE;
  DROP TABLE "supc" CASCADE;
  DROP TABLE "ceq_lines" CASCADE;
  DROP TABLE "ceq_features" CASCADE;
  DROP TABLE "ceq" CASCADE;
  DROP TABLE "wsteps_items" CASCADE;
  DROP TABLE "walt" CASCADE;
  DROP TABLE "struct_cards" CASCADE;
  DROP TABLE "scards" CASCADE;
  DROP TABLE "prodc_cards" CASCADE;
  DROP TABLE "prodc_compliance_items" CASCADE;
  DROP TABLE "prodc" CASCADE;
  DROP TABLE "cgrid_cards" CASCADE;
  DROP TABLE "rows" CASCADE;
  DROP TABLE "cgrid" CASCADE;
  DROP TABLE "soff_details" CASCADE;
  DROP TABLE "soff" CASCADE;
  DROP TABLE "acomp_review_items" CASCADE;
  DROP TABLE "acomp_included_items" CASCADE;
  DROP TABLE "acomp_excluded_items" CASCADE;
  DROP TABLE "acomp_bottom_items" CASCADE;
  DROP TABLE "acomp" CASCADE;
  DROP TABLE "paras" CASCADE;
  DROP TABLE "rti" CASCADE;
  DROP TABLE "ovip_services" CASCADE;
  DROP TABLE "ovip" CASCADE;
  DROP TABLE "ssplit_left_items" CASCADE;
  DROP TABLE "ssplit" CASCADE;
  DROP TABLE "pcc_approach_items" CASCADE;
  DROP TABLE "pcc_support_items" CASCADE;
  DROP TABLE "pcc" CASCADE;
  DROP TABLE "cta" CASCADE;
  DROP TABLE "tlst_items" CASCADE;
  DROP TABLE "tlst" CASCADE;
  DROP TABLE "fhs_highlights" CASCADE;
  DROP TABLE "fhs" CASCADE;
  DROP TABLE "aspl_items" CASCADE;
  DROP TABLE "aspl" CASCADE;
  DROP TABLE "ibdg" CASCADE;
  DROP TABLE "tcs_items" CASCADE;
  DROP TABLE "tcs" CASCADE;
  DROP TABLE "service_pages" CASCADE;
  DROP TABLE "_ff_v" CASCADE;
  DROP TABLE "_sh_v" CASCADE;
  DROP TABLE "_os_v_deliverables" CASCADE;
  DROP TABLE "_os_v" CASCADE;
  DROP TABLE "_conf_v_facts" CASCADE;
  DROP TABLE "_conf_v" CASCADE;
  DROP TABLE "_eqs_v" CASCADE;
  DROP TABLE "_rgrid_v_top_items" CASCADE;
  DROP TABLE "_rgrid_v_bottom_items" CASCADE;
  DROP TABLE "_rgrid_v" CASCADE;
  DROP TABLE "_psteps_items_v" CASCADE;
  DROP TABLE "_psteps_v" CASCADE;
  DROP TABLE "_rgns_v_regions" CASCADE;
  DROP TABLE "_rgns_v" CASCADE;
  DROP TABLE "_sup_cards_v_lines" CASCADE;
  DROP TABLE "_sup_cards_v" CASCADE;
  DROP TABLE "_supc_v" CASCADE;
  DROP TABLE "_ceq_v_lines" CASCADE;
  DROP TABLE "_ceq_v_features" CASCADE;
  DROP TABLE "_ceq_v" CASCADE;
  DROP TABLE "_wsteps_items_v" CASCADE;
  DROP TABLE "_walt_v" CASCADE;
  DROP TABLE "_struct_cards_v" CASCADE;
  DROP TABLE "_scards_v" CASCADE;
  DROP TABLE "_prodc_v_cards" CASCADE;
  DROP TABLE "_prodc_v_compliance_items" CASCADE;
  DROP TABLE "_prodc_v" CASCADE;
  DROP TABLE "_cgrid_cards_v" CASCADE;
  DROP TABLE "_rows_v" CASCADE;
  DROP TABLE "_cgrid_v" CASCADE;
  DROP TABLE "_soff_v_details" CASCADE;
  DROP TABLE "_soff_v" CASCADE;
  DROP TABLE "_acomp_v_review_items" CASCADE;
  DROP TABLE "_acomp_v_included_items" CASCADE;
  DROP TABLE "_acomp_v_excluded_items" CASCADE;
  DROP TABLE "_acomp_v_bottom_items" CASCADE;
  DROP TABLE "_acomp_v" CASCADE;
  DROP TABLE "_paras_v" CASCADE;
  DROP TABLE "_rti_v" CASCADE;
  DROP TABLE "_ovip_v_services" CASCADE;
  DROP TABLE "_ovip_v" CASCADE;
  DROP TABLE "_ssplit_v_left_items" CASCADE;
  DROP TABLE "_ssplit_v" CASCADE;
  DROP TABLE "_pcc_v_approach_items" CASCADE;
  DROP TABLE "_pcc_v_support_items" CASCADE;
  DROP TABLE "_pcc_v" CASCADE;
  DROP TABLE "_cta_v" CASCADE;
  DROP TABLE "_tlst_v_items" CASCADE;
  DROP TABLE "_tlst_v" CASCADE;
  DROP TABLE "_fhs_v_highlights" CASCADE;
  DROP TABLE "_fhs_v" CASCADE;
  DROP TABLE "_aspl_v_items" CASCADE;
  DROP TABLE "_aspl_v" CASCADE;
  DROP TABLE "_ibdg_v" CASCADE;
  DROP TABLE "_tcs_v_items" CASCADE;
  DROP TABLE "_tcs_v" CASCADE;
  DROP TABLE "_service_pages_v" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_main_links" CASCADE;
  DROP TABLE "footer_utility_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "home_page_featured_services" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "about_page_hero_stats" CASCADE;
  DROP TABLE "about_page_values_items" CASCADE;
  DROP TABLE "about_page_office_details" CASCADE;
  DROP TABLE "about_page_team_members" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "services_page_values_grid_items" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "contact_page_hero_contact_methods" CASCADE;
  DROP TABLE "contact_page_office_details" CASCADE;
  DROP TABLE "contact_page_partners_logos" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "faq_page_items" CASCADE;
  DROP TABLE "faq_page" CASCADE;
  DROP TYPE "public"."it";
  DROP TYPE "public"."enum_cgrid_cards_tone";
  DROP TYPE "public"."enum_service_pages_status";
  DROP TYPE "public"."enum__cgrid_cards_v_tone";
  DROP TYPE "public"."enum__service_pages_v_version_status";
  DROP TYPE "public"."enum_form_submissions_submission_type";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_header_nav_items_page_ref";
  DROP TYPE "public"."enum_footer_main_links_type";
  DROP TYPE "public"."enum_footer_main_links_page_ref";
  DROP TYPE "public"."enum_footer_utility_links_type";
  DROP TYPE "public"."enum_footer_utility_links_page_ref";
  DROP TYPE "public"."enum_home_page_featured_services_position";
  DROP TYPE "public"."enum_about_page_hero_primary_action_type";
  DROP TYPE "public"."enum_about_page_hero_primary_action_page_ref";
  DROP TYPE "public"."enum_about_page_hero_secondary_action_type";
  DROP TYPE "public"."enum_about_page_hero_secondary_action_page_ref";
  DROP TYPE "public"."enum_about_page_about_story_cta_type";
  DROP TYPE "public"."enum_about_page_about_story_cta_page_ref";
  DROP TYPE "public"."enum_about_page_office_visit_link_type";
  DROP TYPE "public"."enum_about_page_office_visit_link_page_ref";
  DROP TYPE "public"."enum_about_page_cta_button_type";
  DROP TYPE "public"."enum_about_page_cta_button_page_ref";
  DROP TYPE "public"."enum_about_page_cta_variant";
  DROP TYPE "public"."enum_services_page_cta_button_type";
  DROP TYPE "public"."enum_services_page_cta_button_page_ref";
  DROP TYPE "public"."enum_services_page_cta_variant";
  DROP TYPE "public"."enum_contact_page_hero_contact_methods_icon";
  DROP TYPE "public"."enum_contact_page_office_visit_link_type";
  DROP TYPE "public"."enum_contact_page_office_visit_link_page_ref";
  DROP TYPE "public"."enum_contact_page_cta_button_type";
  DROP TYPE "public"."enum_contact_page_cta_button_page_ref";
  DROP TYPE "public"."enum_contact_page_cta_variant";`)
}
