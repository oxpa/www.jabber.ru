-- articles
create table "articles" (
  "uuid"      uuid primary key,
  "author"    text,
  "title"     text,
  "body"      text,
  "posted"    timestampz,
  "modified"  timestampz,
  "published" timestampz,
  "tags"      text[],
  "alias"     text,
);

create index "published_idx" on "articles"("published");

-- disposable emails
create table "disposableemails" (
  "domain" text primary text,
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

-- mam
create table "archive_prefx" (
  "username"   text primary key,
  "def"        text,
  "always"     text,
  "never"      text,
  "created_at" timestampz
);

-- auth tokens
create table "auth_tokens" (
  "jid"     text primary key,
  "uuid"    uuid,
  "expires" timestampz,
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


