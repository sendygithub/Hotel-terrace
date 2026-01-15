/*
  Warnings:

  - You are about to drop the column `namee` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Contact" DROP COLUMN "namee",
ADD COLUMN     "name" TEXT NOT NULL;
