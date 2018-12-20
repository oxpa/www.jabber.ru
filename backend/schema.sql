-- На канале @pgsql в телеграмме гуру postgresql сказали, что можно спокойно использовать text
-- для текстовых данных, а всякие varchar и char по факту являются text плюс различные ограничения.
-- === default db ===
-- articles
create table "articles" (
  "uuid"      uuid primary key,
  "author"    text,
  "title"     text,
  "body"      text,
  "posted"    timestamp with time zone not null,
  "modified"  timestamp with time zone not null,
  "published" boolean,
  "tags"      text,
  "alias"     text
);

create index "published_idx" on "articles"("published");

-- disposable emails
create table "disposableemails" (
  "domain" text primary key,
  "state"  text,
  "json"   text
);

-- feedbacks
create table "feedbacks" (
  "id"      serial primary key,
  "email"   text,
  "message" text,
  "ip"      inet
);

-- auth tokens
create table "auth_tokens" (
  "jid"     text primary key,
  "uuid"    uuid,
  "expires" timestamp with time zone
);

create index "uuid_idx" on "auth_tokens"("uuid");

-- users
create table "users" (
  "username" text primary key,
  "server"   text,
  "email"    text,
  "ip"       inet
);

create index "email_idx" on "users"("email");
create index "user_server_id" on "users"("username", "server");


-- === mam db ===
-- mam preferences
create table "archive_prefs" (
  "username"   text primary key,
  "def"        text,
  "always"     text,
  "never"      text,
  "created_at" timestamp with time zone
);

-- mam archive
create table "archive" (
  "id"        uuid primary key,
  "timestamp" timestamp with time zone,
  "username"  text,
  "bare_peer" text,
  "kind"      text,
  "nick"      text,
  "txt"       text,
  "xml"       text
);

create index "user_peer" on "archive"("username", "bare_peer");
