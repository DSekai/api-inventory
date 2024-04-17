/*
  Warnings:

  - Added the required column `name` to the `UserCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCategory" ADD COLUMN     "name" TEXT NOT NULL;
