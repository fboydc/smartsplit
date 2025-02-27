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
  "plaid_access_token" varchar(255) NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Allocations" (
  "allocation_type" SERIAL PRIMARY KEY,
  "allocation_description" varchar(255) NOT NULL,
  "allocation_factor" decimal NOT NULL
);

CREATE TABLE IF NOT EXISTS "Category" (
  "category_id" SERIAL PRIMARY KEY,
  "plaid_category_id" varchar(255) NOT NULL UNIQUE,
  "category_name" varchar(255) NOT NULL,
  "category_description" varchar(255) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Expenses" (
  "expense_id" SERIAL PRIMARY KEY,
  "expense_description" varchar(255) NOT NULL,
  "expense_amount" decimal NOT NULL,
  "expense_category" integer NOT NULL REFERENCES "Category"("category_id"),
  "user_id" integer NOT NULL REFERENCES "Users"("user_id"),
  "allocation_type" integer NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);




INSERT INTO "Users" ("username", "email", "password_hash") VALUES ('admin', 'admin@smartsplit.com', '$2a$10$nLavVuPde6DTLfHwkoxKkOOYfUt/QZrIg2Uq0W5HcyetavCl7ND12');

INSERT INTO "Allocations" ("allocation_description", "allocation_factor") VALUES ('Needs', 0.5);
INSERT INTO "Allocations" ("allocation_description", "allocation_factor") VALUES ('Debts and Repayment', 0.2);
INSERT INTO "Allocations" ("allocation_description", "allocation_factor") VALUES ('Wants', 0.3);

INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('16002000','Rent','Payment, Rent');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('18068005','Utilities','Electric, Utilities');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('19047000','Groceries','Groceries, Food');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('13005000','Restaurants','Restaurants, Dining');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('18042000','Gas','Oil and gas');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('18068000', 'Utilities', 'Utilities, Services');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('16003000', 'Loan Payment', 'Loan Repayment');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('16001000', 'Credit Card', 'Credit Card Payment');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('18031000', 'Internet Service', 'Internet, Services');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('18060000', 'Storage Service', 'Storage, Services');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('17018000', 'Gym', 'Gyms and Fitness Centers, Recreation');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('17001004', 'Social Clubs', 'Social Clubs, Arts and Entertainment');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('18061000', 'Subscription Service', 'Subscription, Services');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('18030000', 'Insurance', 'Insurance, Services');
INSERT INTO "Category" ("plaid_category_id","category_name","category_description") VALUES ('19006000', 'Pharmacy', 'Pharmacy, Health');


INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Rent', 1500, 1, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('FPL', 100, 2, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Groceries', 500, 3, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Dining out', 400, 4, 1, 3);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Vehicle gas', 120, 5, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Internet', 80, 9, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Phone Bill', 150, 6, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Storage', 100, 7, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Gym', 50, 11, 1, 3);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('TV subscriptions', 30, 13, 1, 3);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Car insurance', 120, 14, 1, 1);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Credit card payment', 50, 7, 1, 2);
INSERT INTO "Expenses" ("expense_description", "expense_amount", "expense_category", "user_id", "allocation_type") VALUES ('Student loan payment', 350, 7, 1, 2);












