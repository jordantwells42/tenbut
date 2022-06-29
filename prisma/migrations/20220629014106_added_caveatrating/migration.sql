/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Example`;

-- DropTable
DROP TABLE `Rating`;

-- CreateTable
CREATE TABLE `CaveatRating` (
    `id` VARCHAR(191) NOT NULL,
    `caveat` VARCHAR(191) NOT NULL,
    `initialRating` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `delta` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
