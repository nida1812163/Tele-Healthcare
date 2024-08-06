-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 10:05 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telehealth`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `administrator_signin` int(11) NOT NULL,
  `name` text NOT NULL,
  `contact` varchar(11) NOT NULL,
  `signin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`administrator_signin`, `name`, `contact`, `signin_id`) VALUES
(2, 'Katnis Everdeen', '03327538886', 7),
(4, 'Filza Akhtar', '03362243885', 6),
(5, 'Ahmed Ali', '03772249985', NULL),
(11, 'laiba abid', '03362243885', NULL),
(12, 'Nida', '03362243885', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `appointment_approval` varchar(255) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `appointment_date`, `appointment_time`, `appointment_approval`, `patient_id`, `doctor_id`) VALUES
(1, '2022-05-14', '21:30:11', 'approved', 1, 1),
(2, '2022-07-31', '13:20:07', 'approved', 7, 1),
(4, '2022-05-15', '20:12:39', 'approved', 7, 1),
(5, '2022-03-27', '15:14:50', '', 7, 1),
(9, '2022-02-20', '04:21:26', '', 1, 1),
(22, '2022-07-31', '14:26:26', 'Cancelled', 7, 1),
(27, '2022-07-31', '14:34:58', 'rejected', 1, 1),
(28, '2022-07-31', '19:11:41', 'approved', 3, 1),
(29, '2022-08-24', '13:30:00', '', 7, 9);

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `designation` text NOT NULL,
  `gender` varchar(1) NOT NULL,
  `address` varchar(255) NOT NULL,
  `highest_qualification` varchar(30) NOT NULL,
  `signin_id` int(11) DEFAULT NULL,
  `video_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `name`, `designation`, `gender`, `address`, `highest_qualification`, `signin_id`, `video_id`) VALUES
(1, 'Ali Abdal', 'Neurologist', 'M', '123 Street', 'BS Neuro Science', 1, 'abc'),
(9, 'Sadia Akhtar', 'Neurologist', 'F', 'PECHS, block 4, Shaheed-e-millat road', 'BS Science', 9, 'def'),
(11, 'ddddww', 'wwww', 'M', 'dddd', 'phd', NULL, ''),
(12, 'Laiba Abid', 'Pschiatrist', 'F', 'Plot No.9, Block 3, PECHS, Modern Cooperative Housing Society, Shaheed-e-millat road', 'BSSS', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_registration`
--

CREATE TABLE `doctor_registration` (
  `R_id` int(11) NOT NULL,
  `R_name` varchar(255) DEFAULT NULL,
  `R_designation` varchar(255) DEFAULT NULL,
  `R_gender` varchar(255) DEFAULT NULL,
  `R_address` varchar(255) DEFAULT NULL,
  `R_highestqualification` varchar(255) DEFAULT NULL,
  `R_email` varchar(255) NOT NULL,
  `R_contact` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_registration`
--

INSERT INTO `doctor_registration` (`R_id`, `R_name`, `R_designation`, `R_gender`, `R_address`, `R_highestqualification`, `R_email`, `R_contact`) VALUES
(1, 'Ahmed', 'Psychiatrist', 'M', '123 street', 'BSSC', '', 0),
(2, 'Nida', 'Neurologist', 'F', '765 road', 'BSNS', '', 0),
(3, 'Nida', 'Neurologist', 'F', '765 road', 'BSNS', '', 0),
(4, 'Bazla', 'Psychologist', 'F', '847 road', 'BSSC', '', 0),
(5, 'Bazla', 'Psychologist', 'F', '987 road', 'BSSC', 'bazla@gmail.com', 98742987),
(6, 'Darwin', '1', 'M', '765 road', 'MS', 'abc@gmail.com', 2147483647),
(7, 'Dell', 'Psychiatrist', 'F', '987 street', 'PhD', 'hjgyu@hotmail.com', 2147483647),
(8, 'Laiba Abid', 'Psychologist', 'F', 'Shaheed-e-millat road', 'BSSS', 'laibaabid25@gmail.com', 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `finance`
--

CREATE TABLE `finance` (
  `finance_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `finance_contact_No` varchar(255) NOT NULL,
  `finance_address` varchar(255) NOT NULL,
  `signin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `finance`
--

INSERT INTO `finance` (`finance_id`, `name`, `finance_contact_No`, `finance_address`, `signin_id`) VALUES
(2, 'Saad Akhtar', '03363343887', 'PECHS block 2', 15),
(3, 'Hameed Ahmed', '03362943887', 'DHA Phase 2', 4),
(4, 'Saad Yosuf', '02233244887', ' block 2', 5),
(5, 'Akhtar Khan', '08332243887', 'Shaheed-e-millat road', 6);

-- --------------------------------------------------------

--
-- Table structure for table `medicine_reminder`
--

CREATE TABLE `medicine_reminder` (
  `medicine_reminder_id` int(11) NOT NULL,
  `medicine_description` varchar(255) NOT NULL,
  `medicine_date` date NOT NULL,
  `medicine_timings` time NOT NULL,
  `medicine_response` varchar(255) NOT NULL,
  `medicine_response_time` time NOT NULL,
  `signin_id` int(11) NOT NULL,
  `reportID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine_reminder`
--

INSERT INTO `medicine_reminder` (`medicine_reminder_id`, `medicine_description`, `medicine_date`, `medicine_timings`, `medicine_response`, `medicine_response_time`, `signin_id`, `reportID`) VALUES
(6, '2 Tablet of Panadol', '2022-07-31', '13:22:00', 'No', '13:23:20', 11, 23),
(7, '2 Tablet of Brufen', '2022-08-01', '16:12:00', '', '00:00:00', 11, 23),
(8, '', '0000-00-00', '00:00:00', '', '00:00:00', 11, 0),
(9, '2 tablet of brufen', '2022-08-01', '16:41:00', '', '00:00:00', 11, 24);

-- --------------------------------------------------------

--
-- Table structure for table `moderator`
--

CREATE TABLE `moderator` (
  `moderator_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `moderator_contact_No` varchar(255) NOT NULL,
  `moderator_address` varchar(255) NOT NULL,
  `signin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `moderator`
--

INSERT INTO `moderator` (`moderator_id`, `name`, `moderator_contact_No`, `moderator_address`, `signin_id`) VALUES
(1, 'Taha', '03362243885', 'njkl', 14),
(2, 'Ahmed Akhtar', '03362243887', 'PECHS block 2', 3),
(3, 'Akhtar Hameed', '06662943887', 'DHA Phase 2', 4),
(4, 'Saad Arif', '02263244887', ' block 2', 5),
(5, 'Sana Yousuf', '08862243887', 'Shaheed-e-millat road', 6);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `patient_gender` varchar(1) DEFAULT NULL,
  `patient_age` int(11) DEFAULT NULL,
  `patient_address` varchar(255) DEFAULT NULL,
  `signin_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `patient_name`, `patient_gender`, `patient_age`, `patient_address`, `signin_id`, `doctor_id`) VALUES
(1, 'Tom Hanks', 'M', 45, '4th street, phase 6, Karachi', 3, 1),
(3, 'Thomas Shelby', 'M', 40, '6th street, phase 8, Karachi', 6, 1),
(4, 'Ahmed Arif', 'M', 33, '7th street, phase 9, DHA', 8, 1),
(5, 'Laiba Abid', 'F', 44, '8th street, phase 6, DHA', 9, 1),
(6, 'Farah Fawad', 'F', 45, '1st street, phase 1, DHA', 10, 1),
(7, 'Usman Ali', 'M', 31, '4th Street, phase 2, DHA', 11, 1),
(22, 'Laiba Abid', 'F', 24, 'Plot No.9, Block 3, PECHS, Modern Cooperative Housing Society, Shaheed-e-millat road', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `payment_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `appointment_id`, `payment_status`) VALUES
(1, 1, 'Complete'),
(2, 2, 'Complete'),
(4, 9, 'Complete'),
(17, 27, 'Complete'),
(18, 22, 'Complete');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `reportID` int(11) NOT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `medicalHistory` varchar(255) DEFAULT NULL,
  `medicalHistoryDescription` varchar(255) DEFAULT NULL,
  `labTests` varchar(255) DEFAULT NULL,
  `labTestsDescription` varchar(255) DEFAULT NULL,
  `labTestsDone` varchar(255) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `uploaded_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`reportID`, `diagnosis`, `email`, `contact`, `weight`, `medicalHistory`, `medicalHistoryDescription`, `labTests`, `labTestsDescription`, `labTestsDone`, `patient_id`, `uploaded_id`) VALUES
(2, 'Depression', 'shfs@gmail.com', 983475489, 32, 'Depression', 'None', 'sugar', 'on fast', NULL, 7, NULL),
(3, 'depression', 'abc@gmail.com', 983475489, 32, NULL, NULL, 'sugar', 'on fast', NULL, 1, NULL),
(16, NULL, NULL, NULL, NULL, 'alive', 'panadol', 'everyday', 'sugar', NULL, 1, NULL),
(17, NULL, NULL, NULL, NULL, 'depression', 'jdfnsn', 'ghygiyg', 'yguygyu', NULL, 1, NULL),
(18, NULL, NULL, 2147483647, 71, 'kbkhbkhbkk', 'kbkhbkhbkb', 'kbkhbhgut', 'kbyvtuctcutvu', NULL, 1, NULL),
(19, NULL, NULL, 2147483647, 34, 'depression', 'anti depressant', 'everyday', 'suagr', NULL, 1, NULL),
(20, '04993744639', NULL, 54, 0, 'anti depressants', 'everyday', 'sugar', 'on fast', NULL, 1, NULL),
(21, 'depression', NULL, 2147483647, 43, 'heart', 'stent', 'sugar', 'fast', NULL, 1, NULL),
(22, 'Depression', NULL, 2147483647, 42, 'Underweight', 'Depression', 'Sugar', 'On Fast', NULL, 7, 2),
(24, 'Underweight and Depression', NULL, 2147483647, 42, 'Depression', 'Depression', 'Sugar', 'On Fast', NULL, 7, 4);

-- --------------------------------------------------------

--
-- Table structure for table `signin`
--

CREATE TABLE `signin` (
  `signin_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `User` varchar(255) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `signin`
--

INSERT INTO `signin` (`signin_id`, `email`, `password`, `User`, `patient_id`) VALUES
(1, 'ali.abdal@gmail.com', 'aliabdal123', 'doctor', 0),
(2, 'frank.thomas@gmail.com', 'thomas1234', 'patient', 2),
(3, 'hanks.tom@gmail.com', 'hanks1234', 'patient', 1),
(6, 'shelby.tom@gmail.com', 'tommy1234', 'patient', 3),
(7, 'katnis.kat@gmail.com', 'katnis1234', 'admin', 0),
(8, 'ahmed.arif@gmail.com', 'ahmedarif123', 'patient', 0),
(9, 'sadiaakhtar@gmail.com', '1234', 'doctor', 0),
(10, 'farah.fawad@gmail.com', 'farahfawad123', 'patient', 0),
(11, 'usman.ali@gmail.com', 'usmanali123', 'patient', 0),
(14, 'taha.yousuf@gmail.com', '1234', 'moderator', 0),
(15, 'saadakhtar@gmail.com', '1234', 'finance', 6);

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_video`
--

CREATE TABLE `uploaded_video` (
  `uploaded_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `firebase_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uploaded_video`
--

INSERT INTO `uploaded_video` (`uploaded_id`, `patient_id`, `firebase_id`) VALUES
(1, 1, '0'),
(2, 7, '0'),
(4, 7, '-N4q4pDjRheWv2AAkQW1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`administrator_signin`),
  ADD KEY `signin_id` (`signin_id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `signin_id` (`signin_id`);

--
-- Indexes for table `doctor_registration`
--
ALTER TABLE `doctor_registration`
  ADD PRIMARY KEY (`R_id`);

--
-- Indexes for table `finance`
--
ALTER TABLE `finance`
  ADD PRIMARY KEY (`finance_id`);

--
-- Indexes for table `medicine_reminder`
--
ALTER TABLE `medicine_reminder`
  ADD PRIMARY KEY (`medicine_reminder_id`),
  ADD KEY `signin_id` (`signin_id`);

--
-- Indexes for table `moderator`
--
ALTER TABLE `moderator`
  ADD PRIMARY KEY (`moderator_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `patient_ibfk_1` (`signin_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`reportID`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `uploaded_id` (`uploaded_id`);

--
-- Indexes for table `signin`
--
ALTER TABLE `signin`
  ADD PRIMARY KEY (`signin_id`),
  ADD KEY `signin_ibfk_1` (`patient_id`);

--
-- Indexes for table `uploaded_video`
--
ALTER TABLE `uploaded_video`
  ADD PRIMARY KEY (`uploaded_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `administrator_signin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `doctor_registration`
--
ALTER TABLE `doctor_registration`
  MODIFY `R_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `finance`
--
ALTER TABLE `finance`
  MODIFY `finance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medicine_reminder`
--
ALTER TABLE `medicine_reminder`
  MODIFY `medicine_reminder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `moderator`
--
ALTER TABLE `moderator`
  MODIFY `moderator_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `reportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `signin`
--
ALTER TABLE `signin`
  MODIFY `signin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `uploaded_video`
--
ALTER TABLE `uploaded_video`
  MODIFY `uploaded_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administrator`
--
ALTER TABLE `administrator`
  ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`signin_id`) REFERENCES `signin` (`signin_id`) ON DELETE CASCADE;

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`signin_id`) REFERENCES `signin` (`signin_id`) ON DELETE CASCADE;

--
-- Constraints for table `medicine_reminder`
--
ALTER TABLE `medicine_reminder`
  ADD CONSTRAINT `medicine_reminder_ibfk_1` FOREIGN KEY (`signin_id`) REFERENCES `signin` (`signin_id`);

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`signin_id`) REFERENCES `signin` (`signin_id`),
  ADD CONSTRAINT `patient_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`uploaded_id`) REFERENCES `uploaded_video` (`uploaded_id`) ON DELETE CASCADE;

--
-- Constraints for table `uploaded_video`
--
ALTER TABLE `uploaded_video`
  ADD CONSTRAINT `uploaded_video_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
