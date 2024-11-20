<?php

    const CREATE = '-- CreateTable
        CREATE TABLE `users` (
            `id` INTEGER NOT NULL AUTO_INCREMENT,
            `nome` VARCHAR(191) NOT NULL,
            `email` VARCHAR(191) NOT NULL,
            `senha` VARCHAR(191) NOT NULL,

            UNIQUE INDEX `users_email_key`(`email`),
            PRIMARY KEY (`id`)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        -- CreateTable
        CREATE TABLE `dashboards` (
            `id` INTEGER NOT NULL AUTO_INCREMENT,
            `nome` VARCHAR(191) NOT NULL,
            `id_user` INTEGER NOT NULL,

            PRIMARY KEY (`id`)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        -- CreateTable
        CREATE TABLE `graficos` (
            `id` INTEGER NOT NULL AUTO_INCREMENT,
            `tipo` VARCHAR(191) NOT NULL,
            `nome` VARCHAR(191) NOT NULL,
            `ordem` VARCHAR(191) NOT NULL,
            `id_dash` INTEGER NOT NULL,

            PRIMARY KEY (`id`)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        -- CreateTable
        CREATE TABLE `referencias` (
            `id` INTEGER NOT NULL AUTO_INCREMENT,
            `nome` VARCHAR(191) NOT NULL,
            `valor` INTEGER NOT NULL,
            `cor` VARCHAR(191) NOT NULL,
            `graficoId` INTEGER NOT NULL,

            PRIMARY KEY (`id`)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        -- AddForeignKey
        ALTER TABLE `dashboards` ADD CONSTRAINT `dashboards_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

        -- AddForeignKey
        ALTER TABLE `graficos` ADD CONSTRAINT `graficos_id_dash_fkey` FOREIGN KEY (`id_dash`) REFERENCES `dashboards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

        -- AddForeignKey
        ALTER TABLE `referencias` ADD CONSTRAINT `referencias_graficoId_fkey` FOREIGN KEY (`graficoId`) REFERENCES `graficos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;';

    const REGISTER = "INSERT INTO users (nome, email, senha) VALUES ";
    const SEARCH = "SELECT * FROM users WHERE email = ";

?>