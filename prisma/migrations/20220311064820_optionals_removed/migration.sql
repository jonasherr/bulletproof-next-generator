/*
  Warnings:

  - Made the column `body` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discussion_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `discussions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body` on table `discussions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `discussions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "body" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "discussion_id" SET NOT NULL,
ALTER COLUMN "author_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "discussions" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "body" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
