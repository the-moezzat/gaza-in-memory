drop policy "delete_testimonials" on "public"."testimonials";

drop policy "insert_testimonials" on "public"."testimonials";

drop policy "read_testimonials" on "public"."testimonials";

drop policy "update_testimonials" on "public"."testimonials";

revoke delete on table "public"."testimonials" from "anon";

revoke insert on table "public"."testimonials" from "anon";

revoke references on table "public"."testimonials" from "anon";

revoke select on table "public"."testimonials" from "anon";

revoke trigger on table "public"."testimonials" from "anon";

revoke truncate on table "public"."testimonials" from "anon";

revoke update on table "public"."testimonials" from "anon";

revoke delete on table "public"."testimonials" from "authenticated";

revoke insert on table "public"."testimonials" from "authenticated";

revoke references on table "public"."testimonials" from "authenticated";

revoke select on table "public"."testimonials" from "authenticated";

revoke trigger on table "public"."testimonials" from "authenticated";

revoke truncate on table "public"."testimonials" from "authenticated";

revoke update on table "public"."testimonials" from "authenticated";

revoke delete on table "public"."testimonials" from "service_role";

revoke insert on table "public"."testimonials" from "service_role";

revoke references on table "public"."testimonials" from "service_role";

revoke select on table "public"."testimonials" from "service_role";

revoke trigger on table "public"."testimonials" from "service_role";

revoke truncate on table "public"."testimonials" from "service_role";

revoke update on table "public"."testimonials" from "service_role";

alter table "public"."testimonials" drop constraint "testimonials_martyr_id_fkey";

alter table "public"."testimonials" drop constraint "testimonials_pkey";

drop index if exists "public"."idx_testimonials_created_at";

drop index if exists "public"."idx_testimonials_martyr_id";

drop index if exists "public"."testimonials_pkey";

drop table "public"."testimonials";

create table "public"."memories" (
    "id" uuid not null default uuid_generate_v4(),
    "martyr_id" uuid,
    "author_id" text default requesting_user_id(),
    "created_at" timestamp with time zone default now(),
    "content" text[] not null default '{}'::text[],
    "relationship" text
);


alter table "public"."memories" enable row level security;

CREATE INDEX idx_memories_author_id ON public.memories USING btree (author_id);

CREATE INDEX idx_memories_created_at ON public.memories USING btree (created_at);

CREATE INDEX idx_memories_martyr_id ON public.memories USING btree (martyr_id);

CREATE UNIQUE INDEX testimonials_pkey ON public.memories USING btree (id);

alter table "public"."memories" add constraint "testimonials_pkey" PRIMARY KEY using index "testimonials_pkey";

alter table "public"."memories" add constraint "testimonials_martyr_id_fkey" FOREIGN KEY (martyr_id) REFERENCES martyrs(id) ON DELETE CASCADE not valid;

alter table "public"."memories" validate constraint "testimonials_martyr_id_fkey";

grant delete on table "public"."memories" to "anon";

grant insert on table "public"."memories" to "anon";

grant references on table "public"."memories" to "anon";

grant select on table "public"."memories" to "anon";

grant trigger on table "public"."memories" to "anon";

grant truncate on table "public"."memories" to "anon";

grant update on table "public"."memories" to "anon";

grant delete on table "public"."memories" to "authenticated";

grant insert on table "public"."memories" to "authenticated";

grant references on table "public"."memories" to "authenticated";

grant select on table "public"."memories" to "authenticated";

grant trigger on table "public"."memories" to "authenticated";

grant truncate on table "public"."memories" to "authenticated";

grant update on table "public"."memories" to "authenticated";

grant delete on table "public"."memories" to "service_role";

grant insert on table "public"."memories" to "service_role";

grant references on table "public"."memories" to "service_role";

grant select on table "public"."memories" to "service_role";

grant trigger on table "public"."memories" to "service_role";

grant truncate on table "public"."memories" to "service_role";

grant update on table "public"."memories" to "service_role";

create policy "delete_testimonials"
on "public"."memories"
as permissive
for delete
to authenticated
using ((martyr_id IN ( SELECT martyrs.id
   FROM martyrs
  WHERE (martyrs.creator_id = requesting_user_id()))));


create policy "insert_testimonials"
on "public"."memories"
as permissive
for insert
to authenticated
with check (true);


create policy "read_testimonials"
on "public"."memories"
as permissive
for select
to public
using (true);


create policy "update_testimonials"
on "public"."memories"
as permissive
for update
to authenticated
using ((martyr_id IN ( SELECT martyrs.id
   FROM martyrs
  WHERE (martyrs.creator_id = requesting_user_id()))));



