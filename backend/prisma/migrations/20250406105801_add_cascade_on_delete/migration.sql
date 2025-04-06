-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_teacherId_fkey`;

-- DropIndex
DROP INDEX `Subject_teacherId_fkey` ON `subject`;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
