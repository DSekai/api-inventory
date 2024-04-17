/*
  Warnings:

  - You are about to drop the column `user_id` on the `Category` table. All the data in the column will be lost.
  - Added the required column `userCategory_id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_user_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "user_id",
ADD COLUMN     "userCategory_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserCategory" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userCategory_id_fkey" FOREIGN KEY ("userCategory_id") REFERENCES "UserCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
