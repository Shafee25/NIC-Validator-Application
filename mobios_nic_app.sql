-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 20, 2025 at 05:26 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobios_nic_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `nic_data`
--

DROP TABLE IF EXISTS `nic_data`;
CREATE TABLE IF NOT EXISTS `nic_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nic_number` varchar(12) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int NOT NULL,
  `source_file` varchar(254) NOT NULL,
  `upload_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nic_data`
--

INSERT INTO `nic_data` (`id`, `nic_number`, `birth_date`, `gender`, `age`, `source_file`, `upload_timestamp`) VALUES
(44, '200267000000', '2002-06-18', 'Female', 23, 'list4.csv', '2025-09-18 17:07:28'),
(43, '792233848V', '1979-08-10', 'Male', 46, 'list3.csv', '2025-09-18 17:07:28'),
(42, '200036001558', '2000-12-25', 'Male', 24, 'list2.csv', '2025-09-18 17:07:28'),
(41, '823600313v', '1982-12-25', 'Male', 42, 'list1.csv', '2025-09-18 17:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `token` (`token`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'shafee', 'shafeeahamed494@gmail.com', '$2y$10$MyrSxLSp/1m2NldWvdgnGeKfL5zxWWPUOfuyp3YWikY6EDOZPIfJG', '2025-09-18 08:32:50'),
(2, 'umar', NULL, '$2y$10$lnsERm92vrOBxGgFWImQN.rETkVFGXbKASAPQb6ZV/1ck04bq3tZ6', '2025-09-18 09:00:05'),
(3, 'aathif', NULL, '$2y$10$fIxZksgedjxMizxyfs0zEuwGzkuwSqf3HhKgZBeWK2mBmRqHiKk3q', '2025-09-18 11:53:18');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
