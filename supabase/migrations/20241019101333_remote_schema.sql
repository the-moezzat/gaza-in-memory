

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."requesting_user_id"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
    SELECT NULLIF(
        current_setting('request.jwt.claims', true)::json->>'sub',
        ''
    )::text;
$$;


ALTER FUNCTION "public"."requesting_user_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."children" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "martyr_id" "uuid",
    "name" "text" NOT NULL,
    "age" integer NOT NULL,
    "gender" "text" NOT NULL,
    "status" "text" NOT NULL,
    "date_of_death" "date",
    CONSTRAINT "children_age_check" CHECK (("age" >= 0)),
    CONSTRAINT "children_gender_check" CHECK (("gender" = ANY (ARRAY['male'::"text", 'female'::"text"])))
);


ALTER TABLE "public"."children" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "martyr_id" "uuid",
    "title" "text" NOT NULL,
    "description" "text",
    "event_date" "date" NOT NULL
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."gallery" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "martyr_id" "uuid",
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."gallery" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."interests_and_hobbies" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "martyr_id" "uuid",
    "category" "text" NOT NULL,
    "tags" "text"[] DEFAULT '{}'::"text"[] NOT NULL
);


ALTER TABLE "public"."interests_and_hobbies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."martyrs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "creator_id" "text" DEFAULT "public"."requesting_user_id"() NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "middle_name" "text",
    "gender" "text" NOT NULL,
    "date_of_birth" "date" NOT NULL,
    "city" "text" NOT NULL,
    "story_type" "text" NOT NULL,
    "story" "jsonb",
    "guided_story" "jsonb",
    "profile_image_url" "text",
    "status" "text" NOT NULL,
    "date_of_death" "date",
    "cause_of_death" "text",
    "married" boolean DEFAULT false,
    "spouse_first_name" "text",
    "spouse_last_name" "text",
    "social_media" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "martyrs_gender_check" CHECK (("gender" = ANY (ARRAY['male'::"text", 'female'::"text"]))),
    CONSTRAINT "martyrs_story_type_check" CHECK (("story_type" = ANY (ARRAY['free'::"text", 'guided'::"text"])))
);


ALTER TABLE "public"."martyrs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tasks" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "user_id" "text" DEFAULT "public"."requesting_user_id"() NOT NULL
);


ALTER TABLE "public"."tasks" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."tasks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."tasks_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."tasks_id_seq" OWNED BY "public"."tasks"."id";



CREATE TABLE IF NOT EXISTS "public"."testimonials" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "martyr_id" "uuid",
    "author_name" "text",
    "author_id" "text" DEFAULT "public"."requesting_user_id"(),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "content" "text"[] DEFAULT '{}'::"text"[] NOT NULL
);


ALTER TABLE "public"."testimonials" OWNER TO "postgres";


ALTER TABLE ONLY "public"."tasks" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tasks_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."children"
    ADD CONSTRAINT "children_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."gallery"
    ADD CONSTRAINT "gallery_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."interests_and_hobbies"
    ADD CONSTRAINT "interests_and_hobbies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."martyrs"
    ADD CONSTRAINT "martyrs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."testimonials"
    ADD CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_children_martyr_id" ON "public"."children" USING "btree" ("martyr_id");



CREATE INDEX "idx_children_status" ON "public"."children" USING "btree" ("status");



CREATE INDEX "idx_events_event_date" ON "public"."events" USING "btree" ("event_date");



CREATE INDEX "idx_events_martyr_id" ON "public"."events" USING "btree" ("martyr_id");



CREATE INDEX "idx_gallery_martyr_id" ON "public"."gallery" USING "btree" ("martyr_id");



CREATE INDEX "idx_interests_and_hobbies_category" ON "public"."interests_and_hobbies" USING "btree" ("category");



CREATE INDEX "idx_interests_and_hobbies_martyr_id" ON "public"."interests_and_hobbies" USING "btree" ("martyr_id");



CREATE INDEX "idx_martyrs_city" ON "public"."martyrs" USING "btree" ("city");



CREATE INDEX "idx_martyrs_creator_id" ON "public"."martyrs" USING "btree" ("creator_id");



CREATE INDEX "idx_martyrs_date_of_birth" ON "public"."martyrs" USING "btree" ("date_of_birth");



CREATE INDEX "idx_martyrs_date_of_death" ON "public"."martyrs" USING "btree" ("date_of_death");



CREATE INDEX "idx_martyrs_status" ON "public"."martyrs" USING "btree" ("status");



CREATE INDEX "idx_testimonials_created_at" ON "public"."testimonials" USING "btree" ("created_at");



CREATE INDEX "idx_testimonials_martyr_id" ON "public"."testimonials" USING "btree" ("martyr_id");



CREATE OR REPLACE TRIGGER "update_martyrs_updated_at" BEFORE UPDATE ON "public"."martyrs" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."children"
    ADD CONSTRAINT "children_martyr_id_fkey" FOREIGN KEY ("martyr_id") REFERENCES "public"."martyrs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_martyr_id_fkey" FOREIGN KEY ("martyr_id") REFERENCES "public"."martyrs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."gallery"
    ADD CONSTRAINT "gallery_martyr_id_fkey" FOREIGN KEY ("martyr_id") REFERENCES "public"."martyrs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."interests_and_hobbies"
    ADD CONSTRAINT "interests_and_hobbies_martyr_id_fkey" FOREIGN KEY ("martyr_id") REFERENCES "public"."martyrs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."testimonials"
    ADD CONSTRAINT "testimonials_martyr_id_fkey" FOREIGN KEY ("martyr_id") REFERENCES "public"."martyrs"("id") ON DELETE CASCADE;



CREATE POLICY "Insert tasks policy" ON "public"."tasks" FOR INSERT TO "authenticated" WITH CHECK (("public"."requesting_user_id"() = "user_id"));



CREATE POLICY "Select tasks policy" ON "public"."tasks" FOR SELECT TO "authenticated" USING (("public"."requesting_user_id"() = "user_id"));



ALTER TABLE "public"."children" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "delete_children" ON "public"."children" FOR DELETE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "delete_events" ON "public"."events" FOR DELETE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "delete_gallery" ON "public"."gallery" FOR DELETE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "delete_interests_and_hobbies" ON "public"."interests_and_hobbies" FOR DELETE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "delete_martyrs" ON "public"."martyrs" FOR DELETE TO "authenticated" USING (("creator_id" = "public"."requesting_user_id"()));



CREATE POLICY "delete_testimonials" ON "public"."testimonials" FOR DELETE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."gallery" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "insert_children" ON "public"."children" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "insert_events" ON "public"."events" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "insert_gallery" ON "public"."gallery" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "insert_interests_and_hobbies" ON "public"."interests_and_hobbies" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "insert_martyrs" ON "public"."martyrs" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "insert_testimonials" ON "public"."testimonials" FOR INSERT TO "authenticated" WITH CHECK (true);



ALTER TABLE "public"."interests_and_hobbies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."martyrs" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "read_children" ON "public"."children" FOR SELECT USING (true);



CREATE POLICY "read_events" ON "public"."events" FOR SELECT USING (true);



CREATE POLICY "read_gallery" ON "public"."gallery" FOR SELECT USING (true);



CREATE POLICY "read_interests_and_hobbies" ON "public"."interests_and_hobbies" FOR SELECT USING (true);



CREATE POLICY "read_martyrs" ON "public"."martyrs" FOR SELECT USING (true);



CREATE POLICY "read_testimonials" ON "public"."testimonials" FOR SELECT USING (true);



ALTER TABLE "public"."tasks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."testimonials" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "update_children" ON "public"."children" FOR UPDATE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "update_events" ON "public"."events" FOR UPDATE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "update_gallery" ON "public"."gallery" FOR UPDATE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "update_interests_and_hobbies" ON "public"."interests_and_hobbies" FOR UPDATE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));



CREATE POLICY "update_martyrs" ON "public"."martyrs" FOR UPDATE TO "authenticated" USING (("creator_id" = "public"."requesting_user_id"()));



CREATE POLICY "update_testimonials" ON "public"."testimonials" FOR UPDATE TO "authenticated" USING (("martyr_id" IN ( SELECT "martyrs"."id"
   FROM "public"."martyrs"
  WHERE ("martyrs"."creator_id" = "public"."requesting_user_id"()))));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
































































































































































































GRANT ALL ON FUNCTION "public"."requesting_user_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."requesting_user_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."requesting_user_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";





















GRANT ALL ON TABLE "public"."children" TO "anon";
GRANT ALL ON TABLE "public"."children" TO "authenticated";
GRANT ALL ON TABLE "public"."children" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."gallery" TO "anon";
GRANT ALL ON TABLE "public"."gallery" TO "authenticated";
GRANT ALL ON TABLE "public"."gallery" TO "service_role";



GRANT ALL ON TABLE "public"."interests_and_hobbies" TO "anon";
GRANT ALL ON TABLE "public"."interests_and_hobbies" TO "authenticated";
GRANT ALL ON TABLE "public"."interests_and_hobbies" TO "service_role";



GRANT ALL ON TABLE "public"."martyrs" TO "anon";
GRANT ALL ON TABLE "public"."martyrs" TO "authenticated";
GRANT ALL ON TABLE "public"."martyrs" TO "service_role";



GRANT ALL ON TABLE "public"."tasks" TO "anon";
GRANT ALL ON TABLE "public"."tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."tasks" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tasks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tasks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tasks_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."testimonials" TO "anon";
GRANT ALL ON TABLE "public"."testimonials" TO "authenticated";
GRANT ALL ON TABLE "public"."testimonials" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
