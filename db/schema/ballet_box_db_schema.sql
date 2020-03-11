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
CREATE TABLE "creators" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "creator_email" VARCHAR(255) NOT NULL
);

CREATE TABLE "polls" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(255)   NOT NULL,
    "description" VARCHAR(255),
    "code" VARCHAR(36)   NOT NULL,
    "creation_date" TIMESTAMP NOT NULL DEFAULT Now(),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "creator_id" INT REFERENCES creators(id) ON DELETE CASCADE
);

CREATE TABLE "poll_options" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "poll_id" INT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    "name" VARCHAR(255)   NOT NULL,
    "serial_order" INT   NOT NULL
);

CREATE TABLE "poll_results" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "poll_id" INT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    "poll_option_id" INT NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
    "user_id" VARCHAR(36)   NOT NULL,
    "rank" INT   NOT NULL
);

