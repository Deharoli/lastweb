/*
  Warnings:

  - A unique constraint covering the columns `[officialID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN "mediaMimeType" TEXT;
ALTER TABLE "Post" ADD COLUMN "mediaType" TEXT;
ALTER TABLE "Post" ADD COLUMN "mediaUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "officialID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_officialID_key" ON "User"("officialID");
