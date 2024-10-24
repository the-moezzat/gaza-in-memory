SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: martyrs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."martyrs" ("id", "creator_id", "first_name", "last_name", "middle_name", "gender", "date_of_birth", "city", "story_type", "story", "guided_story", "profile_image_url", "status", "date_of_death", "cause_of_death", "married", "spouse_first_name", "spouse_last_name", "social_media", "created_at", "updated_at") VALUES
	('8ae1d72a-9bae-4744-b953-7e456f934bdb', 'user_2m2KUBYaDo4cKHpP8GrM6UPopGX', 'Mohamed', 'Khalil', 'Ezzat', 'male', '2002-03-24', 'Rafah', 'free', '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 3, "textAlign": "center"}, "content": [{"text": "Mohamed ", "type": "text"}]}, {"type": "paragraph", "attrs": {"textAlign": "left"}, "content": [{"text": "was the ", "type": "text"}, {"text": "extraordinary", "type": "text", "marks": [{"type": "underline"}]}, {"text": " ", "type": "text"}, {"text": "hero", "type": "text", "marks": [{"type": "italic"}]}, {"text": " and the most ", "type": "text"}, {"text": "liked", "type": "text", "marks": [{"type": "strike"}]}, {"text": " and ", "type": "text"}, {"text": "smart leader ", "type": "text", "marks": [{"type": "bold"}]}]}, {"type": "paragraph", "attrs": {"textAlign": "right"}, "content": [{"text": "انه بطل رائع بكل ماتحمله الكلمه من معنى ", "type": "text"}]}]}', '{"dream": "", "legacy": "", "hobbies": "", "passion": "", "anecdote": "", "one_thing": "", "additional": "", "inspiration": "", "typical_day": "", "contribution": ""}', 'https://utfs.io/f/3LZIod2iVGbKicuyueKUjA7uhdofNcGF5mvsYDnIXWzVwakb', 'dead', '2023-10-31', 'bullet', true, 'Yara', 'Ali', '{"twitter": "https://www.x.com", "facebook": "https://www.facebook.com", "linkedin": "https://www.linkedin.com", "instagram": "https://www.instagram.com"}', '2024-10-19 14:50:53.764286+00', '2024-10-19 14:51:01.355432+00');


--
-- Data for Name: children; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."children" ("id", "martyr_id", "name", "age", "gender", "status", "date_of_death") VALUES
	('f1e227c5-aa77-46af-9a8d-2140cea84ae8', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Tara', 2, 'female', 'alive', NULL),
	('8f85cf2a-13ee-4f52-aab4-56be610581a7', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Taha', 4, 'male', 'dead', '2024-07-21');


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."events" ("id", "martyr_id", "title", "description", "event_date") VALUES
	('902b47f0-1509-4b93-b63d-f2dd90084bf0', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'born', 'the day when Sun smiled', '2002-03-24'),
	('66d5c66f-ef26-426b-b7dc-41b57c29ad5e', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'graduation ', 'the day when Sun smiled', '2022-03-14'),
	('41abd915-d89c-4f51-8d33-60c0e41f543f', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Marriage', '', '2023-03-12');


--
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."gallery" ("id", "martyr_id", "image_url", "created_at") VALUES
	('097543df-d931-453e-90eb-eb6bb56925ab', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'https://utfs.io/f/3LZIod2iVGbKFYucFX1QqeZlHAMfd3IxJXvWCruzSgb5RNjL', '2024-10-19 14:50:59.232262+00'),
	('f8ea5252-6e1a-4f9a-b0d5-98c2ecf3e58a', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'https://utfs.io/f/3LZIod2iVGbKWtR733oh0FtUJ7fHnyI4N86KmCXiudAwSYWv', '2024-10-19 14:50:59.896279+00'),
	('b1a6d153-7636-4496-90e2-31340e83eba3', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'https://utfs.io/f/3LZIod2iVGbKiNldkhKUjA7uhdofNcGF5mvsYDnIXWzVwakb', '2024-10-19 14:51:00.248897+00'),
	('f64da850-fc92-46fc-aeea-04adbd7a5afa', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'https://utfs.io/f/3LZIod2iVGbKMGvibj0ZbtO943Sn65lBFMEcJiafQd2pHuDN', '2024-10-19 14:51:00.592258+00'),
	('55abb5f6-6a74-498b-9b00-ee5c4818a249', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'https://utfs.io/f/3LZIod2iVGbK4mBogFWDQTr1iZzHXeEK6jUpyc8NLORuGxgS', '2024-10-19 14:51:01.825375+00');


--
-- Data for Name: interests_and_hobbies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."interests_and_hobbies" ("id", "martyr_id", "category", "tags") VALUES
	('bd548079-f7e1-42be-a316-747109b8a032', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Sports', '{"Table Tennis","Football (Soccer)",Basketball,Parkour,Handball}'),
	('b8a5a6c2-af9a-4923-9bd1-0807ae2beece', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Science and Technology', '{"Web Development",Biology,"Mobile App Development","Computer Programming",Chemistry,Astronomy}'),
	('8b30bcbc-39dd-4860-b3fd-0b11aaa6d061', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Games and Recreation', '{"Crossword Puzzles",Dominos,"Card Games",Chess,"Rubik''s Cube"}'),
	('20fbc620-5922-45c2-beb1-80b9273a3420', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Outdoor Activities', '{Foraging,"Rock Collecting"}'),
	('0e0b51a3-8315-4c08-b6de-b2ce2bb2197c', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Social and Community', '{"Environmental Activism","Interfaith Dialogue","Refugee Support","Human Rights Advocacy"}'),
	('97681a9b-f5f1-4675-9818-e0deda1b85b2', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Literature and Language', '{"Historical Fiction",Storytelling}'),
	('8e73eb73-24c1-400e-862d-bc1d61ed9848', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'Culinary Arts', '{"Bread Making","Ramadan Special Dishes","Pastry Making","Halal Cooking","Herb Gardening",Grilling,"Traditional Sweets","Spice Blending"}');


--
-- Data for Name: memories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."memories" ("id", "martyr_id", "author_id", "created_at", "content", "relationship") VALUES
	('8b40adf0-5186-4de3-b9f1-bae99780f76c', '8ae1d72a-9bae-4744-b953-7e456f934bdb', 'user_2m2KUBYaDo4cKHpP8GrM6UPopGX', '2024-10-22 02:29:11.073495+00', '{"the first fight when you take my seat at the first row "}', 'Classmate');


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tasks_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
