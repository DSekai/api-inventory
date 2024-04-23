/*
  Warnings:

  - You are about to drop the `LOWER(name)` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LOWER(name)" DROP CONSTRAINT "LOWER(name)_category_fkey";

-- DropForeignKey
ALTER TABLE "LOWER(name)" DROP CONSTRAINT "LOWER(name)_inventory_id_fkey";

-- DropTable
DROP TABLE "LOWER(name)";

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "inventory_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date_expire" DATE,
    "category" TEXT NOT NULL,
    "price" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_fkey" FOREIGN KEY ("category") REFERENCES "UserCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
