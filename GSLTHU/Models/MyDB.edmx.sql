










































-- -----------------------------------------------------------
-- Entity Designer DDL Script for MySQL Server 4.1 and higher
-- -----------------------------------------------------------
-- Date Created: 01/24/2020 12:18:40

-- Generated from EDMX file: C:\Users\weich\Desktop\Projects\GSLTHU\GSLTHU\Models\MyDB.edmx
-- Target version: 3.0.0.0

-- --------------------------------------------------



-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- NOTE: if the constraint does not exist, an ignorable error will be reported.
-- --------------------------------------------------



-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------
SET foreign_key_checks = 0;

    DROP TABLE IF EXISTS `PasteNotes`;

    DROP TABLE IF EXISTS `ChatMessages`;

SET foreign_key_checks = 1;

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------


CREATE TABLE `PasteNotes`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Text` longtext NOT NULL);

ALTER TABLE `PasteNotes` ADD PRIMARY KEY (`Id`);





CREATE TABLE `ChatMessages`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Text` longtext NOT NULL, 
	`UserName` longtext NOT NULL, 
	`RoomId` longtext NOT NULL);

ALTER TABLE `ChatMessages` ADD PRIMARY KEY (`Id`);







-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------
