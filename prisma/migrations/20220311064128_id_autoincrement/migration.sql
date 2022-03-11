-- CreateTable
CREATE TABLE "comments" (
    "id" INTEGER NOT NULL,
    "body" TEXT,
    "created_at" DATE,
    "discussion_id" INTEGER,
    "author_id" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussions" (
    "id" INTEGER NOT NULL,
    "title" VARCHAR,
    "body" TEXT,
    "teamid" VARCHAR,
    "created_at" DATE,

    CONSTRAINT "discussions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "bio" VARCHAR,
    "role" VARCHAR,
    "password" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "discussions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
