/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userCategory_id_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_category_fkey";

-- DropTable
DROP TABLE "Category";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_fkey" FOREIGN KEY ("category") REFERENCES "UserCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
