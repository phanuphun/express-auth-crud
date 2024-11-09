/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Books_title_key" ON "Books"("title");
