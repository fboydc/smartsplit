CREATE DATABASE cust_data
WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE = template0;


\connect cust_data;

CREATE TABLE IF NOT EXISTS "Users" (
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*
CREATE TABLE IF NOT EXISTS "Sessions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "session_token" varchar(255) NOT NULL,
  "plaid_access_token" varchar(255) NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id")  
)*/

INSERT INTO "Users" ("username", "email", "password_hash") VALUES ('admin', 'admin@smartsplit.com', '$2a$10$nLavVuPde6DTLfHwkoxKkOOYfUt/QZrIg2Uq0W5HcyetavCl7ND12');

