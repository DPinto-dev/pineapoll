-- Link to schema: https://app.quickdatabasediagrams.com/#/d/LFZcHk

-- CREATE DATABASE
CREATE DATABASE ballet_box
\c ballet_box

-- Drop the tables if re-run is necessary
DROP TABLE IF EXISTS polls CASCADE;
DROP TABLE IF EXISTS creators CASCADE;
DROP TABLE IF EXISTS poll_options CASCADE;
DROP TABLE IF EXISTS poll_results CASCADE;

-- CREATE TABLES
CREATE TABLE "polls" (
    "id" SERIAL   NOT NULL,
    "name" VARCHAR(255)   NOT NULL,
    "description" VARCHAR(255)   NOT NULL,
    "code" VARCHAR(255)   NOT NULL,
    "creation_date" DATE::now()   NOT NULL,
    "is_active" BOOLEAN   NOT NULL,
    "creator_id" INT   NOT NULL,
    CONSTRAINT "pk_polls" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "creators" (
    "id" SERIAL   NOT NULL,
    "creator_email" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_creators" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "poll_options" (
    "id" SERIAL   NOT NULL,
    "poll_id" INT   NOT NULL,
    "name" VARCHAR(255)   NOT NULL,
    "serial_order" INT   NOT NULL,
    CONSTRAINT "pk_poll_options" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "poll_results" (
    "id" SERIAL   NOT NULL,
    "poll_id" INT   NOT NULL,
    "poll_option_id" INT   NOT NULL,
    "user_id" INT   NOT NULL,
    "rank" INT   NOT NULL,
    CONSTRAINT "pk_poll_results" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "polls" ADD CONSTRAINT "fk_polls_creator_id" FOREIGN KEY("creator_id")
REFERENCES "creators" ("id");

ALTER TABLE "poll_options" ADD CONSTRAINT "fk_poll_options_poll_id" FOREIGN KEY("poll_id")
REFERENCES "polls" ("id");

ALTER TABLE "poll_results" ADD CONSTRAINT "fk_poll_results_poll_id" FOREIGN KEY("poll_id")
REFERENCES "polls" ("id");

ALTER TABLE "poll_results" ADD CONSTRAINT "fk_poll_results_poll_option_id" FOREIGN KEY("poll_option_id")
REFERENCES "poll_options" ("id");