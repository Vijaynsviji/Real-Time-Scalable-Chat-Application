/*
  Warnings:

  - Added the required column `sender_cipher_key` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "sender_cipher_key" TEXT NOT NULL;
