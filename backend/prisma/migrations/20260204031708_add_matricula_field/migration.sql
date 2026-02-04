/*
  Warnings:

  - Added the required column `matricula` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `matricula` INTEGER NOT NULL;
