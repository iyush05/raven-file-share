/*
  Warnings:

  - You are about to drop the column `fileSize` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileSize",
DROP COLUMN "fileType";
