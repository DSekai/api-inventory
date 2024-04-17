/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UserCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCategory_name_key" ON "UserCategory"("name");
