/*
  Warnings:

  - You are about to drop the column `author_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `discussion_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `discussions` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discussionId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `discussions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_discussion_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "author_id",
DROP COLUMN "created_at",
DROP COLUMN "discussion_id",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "createdAt" DATE NOT NULL,
ADD COLUMN     "discussionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "discussions" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" DATE NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
