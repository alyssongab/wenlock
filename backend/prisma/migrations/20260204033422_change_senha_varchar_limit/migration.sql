/*
  Warnings:

  - You are about to alter the column `senha` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `senha` VARCHAR(32) NOT NULL;
