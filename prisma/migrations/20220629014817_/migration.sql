-- AlterTable
ALTER TABLE `Rating` MODIFY `caveat` VARCHAR(191) NULL,
    MODIFY `initialRating` INTEGER NULL,
    MODIFY `rating` INTEGER NULL,
    MODIFY `delta` INTEGER NULL;
