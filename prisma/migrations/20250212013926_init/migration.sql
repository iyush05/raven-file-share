/*
  Warnings:

  - Changed the type of `fileSize` on the `File` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileSize",
ADD COLUMN     "fileSize" INTEGER NOT NULL;
