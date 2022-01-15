-- CreateTable
CREATE TABLE `books_gender` (
    `book_id` VARCHAR(191) NOT NULL,
    `gender_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`book_id`, `gender_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books_gender` ADD CONSTRAINT `books_gender_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books_gender` ADD CONSTRAINT `books_gender_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
