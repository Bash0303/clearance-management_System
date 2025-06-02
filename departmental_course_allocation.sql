-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2025 at 10:31 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `departmental_course_allocation`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `course_title` varchar(100) NOT NULL,
  `course_unit` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_allocations`
--

CREATE TABLE `course_allocations` (
  `id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `title` varchar(10) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `staff_number` varchar(20) NOT NULL,
  `position` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `title`, `full_name`, `phone`, `staff_number`, `position`, `password`, `created_at`) VALUES
(1, 'Dr.', 'AGBOOLA, O.M', '09063836085', 'REG/P/2019', 'Senior Lecturer', '$2y$10$An8kB88nGQygMr3WNMA6GuFBVG.JMEQxl.2AVTAD0i1J.t76H5ySq', '2025-04-28 19:26:43'),
(2, 'Mr.', 'OLAJIDE', '07081291342', 'REG/P/1921', 'Assistant Lecturer', '$2y$10$dWusyobpF2AuiCzPiwOYPeeinyNzGO7uMZ92/mX/3iJ8uIC9tQdl.', '2025-04-28 19:32:47'),
(6, 'Mr.', 'KAMALDEEN', '09011323341', 'REG/P/1920', 'Assistant Lecturer', '$2y$10$1y6M8HHyDU0uFOucb1czfO3H8d7sNwbQyBrF4lWTHi2gn9UWA8Rde', '2025-04-28 19:39:12'),
(7, 'Dr.', 'REG/P/1921', '0709999944', 'REG/P/2025', 'Assistant Lecturer', '$2y$10$NrHTJQW5NbDlkTVyWjrnS.XbpD7KneYcV8S26nGwvHI0vxoVCg4BW', '2025-04-29 08:02:21'),
(8, 'Mr.', 'WAHEED BASIRU', '09023445567', 'REG/P/2012', 'Assistant Lecturer', '$2y$10$ABUyx81ZnAuyL1FGLBUtcuQokEmYZPgHz3XvSUq9R8FhqOAhbpi36', '2025-04-29 09:25:33'),
(9, 'Prof.', 'Admin User', '+1234567890', 'ADMIN001', 'Principal Lecturer', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2025-04-29 10:13:39'),
(10, 'Mr.', 'OLANREWAJU', '08035687414', 'REG/P/2013', 'Assistant Lecturer', '$2y$10$IjjZ14TckgH1ouo/mnLQ9umYaKQdPBu17Wt9e7oS5cXqFr/FfUHYq', '2025-04-29 11:12:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_code` (`course_code`);

--
-- Indexes for table `course_allocations`
--
ALTER TABLE `course_allocations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `staff_number` (`staff_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_allocations`
--
ALTER TABLE `course_allocations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_allocations`
--
ALTER TABLE `course_allocations`
  ADD CONSTRAINT `course_allocations_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  ADD CONSTRAINT `course_allocations_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
