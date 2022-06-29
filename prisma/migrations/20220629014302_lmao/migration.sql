/*
  Warnings:

  - You are about to drop the `CaveatRating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `CaveatRating`;

-- CreateTable
CREATE TABLE `Rating` (
    `id` VARCHAR(191) NOT NULL,
    `caveat` VARCHAR(191) NOT NULL,
    `initialRating` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `delta` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
