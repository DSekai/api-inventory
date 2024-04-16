/*
  Warnings:

  - Added the required column `emailToken` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "emailToken" TEXT NOT NULL,
ADD COLUMN     "emailVerify" BOOLEAN NOT NULL DEFAULT false;
