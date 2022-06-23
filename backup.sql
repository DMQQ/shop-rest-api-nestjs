-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2022 at 11:40 AM
-- Server version: 8.0.28
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `auction`
--

CREATE TABLE `auction` (
  `auction_id` char(36) NOT NULL,
  `seller` int NOT NULL,
  `date_end` varchar(255) NOT NULL,
  `active` tinyint NOT NULL,
  `product` int NOT NULL,
  `date_start` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `min_price` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auction`
--

INSERT INTO `auction` (`auction_id`, `seller`, `date_end`, `active`, `product`, `date_start`, `min_price`) VALUES
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2, '30.03.2022', 1, 21, '2022-03-26 13:14:29.923705', 0),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', 2, '30.03.2022', 1, 21, '2022-03-26 19:33:19.756071', 0),
('e8cf127a-dc16-4559-86eb-c38519683e24', 2, '30.03.2022', 1, 21, '2022-03-26 13:14:31.129111', 0);

-- --------------------------------------------------------

--
-- Table structure for table `auction_bids_bids`
--

CREATE TABLE `auction_bids_bids` (
  `auction_id` char(36) NOT NULL,
  `bid_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auction_bids_bids`
--

INSERT INTO `auction_bids_bids` (`auction_id`, `bid_id`) VALUES
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '02b39a7c-a083-46c7-9aec-f44a1af1a10d'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '0606fa38-6307-4198-a3d1-5f8a5bd396ba'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '101423d7-3b3d-424f-8841-5acf2b755a77'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '1595399c-c649-479e-9c51-bd15a0d33b0d'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '2140c2de-27b8-4420-9fcf-a60b3f5f3e28'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '21418806-b211-4159-bd7b-9cab19207288'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '3ffc69ce-df52-423b-8dc7-3b92b1661b5c'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '4bbab0fc-262f-419a-9c29-c1a2654ea879'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '4efe74d0-8b3a-475f-b872-3629ee9dd8a1'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '6847cf9a-7d3d-4283-9324-acf173954ca8'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '77687338-27ca-44ac-b31d-66277ae747a5'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '79c1d010-6013-4aa2-a72f-c7fcfac1ff99'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '7b1cef93-d9ac-4ca4-a1af-c7428de0596f'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', '870d6dea-8515-4a9e-bfa9-18acdee55b59'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'a966767f-9083-41ff-ab66-b081060fb57d'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'b1b4d9a3-51cf-4e82-966a-ce7c4f0ed89c'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'b539b49f-d09f-4f63-90ad-31866114f5d8'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'bc72649c-588b-4239-beda-903f5a170278'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'c757c582-dbb8-4b93-8fb5-cb3863d900c0'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'd1eb43cb-984b-4b3b-a907-852d50cbec0f'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'd3d2af77-ecbf-4433-9dfd-d0fb57decc68'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'd5718c4a-325b-45db-ba73-b75fae0c722f'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'e9657bf8-53b2-4df2-b4b7-87e88262c503'),
('02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 'fec3770f-da02-49ac-989a-634bb75cc47d'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', '1e69b03b-6571-427c-84e2-4dcc2b58da16'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', '5dcac593-edc5-487e-835f-f082785badce'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', '6a1ce3de-7bce-4522-8f18-8e053734578f'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', '7caa97d9-1fc9-4baf-a1e7-6876a162393d'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', '7cb75b70-7956-4fa7-82d0-f3485a9fb929'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', '8ddac77e-26eb-46a6-bd04-7aacb6fa91ab'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', 'aa61734d-e43b-4ec3-8e4c-b24fbd469ee3'),
('16b80361-994b-4956-9fdd-ce45fac6c4e7', 'b3c2bd5d-3b31-4d12-81b7-4a7fe83bc6a9'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '04ea82b5-8ce2-439a-a519-1f0c77d1a767'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '085dfede-3117-4c51-a971-43c52599f5cc'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '08d1edf3-61c4-4d5e-a20f-32f9292f38af'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '0ff09e2b-e5c6-464f-badd-74f2d83596ec'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '16c5b29b-9371-4570-8ae8-42c8d4248a03'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '1d7c14f5-f787-410f-8ac7-dd823b5f73ea'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '1fc76342-f37a-4cd6-a6fa-306cf03063bb'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '219c4304-1378-44bb-b141-85b153795d92'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '23c2e3e6-e9d7-4d49-bccd-e95f9188c317'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '2867c83e-dec1-4b04-a457-87ba5533ae7a'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '2a77d7ff-bbda-438e-9962-3945c7318913'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '2c97d92d-1e2d-40b7-85c5-1b0b624bf682'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '336c09e9-ed6e-47b6-b2ce-c0bf73321902'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '4596e6b2-6567-4d5d-80d1-188ff1465b39'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '515d7701-2e80-4de0-ace1-ee706f42b89c'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '546a9554-ca51-4b4e-9265-4c8e61e19ce8'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '551d0619-2c42-46e4-a289-9b4aba7eb170'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '55eda744-6fba-4191-97a4-56e3b93ef3f2'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '59563ed3-48fa-4106-a492-650fa9206eb2'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '59db5b7b-a5d0-48d9-9630-fc558bcb211d'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '5a3c9434-ffbd-49f3-89c7-019f5d3ada01'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '61f06034-8f99-4e34-a207-d1e380619d18'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '67bf9435-c92b-4904-916f-3b0312ddc15f'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '67e2317d-b311-4637-82fd-0dfa1db8b1da'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '6ef76117-ddbd-41a4-b7bf-96072cc32da5'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '6f406c7e-720e-45da-af05-a98282e84330'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '70300587-5647-4e06-807c-8f0b73fa1bcf'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '750658b6-6927-4dcb-9c89-742707732033'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '7a48ec03-591f-42bf-94c9-2493dfd2f418'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '7e739e81-53a8-4fd0-ab58-59b10fa961b6'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '851b5f48-df3d-4602-8fdd-1428a5becda0'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '859bdfd2-3e27-4ed6-a797-2f912f83101d'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '8b9c8fa9-80ef-402d-a103-8fa0b19fd699'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '8c118a05-45a1-4366-8d3a-e37eade69ed9'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '921e3790-c3e6-4dfe-9662-dc03a9ec4450'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '93360e81-ee98-4219-bf99-bcac5e80c349'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '971e18bc-5d24-4f70-bd85-84c29c04b8d9'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '9956eb51-ae8d-4568-938b-70824a5f6559'),
('e8cf127a-dc16-4559-86eb-c38519683e24', '9c4393c9-9f52-4a01-b61f-3bd23f58825a'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'a0624deb-1a66-4f44-b04b-72ce2557c0ae'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'a337d0d5-ed44-40e6-94fb-584806693c38'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'a4070579-be3d-4d24-930c-219ead9f0863'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'a6574113-9bb5-4828-adfa-ac011fa7b310'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'aabf5403-7240-42db-90f0-c06a99c9dec2'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'ad5b51cd-66d9-4fc3-bafa-c59a9326068b'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'b06e6371-c00f-431b-99f8-d35391b38faf'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'b4db873e-12c6-4fc7-90c2-d46149e594d2'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'b6f8aa3a-6ca2-4db1-9690-f2c5033a33bf'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'bb9cf192-c300-45be-abeb-069c68d50780'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'bea04a24-36d5-42e2-9ed7-ef1102c47016'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'c24b2276-eded-4a9d-aa1a-044754643d7c'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'c5e982bb-afc6-46ef-b239-a60eff4f4dcc'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'c6beecd5-84e6-4310-aa35-ac8f3482e241'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'ca22a75e-32c9-47b3-a3a3-a3c27a2b5eda'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'caf5bf01-0546-4fd9-9cd9-fc3b72a26242'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'cbe84248-eea9-4c7d-9e94-22c2328dd4f4'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'cc13d1c0-096c-42f9-bd75-7f13eac79883'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'd80ecd78-47d4-4535-8df9-0b1dd145ad9a'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'da3f4722-bbe3-4664-93a2-d355805eeaab'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'dcc12b49-c737-49d4-b1e9-41154a42d70b'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'e05eb59c-ce31-4f67-9946-5cb6c87fd683'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'e0944c41-a312-4223-988c-d4d683be967e'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'e93093e8-11c9-4e6d-9a2f-912645ccf9ff'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'ec5878b1-54fe-40a9-96ba-97f0c5ad76bc'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'f0b27ee5-4d35-4488-b9c1-61d5c9498f95'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'f188dad3-42d0-44e4-b52e-d4e3bb69b012'),
('e8cf127a-dc16-4559-86eb-c38519683e24', 'f55a31fd-aade-492e-bf62-af9740368be7');

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
  `bid_id` char(36) NOT NULL,
  `amount` bigint NOT NULL,
  `date_add` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `auction_id` varchar(255) NOT NULL,
  `user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bids`
--

INSERT INTO `bids` (`bid_id`, `amount`, `date_add`, `auction_id`, `user`) VALUES
('02b39a7c-a083-46c7-9aec-f44a1af1a10d', 335, '2022-06-12 10:23:21.567759', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('04ea82b5-8ce2-439a-a519-1f0c77d1a767', 1165, '2022-05-02 15:51:16.729179', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('0606fa38-6307-4198-a3d1-5f8a5bd396ba', 205, '2022-04-26 17:48:28.105814', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('085dfede-3117-4c51-a971-43c52599f5cc', 300, '2022-03-26 13:55:55.070022', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('08d1edf3-61c4-4d5e-a20f-32f9292f38af', 1220, '2022-05-02 15:53:36.373466', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('0ff09e2b-e5c6-464f-badd-74f2d83596ec', 1125, '2022-05-02 15:51:15.123012', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('101423d7-3b3d-424f-8841-5acf2b755a77', 245, '2022-05-20 18:43:37.767116', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('1595399c-c649-479e-9c51-bd15a0d33b0d', 340, '2022-06-12 10:23:22.197454', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('16c5b29b-9371-4570-8ae8-42c8d4248a03', 600, '2022-04-26 17:45:42.222078', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('1d7c14f5-f787-410f-8ac7-dd823b5f73ea', 720, '2022-04-26 17:47:16.979069', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('1e69b03b-6571-427c-84e2-4dcc2b58da16', 75, '2022-06-09 13:23:54.489952', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('1eae1107-6148-409d-ba21-0c77c5d6bf09', 100, '2022-04-26 17:40:00.900883', '', 2),
('1fc76342-f37a-4cd6-a6fa-306cf03063bb', 1180, '2022-05-02 15:51:17.322146', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('2140c2de-27b8-4420-9fcf-a60b3f5f3e28', 320, '2022-06-12 10:23:19.619201', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('21418806-b211-4159-bd7b-9cab19207288', 330, '2022-06-12 10:23:20.673930', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('219c4304-1378-44bb-b141-85b153795d92', 1070, '2022-05-02 15:48:52.993990', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('23c2e3e6-e9d7-4d49-bccd-e95f9188c317', 500, '2022-04-26 17:45:25.321977', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('2867c83e-dec1-4b04-a457-87ba5533ae7a', 715, '2022-04-26 17:47:15.328192', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('2a77d7ff-bbda-438e-9962-3945c7318913', 1020, '2022-05-02 15:48:45.635326', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('2c97d92d-1e2d-40b7-85c5-1b0b624bf682', 700, '2022-04-26 17:47:05.994381', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('336c09e9-ed6e-47b6-b2ce-c0bf73321902', 350, '2022-03-26 19:33:07.850158', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('3ffc69ce-df52-423b-8dc7-3b92b1661b5c', 200, '2022-04-26 17:48:26.779639', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('4138c2ab-2494-4d3e-aeff-2d9245925a62', 200, '2022-03-26 13:42:55.001503', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('4596e6b2-6567-4d5d-80d1-188ff1465b39', 1105, '2022-05-02 15:51:14.380626', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('4bbab0fc-262f-419a-9c29-c1a2654ea879', 310, '2022-06-03 10:47:02.410249', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('4efe74d0-8b3a-475f-b872-3629ee9dd8a1', 300, '2022-05-25 14:52:31.409429', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('515d7701-2e80-4de0-ace1-ee706f42b89c', 1135, '2022-05-02 15:51:15.587855', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('546a9554-ca51-4b4e-9265-4c8e61e19ce8', 1055, '2022-05-02 15:48:52.486596', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('551d0619-2c42-46e4-a289-9b4aba7eb170', 1085, '2022-05-02 15:48:53.453211', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('55eda744-6fba-4191-97a4-56e3b93ef3f2', 605, '2022-04-26 17:46:33.616196', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('59563ed3-48fa-4106-a492-650fa9206eb2', 710, '2022-04-26 17:47:13.759218', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('59db5b7b-a5d0-48d9-9630-fc558bcb211d', 1095, '2022-05-02 15:51:14.011340', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('5a3c9434-ffbd-49f3-89c7-019f5d3ada01', 1110, '2022-05-02 15:51:14.561865', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('5dcac593-edc5-487e-835f-f082785badce', 70, '2022-05-09 17:55:28.408024', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('61f06034-8f99-4e34-a207-d1e380619d18', 150, '2022-03-26 13:53:53.351398', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('67bf9435-c92b-4904-916f-3b0312ddc15f', 1060, '2022-05-02 15:48:52.696991', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('67e2317d-b311-4637-82fd-0dfa1db8b1da', 1160, '2022-05-02 15:51:16.589676', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('6847cf9a-7d3d-4283-9324-acf173954ca8', 315, '2022-06-03 10:47:03.042691', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('6a1ce3de-7bce-4522-8f18-8e053734578f', 65, '2022-05-09 17:47:33.587342', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('6ef76117-ddbd-41a4-b7bf-96072cc32da5', 730, '2022-04-27 19:51:53.106393', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('6f406c7e-720e-45da-af05-a98282e84330', 1050, '2022-05-02 15:48:52.311053', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('70300587-5647-4e06-807c-8f0b73fa1bcf', 1075, '2022-05-02 15:48:53.135627', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('750658b6-6927-4dcb-9c89-742707732033', 400, '2022-03-26 19:33:17.040475', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('77687338-27ca-44ac-b31d-66277ae747a5', 250, '2022-05-25 14:52:24.063846', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('79c1d010-6013-4aa2-a72f-c7fcfac1ff99', 215, '2022-04-26 17:50:41.023251', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('7a48ec03-591f-42bf-94c9-2493dfd2f418', 725, '2022-04-26 17:47:56.456543', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('7b1cef93-d9ac-4ca4-a1af-c7428de0596f', 235, '2022-05-09 18:03:29.648446', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('7caa97d9-1fc9-4baf-a1e7-6876a162393d', 60, '2022-05-02 15:22:14.907484', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('7cb75b70-7956-4fa7-82d0-f3485a9fb929', 20, '2022-03-26 19:35:38.689019', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('7e739e81-53a8-4fd0-ab58-59b10fa961b6', 1130, '2022-05-02 15:51:15.371963', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('851b5f48-df3d-4602-8fdd-1428a5becda0', 1225, '2022-05-02 15:53:37.387016', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('859bdfd2-3e27-4ed6-a797-2f912f83101d', 1145, '2022-05-02 15:51:16.016808', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('870d6dea-8515-4a9e-bfa9-18acdee55b59', 220, '2022-05-03 17:43:18.565501', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 1),
('8b9c8fa9-80ef-402d-a103-8fa0b19fd699', 1115, '2022-05-02 15:51:14.742506', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('8c118a05-45a1-4366-8d3a-e37eade69ed9', 1190, '2022-05-02 15:51:17.650202', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('8ddac77e-26eb-46a6-bd04-7aacb6fa91ab', 55, '2022-04-26 18:03:55.303088', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('921e3790-c3e6-4dfe-9662-dc03a9ec4450', 1245, '2022-05-26 14:55:28.721148', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('93360e81-ee98-4219-bf99-bcac5e80c349', 1140, '2022-05-02 15:51:15.799067', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('971e18bc-5d24-4f70-bd85-84c29c04b8d9', 735, '2022-04-27 19:51:54.987073', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('9956eb51-ae8d-4568-938b-70824a5f6559', 1240, '2022-05-03 15:28:07.548202', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('9c4393c9-9f52-4a01-b61f-3bd23f58825a', 1065, '2022-05-02 15:48:52.853743', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('a0624deb-1a66-4f44-b04b-72ce2557c0ae', 1230, '2022-05-02 15:53:39.169130', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('a337d0d5-ed44-40e6-94fb-584806693c38', 1035, '2022-05-02 15:48:48.030425', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('a4070579-be3d-4d24-930c-219ead9f0863', 1210, '2022-05-02 15:52:55.690053', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('a6574113-9bb5-4828-adfa-ac011fa7b310', 250, '2022-03-26 13:48:01.418954', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('a966767f-9083-41ff-ab66-b081060fb57d', 350, '2022-06-12 10:23:23.396253', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('aa61734d-e43b-4ec3-8e4c-b24fbd469ee3', 25, '2022-04-26 17:51:46.179593', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('aabf5403-7240-42db-90f0-c06a99c9dec2', 1080, '2022-05-02 15:48:53.326867', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('ad5b51cd-66d9-4fc3-bafa-c59a9326068b', 1150, '2022-05-02 15:51:16.198725', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('b06e6371-c00f-431b-99f8-d35391b38faf', 150, '2022-03-26 13:48:21.202744', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('b1b4d9a3-51cf-4e82-966a-ce7c4f0ed89c', 210, '2022-04-26 17:48:29.446317', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('b3c2bd5d-3b31-4d12-81b7-4a7fe83bc6a9', 50, '2022-04-26 17:51:47.080968', '16b80361-994b-4956-9fdd-ce45fac6c4e7', 2),
('b4db873e-12c6-4fc7-90c2-d46149e594d2', 1185, '2022-05-02 15:51:17.469964', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('b539b49f-d09f-4f63-90ad-31866114f5d8', 240, '2022-05-20 18:43:36.608770', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('b6f8aa3a-6ca2-4db1-9690-f2c5033a33bf', 1175, '2022-05-02 15:51:17.152609', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('bb9cf192-c300-45be-abeb-069c68d50780', 1100, '2022-05-02 15:51:14.166348', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('bc72649c-588b-4239-beda-903f5a170278', 325, '2022-06-12 10:23:19.950026', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('bea04a24-36d5-42e2-9ed7-ef1102c47016', 1025, '2022-05-02 15:48:45.871828', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('c24b2276-eded-4a9d-aa1a-044754643d7c', 1200, '2022-05-02 15:51:29.756538', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('c5e982bb-afc6-46ef-b239-a60eff4f4dcc', 1235, '2022-05-02 15:55:46.649822', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('c6beecd5-84e6-4310-aa35-ac8f3482e241', 1090, '2022-05-02 15:51:12.779814', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('c757c582-dbb8-4b93-8fb5-cb3863d900c0', 230, '2022-05-03 17:43:28.932544', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 1),
('ca22a75e-32c9-47b3-a3a3-a3c27a2b5eda', 1205, '2022-05-02 15:52:43.658211', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('caf5bf01-0546-4fd9-9cd9-fc3b72a26242', 1155, '2022-05-02 15:51:16.384862', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('cbe84248-eea9-4c7d-9e94-22c2328dd4f4', 1045, '2022-05-02 15:48:52.161554', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('cc13d1c0-096c-42f9-bd75-7f13eac79883', 1030, '2022-05-02 15:48:46.026995', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('d1eb43cb-984b-4b3b-a907-852d50cbec0f', 305, '2022-05-29 15:23:06.864117', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('d3d2af77-ecbf-4433-9dfd-d0fb57decc68', 345, '2022-06-12 10:23:22.784373', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('d5718c4a-325b-45db-ba73-b75fae0c722f', 360, '2022-06-12 10:31:41.658066', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('d80ecd78-47d4-4535-8df9-0b1dd145ad9a', 1015, '2022-05-02 15:48:45.212502', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('da3f4722-bbe3-4664-93a2-d355805eeaab', 1000, '2022-04-27 19:52:11.469730', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('dcc12b49-c737-49d4-b1e9-41154a42d70b', 1040, '2022-05-02 15:48:48.574713', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('e05eb59c-ce31-4f67-9946-5cb6c87fd683', 705, '2022-04-26 17:47:12.363712', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('e0944c41-a312-4223-988c-d4d683be967e', 1010, '2022-05-02 15:48:45.037276', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('e93093e8-11c9-4e6d-9a2f-912645ccf9ff', 200, '2022-03-26 13:46:52.109753', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('e9657bf8-53b2-4df2-b4b7-87e88262c503', 355, '2022-06-12 10:23:24.006541', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 2),
('ec5878b1-54fe-40a9-96ba-97f0c5ad76bc', 1005, '2022-05-02 15:48:44.794530', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('f0b27ee5-4d35-4488-b9c1-61d5c9498f95', 1120, '2022-05-02 15:51:14.950185', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('f188dad3-42d0-44e4-b52e-d4e3bb69b012', 1215, '2022-05-02 15:53:34.737104', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('f55a31fd-aade-492e-bf62-af9740368be7', 1170, '2022-05-02 15:51:16.954918', 'e8cf127a-dc16-4559-86eb-c38519683e24', 2),
('fec3770f-da02-49ac-989a-634bb75cc47d', 225, '2022-05-03 17:43:24.216173', '02ba56d8-ee30-47b4-9dc5-fd8970dfa13c', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int NOT NULL,
  `user_id` int NOT NULL,
  `ammount` int NOT NULL DEFAULT '1',
  `prod_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `ammount`, `prod_id`) VALUES
(110, 1, 2, 4),
(342, 2, 1, 3),
(343, 2, 3, 21);

-- --------------------------------------------------------

--
-- Table structure for table `daily_promotion`
--

CREATE TABLE `daily_promotion` (
  `id` int NOT NULL,
  `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `type` varchar(255) NOT NULL,
  `prod_id` int DEFAULT NULL,
  `amount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `daily_promotion`
--

INSERT INTO `daily_promotion` (`id`, `date`, `type`, `prod_id`, `amount`) VALUES
(3, '2022-02-06 12:02:36.749239', 'test', 4, 0),
(4, '2022-03-30 16:52:11.803692', 'test', 21, 0);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `prod_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `prod_id`) VALUES
(1, '1abf043c28de0083b62ac98d7d081ed4', 3),
(2, '00fa33c8cc27c60b704fcd31c7e390dc', 3),
(3, '3e20eca641bf2311e9d8f948d87d9e00', 3),
(4, '7d453eda5954f8a856c5a2b236ae2569', 4),
(5, '1edff81d928369444c007a1a355d857e', 4),
(6, '2615722b673e162927c1af9e1404dd93', 4),
(7, 'eeee226322325dcdd50b654eb80fd892', 16),
(8, '4db28066bb8bc27926d14063159a7666', 16),
(9, 'e330e1aae1f8e07519fbd325232b7050', 16),
(10, '940dc02e0ff455e90b8d2327697ecba9', 17),
(11, 'e4bd0ca15ea43aa428a8153b56227a89', 17),
(12, '4fc221ec0c9fa7c1a9e2f254fbdbc6f7', 17),
(13, 'a053720c9bcf699bae91ab5edb9745e0', 18),
(14, '6a9d0ce4e34694f545a9df6f76ebbe63', 18),
(15, '5bedf35fa2891a6cdc4a787468dface9', 18),
(16, '9dda15da78e7dce9a8968677dfdd0182', 19),
(17, 'b8c9034af7a953b67f7f4e896561e0b1', 20),
(18, 'eace2493b92db2fded65828e79a6dbda', 20),
(19, '11167a741e10fcb26e8a226cf52e13c3', 20),
(20, '4d923ee06d58ac216bf86ea9ce777908', 21),
(21, '2b4ad11d09f8d6f3dc4ecae77c0cdb07', 21),
(22, '2dd59fb3aeada4e1f0f7f1a8d2a8e18e', 21),
(23, '21c3cbc9717758b6af9424d37885fef9', 22),
(24, '77c2ded979498b4c917cc99a7563d6f2', 22),
(25, '599c186e1be04be8b6eeb87364aed144', 22),
(26, '99ee0219381bfc6a5601e7e7aeddf334', 22),
(27, '9c9e903695ae84ac8b93ec2f79c8d9dd', 23),
(28, '734cf101e3092fca68a95baf823a99ed', 24),
(29, 'fd488209c5a7dfc2238fa84cce510d65', 25),
(30, '2afbd4c155fadc5c835090597f83b8ca', 26),
(31, '42c95b6cd2c361d8880a4e5ca76dc5bd', 26),
(32, '4477a750c38817e6f3b9845e6a2fae9a', 26),
(33, 'e0823e680444b319c2fe72c6b0490f15', 27),
(34, '8568be93314b023d4c6080eb1926f691', 27),
(35, '6771e9f5533fb3f435b3643e79aedd8e', 27),
(36, 'f301adcc433b765ffbd58644ed2ba5d5', 28),
(37, '6c273ae38ba350f33a3d637425eeeafb', 29),
(38, '4923ae309c4d407daff4de1f74e2a80b', 29),
(39, 'ff7e407c2aadd77a2cdbea1124d1c7aa', 29),
(40, '383546e95be033e57753407c27b991d3', 30),
(41, '5a46d81c15952d40ed8e0e85cc0b7156', 30),
(42, 'f0b5e2767564979aa4dbfbf018c0f4b8', 31),
(43, '2374894fa0f3d8af7b355e88ffc14a72', 31),
(44, '4d95da64b71354034728919d4f36a58f', 32),
(45, 'c21d9b1328c6e1bdb10a10ac4f77523a', 33),
(46, '8f6c58529d672c346d9ca5572fc1c0dc', 33),
(47, 'b6ba4d31ca4051d31c7833059f3cd65f', 33),
(48, '4a22ef0c5bc658ec38a27bb4b9d39486', 34),
(49, '0256b9db762008f0700a34a9562b4ca6', 34),
(50, '7d7a6518372be9ebe0f33acd1d291cdc', 35),
(51, '357b5fe854f934c442b554bfa6c224ce', 35),
(52, '90ded4ac294d59178dcd70e7f7d69ff7', 35),
(53, '0d1c9dba0a6829c0da22b30b56b6a4ac', 36),
(54, '6a36fae25146f814d377048dc668398b', 36),
(55, '5a68749c150b0b46b23cabb51e4c0961', 37),
(56, '981b4dd795c2a8b0946851e19abdf754', 37),
(57, '6e871d94b36593f21364b1045455c9e7', 38),
(58, '4c609361edd39fa293956e085ee7e3e2', 38),
(59, '62f1b726705ed109d7d6b204ccda8af0', 39),
(60, '42112b702b64c052687247e01f17cb9e', 39);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `enabled` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `token`, `enabled`) VALUES
(1, 1, 'ExponentPushToken[UF4gvkCWDSxtiHbwz3hWKm]', 1),
(2, 2, 'ExponentPushToken[UF4gvkCWDSxtiHbwz3hWKm]', 0),
(3, 3, 'ExponentPushToken[UF4gvkCWDSxtiHbwz3hWKm]', 0),
(4, 12, 'ExponentPushToken[UF4gvkCWDSxtiHbwz3hWKm]', 0),
(6, 14, 'ExponentPushToken[UF4gvkCWDSxtiHbwz3hWKm]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` char(36) NOT NULL,
  `user_id` int NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `client_secret` varchar(255) NOT NULL,
  `total_price` int NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `status` enum('created','processing','finished','failed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `user_id`, `payment_method`, `client_secret`, `total_price`, `date`, `status`) VALUES
('08bfdc34-dd29-4e0b-9364-0aaa09c0d74e', 0, '', '', 0, '2022-06-20 08:23:22.508948', NULL),
('2f971fc8-7098-4271-a58b-ce6d818b5595', 0, '', '', 0, '2022-06-20 08:23:22.508948', NULL),
('4a868d4e-8239-4987-90ef-fe3dc56eb1ef', 2, 'pm_1LD1vUJFFDDymwGwDVGknjU4', 'pi_3LD1vFJFFDDymwGw1PhvSu4V_secret_nxtaW660qN5T2u5GZ2p5FgPhJ', 69, '2022-06-21 07:55:09.887254', 'finished'),
('9349fd40-d262-4736-8088-0af4f4d22604', 2, 'pm_1LCfyRJFFDDymwGw8Ci7SUI5', 'pi_3LCfyJJFFDDymwGw1qe87yqs_secret_KHxJqswMif7SKOHvcca5yDNtO', 199, '2022-06-20 08:28:56.860371', 'finished'),
('a9b4416c-0d03-43ed-8892-103573cf8523', 0, '', '', 0, '2022-06-20 08:23:22.508948', NULL),
('b9fc4164-e6c3-45b7-a9ae-aa74478abc09', 0, '', '', 0, '2022-06-20 08:23:22.508948', NULL),
('c226f55c-61d3-4b0d-b32d-ebc4c38a2559', 0, '', '', 0, '2022-06-20 08:23:22.508948', NULL),
('db5f8929-4002-4d06-8bc8-dde419a98ca5', 2, 'pm_1LCfwXJFFDDymwGwdlvQSdsz', 'pi_3LCfwMJFFDDymwGw1cJbO2JZ_secret_EPqFbQQpcxwySV2R9GteW2xOP', 999, '2022-06-20 08:26:56.212857', 'finished');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `prod_id` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `discount_price` decimal(10,0) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `manufacturer` varchar(60) NOT NULL,
  `vendor` int DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `date_add` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `tags` varchar(255) NOT NULL,
  `rating` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prod_id`, `price`, `discount_price`, `title`, `description`, `category`, `manufacturer`, `vendor`, `quantity`, `date_add`, `tags`, `rating`) VALUES
(3, '999', NULL, 'Apple Macbook air m1 16gb', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'Electronic', 'Apple', 1, 97, '2022-06-20 10:27:36.000000', '', 0),
(4, '1599', NULL, 'Apple Macbook pro m1 16GB 512GB', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Electronic', 'Apple', 1, 98, '2022-06-20 10:27:36.000000', '', 0),
(16, '1100', NULL, 'Samsung Galaxy S21 5G 8GB 256GB', 'Lorem Ipsum is simply dummy tLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ext of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Electronic', 'Samsung', 1, 100, '2022-06-20 10:27:36.000000', '', 0),
(17, '699', NULL, 'Apple Ipad mini 2021 8.3\" Wi-Fi 4GB/64GB', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Electronic', 'Apple', 1, 99, '2022-06-20 10:27:36.000000', '', 0),
(18, '729', NULL, 'Apple Ipad air 4 4GB/64GB', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Electronic', 'Apple', 1, 100, '2022-06-20 10:27:36.000000', '', 0),
(19, '499', NULL, 'Waschingmachine BEKO', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'Home appliances', 'Beko', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(20, '8', NULL, 'Pizza salami cheese', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Food', 'Pizza', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(21, '999', NULL, 'Apple Iphone 13 Pro 128Gb', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Electronic', 'Apple', 1, 89, '2022-06-20 10:27:36.000000', '', 0),
(22, '1100', NULL, 'Samsung Galaxy s22 Ultra 12/512GB Rose Red', 'Samsung Galaxy S22 Ultra 12/512 GB Dark Red Spójrz na przodzie Samsung Galaxy S22 Ultra 12/512 GB czerwony umieszczono ekran o wielkości 6,8 cala z odświeżaniem na poziomie 120 Hz. Dzięki temu każde oglądane sceny, czy ciekawe artykuły będą świetnej jakości. A efekt smużenia już nie będzie występował. Co ważne, są również wydajne aparaty. Wybierz odpowiedni i zacznij tworzyć niesamowite ujęcia. Natomiast całość zamknięto w eleganckiej obudowie. Poznaj jakość ultra, poznaj nowego Samsung Galaxy S22 Ultra.', 'Electronic', 'Samsung', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(23, '99', NULL, 'MSI MAG Core Liquid 360R 3x120mm', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Electronic', 'MSI', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(24, '399', NULL, 'Apple Iphone SE 2022 64Gb', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'Electronic', 'Apple', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(25, '499', NULL, 'Apple Iphone', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'Electronic', 'Apple', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(26, '1200', NULL, 'Samsung Galaxy Tab s8', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Electronic', 'Samsung', 2, 99, '2022-06-20 10:27:36.000000', '', 0),
(27, '89', NULL, 'Gaming Keyboard SPC Gear GK650K Onyx White', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Accessories', 'SPC Gear', 2, 99, '2022-06-20 10:27:36.000000', '', 0),
(28, '199', NULL, 'Intel Core i5-12400 12th gen', 'Korzystaj z procesorów Intel stworzonych dla gamingu nowej generacji, takich jak wyposażony w 6 rdzeni i 12 wątków Intel Core i5-12400. Zapewnia on rewolucyjną wydajność dzięki wysokiemu taktowaniu do nawet 4,4 GHz. Pewnie zwyciężaj w kolejnych rozgrywkach i doświadcz imersji w nowe wirtualne światy. Wszystko to dzięki rewolucyjnej architekturze procesora skupiającej się na tym co, najważniejsze – gamingu.  Intel Core i5-12400 test kart graficznych Poznaj moc procesora Intel Core i5-12400 Kiedy liczą się FPS-y nie ma czasu na półśrodki, dlatego specjalnie dla Ciebie przetestowaliśmy Intel Core i5-12400 na platformie testowej z układem GeForce RTX 3090. Przekonaj się, ile FPS średnio wyciąga w grach ten CPU (rozdzielczość Full HD, ustawienia detali Ultra) oraz jaki wynik osiągnął w benchmarku CineBench R20 MC, teście kompresji 7-Zip i renderingu Corona.', 'Components', 'Intel', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(29, '79', NULL, 'Huawei Watch GT 2 46mm Sport Black', 'Odkryj Huawei Watch GT 2 Sport czarny w 360 stopniach Przekraczaj granice swoich możliwości z czarnym Huawei Watch GT 2 Sport. Wytrzymała, odporna na wodę konstrukcja z metalową kopertą i profilowanym szkłem 3D łączy w sobie sportowy charakter i subtelną elegancję. Oznacza to, że sprawdzi się zarówno na siłowni jak i podczas biznesowego spotkania. Watch GT 2 Sport zasila przełomowy procesor Kirin A1 oferujący wspaniałą wydajność i wsparcie AI. Dodatkowo, smartwatch wyposażono w bogaty zestaw czujników monitorujących aktywność oraz zestaw przydatnych funkcji multimedialnych.  Sprawdź, jak Huawei Watch GT 2 Sport czarny wygląda w rzeczywistości. Chwyć zdjęcie poniżej i przeciągnij je w lewo lub prawo aby obrócić produkt lub skorzystaj z przycisków nawigacyjnych.', 'Accessories', 'Huawei', 2, 99, '2022-06-20 10:27:36.000000', '', 0),
(30, '199', NULL, 'Keyboard Corsair K100 OPX Gold', 'Dołącz do gamingowej elity z klawiaturą Corsair K100 OPX Gold. Stworzona z myślą o graczach, przygotowana na to, by otworzyć Ci furtkę do świata e-sportu i wynieść na szczyty tabel rankingowych. Wytrzymała obudowa z aluminium anodowanego bez problemu sprosta wielogodzinnym bataliom w ulubionej grze. Natomiast ponadczasowy design w kolorze Midnight Gold sprawi, że nie oderwiesz od niej wzroku. Wybierz Corsair K100 OPX Gold i wyraź swój charakter.', 'Accessories', 'Corsair', 2, 98, '2022-06-20 10:28:56.000000', '', 0),
(31, '999', NULL, 'EVGA GeForce RTX 3070 Ti FTW3 ULTRA GAMING 8GB GDDR6X', 'orzystaj z nowatorskich technologii, takich jak Ray Tracing czy DLSS, dzięki karcie graficznej EVGA GeForce RTX 3070 Ti FTW3 ULTRA GAMING. To oparta o architekturę NVIDIA Ampere konstrukcja, zapewniająca wyjątkowe osiągi we współczesnych grach. O jej stabilną pracę w ogniu walki dba autorski układ chłodzenia iCX3. Dzięki oprogramowaniu Precision X1 będziesz w stanie monitorować pracę karty oraz przejmiesz pełną kontrolę nad jej parametrami.', 'Components', 'EVGA', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(32, '399', NULL, 'Xiaomi POCO X3 PRO NFC 8/256GB Phantom Black 120Hz', 'Genialna sylwetka oraz ogromny ekran to nowy Xiaomi POCO X3 PRO 8/256 GB czarny. Otwórz się na nowe doznania w swojej ulubionej grze i nigdy nie zwalniaj, a efekt smużenia nigdy nie zagości. Matryca ma odświeżanie 120 Hz oraz wielkość 6,67 cala dzięki temu każda akcja będzie płynna. Zdjęcia? Pewnie, Twórz je tylnym aparatem, a ujęcia będą naprawdę bardzo dobre. Co więcej, POCO X3 PRO oferuje ultraszybkie ładowanie, aby szybko powrócić do swoich zajęć. Bezawaryjna praca to tylko z POCO X3 PRO czarny.', 'Electronic', 'Xiaomi', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(33, '189', NULL, 'Apple AirPods Pro z MagSafe', 'Każdy detal słuchawek AirPods Pro został opracowany pod kątem maksymalnej wygody i idealnego dopasowania. Korekcja EQ dostraja automatycznie muzykę, aby zachwyciła Cię doskonałym brzmieniem.  Specjalny wewnętrzny mikrofon na bieżąco odbiera to, co dociera do Twojego ucha, dzięki czemu AirPods odpowiednio regulują niskie i średnie częstotliwości. Specjalne przetworniki generują dźwięk o niskim poziomie zniekształceń, wliczając w to potężne basy.  Ten model słuchawek AirPods Pro został wyposażony w etui ładujące MagSafe, które zapewni Ci nawet ponad 24 godziny odtwarzania muzyki. Wystarczy, że położysz etui na ładowarce MagSafe, która magnetycznie przyłączy się do niego i rozpocznie proces ładowania.', 'Electronic', 'Apple', 2, 99, '2022-06-20 10:27:36.000000', '', 0),
(34, '79', NULL, 'Nothing Ear (1) black ANC', 'Poznaj Nothing ear (1) - niezwykle lekkie, bo ważące 4,7 grama słuchawki bezprzewodowe o nieszablonowym wyglądzie i dużych możliwościach. Przezroczysta obudowa słuchawek ear (1) w czarnej kolorystyce pozwala zajrzeć do ich wnętrza, dzięki czemu możesz podziwiać wysoką jakość ich wykonania. Stabilną łączność bezprzewodową gwarantuje zastosowany moduł Bluetooth 5.2.  Dzięki słuchawkom Nothing ear (1) możesz odciąć się od otaczającego Cię zgiełku, korzystając z funkcji aktywnej redukcji hałasu (ANC). Niesamowitą jakość dźwięku zapewniają mocne przetworniki o średnicy 11,6 mm opracowane przez specjalistów z firmy Teenage Engineering.  Bezprzewodową swobodą korzystania ze słuchawek Nothing ear (1) możesz cieszyć się przez długi czas. W pełni naładowane słuchawki możesz używać nawet przez 5 godzin. Etui ładujące wydłuży ten czas nawet do 34 godzin. Etui ładujące możesz naładować przewodowo lub bezprzewodowo.', 'Electronic', 'Nothing Ear', 2, 98, '2022-06-20 10:27:36.000000', '', 0),
(35, '459', NULL, 'Dell S2721DGFA nanoIPS HDR', 'Specjalnie dla Ciebie przeprowadziliśmy testy matrycy, sprawdzając między innymi pokrycie barw, maksymalną jasność, podświetlenie, balans bieli i średni błąd delta E. Zmierzyliśmy kluczowe parametry, aby przedstawić Ci wszystkie możliwe zastosowania panelu. Przygotowaliśmy też krótkie podsumowanie oraz wykaz wad i zalet monitora.  Ocena x-komu Monitor dedykowany graczom. Wysokie pokrycie przestrzeni sRGB skutkuje w nasyconych i żywych kolorach. Niestety kalibracja fabryczna wymaga poprawy, co powoduje, że obraz delikatnie różni się względem skalibrowanego panelu. Dodatkowo niski kontrast przejawia się w jasnych czerniach oraz mało wyraźnych detalach w ciemnych scenach. Z drugiej strony wysoka jasność maksymalna cechuje się wyraźnym obrazem przy ostrym świetle dziennym.', 'Electronic', 'Dell', 2, 99, '2022-06-20 10:27:36.000000', '', 0),
(36, '699', NULL, 'HP Pavilion 15 Ryzen 5-4500/16GB/512/Win10 Silver', 'Poznaj HP Pavilion 15. Wyjątkową serię laptopów, która sprosta Twoim wszelkim oczekiwaniom. Nowoczesny procesor AMD Radeon™ oraz zintegrowany układ graficzny nigdy Cię nie zawiodą. To uniwersalne urządzenie sprawdzi się, gdy będziesz używać go do pracy w biurze lub zapragniesz zrelaksować się w domu przy multimediach, czy grze. Wszystko to obejrzysz na wysokiej klasy matowym ekranie w technologii IPS oraz w rozdzielczości Full HD. Zostań szczęśliwym posiadaczem laptopa HP Pavilion 15.', 'Electronic', 'HP', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(37, '1200', NULL, 'Huawei MateBook 16 R5-5600H/16GB/512/Win11 szary', 'Poznaj Huawei MateBook 16. Wyjątkową serię laptopów, która sprosta Twoim oczekiwaniom. Nowoczesny procesor oraz zintegrowany układ graficzny zagwarantują Ci optymalną wydajność. Huawei MateBook 16 sprawdzi się zarówno jako narzędzie do pracy biurowej, jak i centrum filmowo-gamingowej rozrywki. Podziwiaj naturalne kolory wyświetlane na ekranie w rozdzielczości 2,5 K.', 'Electronic', 'Huawei', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(38, '60000', NULL, 'Apple Mac Pro 28-Core XeonW 2,5GHz/1,5TB/4TB/2xPVegaIID', 'Procesor Intel Xeon W-3275M (28 rdzeni, od 2.50 GHz do 4.40 GHz, 38.50 MB cache) Pamięć RAM 1536 GB (DIMM DDR4, 2933 MHz) Maksymalna obsługiwana ilość pamięci RAM 1536 GB Liczba gniazd pamięci (ogółem / wolne) 12/0 Karta graficzna 2 x AMD Radeon™ Pro Vega II Duo Wielkość pamięci karty graficznej 2 x 65536 MB HBM2 (pamięć własna) Dysk SSD PCIe 4096 GB (2 x 2048 GB) Wbudowane napędy optyczne Brak Dźwięk Zintegrowana karta dźwiękowa Wbudowany głośnik Łączność Wi-Fi 5 (802.11 a/b/g/n/ac) LAN 10 Gbps Bluetooth Złącza - panel tylny USB 3.2 Gen. 1 - 2 szt. Thunderbolt 3 - 2 szt. Thunderbolt 3 (karta graficzna) - 8 szt. Wyjście słuchawkowe/wejście mikrofonowe - 1 szt. RJ-45 (LAN) - 2 szt. HDMI (karta graficzna) - 2 szt. AC-in (wejście zasilania) - 1 szt. Złącza - panel górny USB Typu-C (z Thunderbolt 3) - 2 szt. Zasilacz 1400 W Dodatkowe informacje Secure Enclave Obudowa na kółkach Karta Apple Afterburner Mysz i klawiatura w zestawie Mysz bezprzewodowa Dołączone akcesoria Kabel zasilający System operacyjny macOS Catalina Wysokość 557 mm Szerokość 218 mm Głębokość 450 mm Waga 18 kg Gwarancja 12 miesięcy (gwarancja producenta) Rodzaj gwarancji Standardowa Rok premiery 2019 Kod producenta Z0W3/P4/R7/D3/G4/AB/W Kod x-kom 534577', 'Electronic', 'Apple', 2, 100, '2022-06-20 10:27:36.000000', '', 0),
(39, '69', NULL, 'Philips TAPH805 Czarne', 'Philips TAPH805BK to słuchawki bezprzewodowe, które łączą w sobie wszystkie niezbędne cechy podnoszące komfort słuchania ulubionej muzyki. Jedną z nich jest aktywna redukcja szumów, dzięki której wyciszysz świat wokół siebie. Wysokiej jakości dźwięk pozwoli usłyszeć każdy detal. Ponadto takie funkcje jak sterowanie dotykowe, kompatybilność z asystentem głosowym czy szybkie ładowanie i długa praca na baterii sprawią, że słuchawki nauszne Philips TAPH805BK staną się Twoim ulubionym towarzyszem podczas podróży, pracy czy relaksu.', 'Headphones', 'Philips', 2, 93, '2022-06-21 09:55:09.000000', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_history`
--

CREATE TABLE `purchase_history` (
  `history_id` int NOT NULL,
  `prod_id` int DEFAULT NULL,
  `payment_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `purchase_history`
--

INSERT INTO `purchase_history` (`history_id`, `prod_id`, `payment_id`) VALUES
(125, NULL, NULL),
(126, NULL, NULL),
(127, NULL, NULL),
(128, NULL, NULL),
(129, NULL, NULL),
(130, NULL, NULL),
(131, NULL, NULL),
(132, NULL, NULL),
(133, NULL, NULL),
(134, NULL, NULL),
(135, NULL, NULL),
(136, 21, 'db5f8929-4002-4d06-8bc8-dde419a98ca5'),
(137, 30, '9349fd40-d262-4736-8088-0af4f4d22604'),
(138, 39, '4a868d4e-8239-4987-90ef-fe3dc56eb1ef');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `prod_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`rating_id`, `user_id`, `rating`, `title`, `description`, `prod_id`) VALUES
(16, 2, 5, 'Super device ', 'really recommend this one ', 21),
(17, 2, 5, 'Gooood', 'nice shit ', 26),
(18, 2, 4, 'Hello', 'aaaaaa', 30),
(19, 2, 5, 'Nice and Cheap', 'Recommend these headphones for everyone', 39);

-- --------------------------------------------------------

--
-- Table structure for table `searches`
--

CREATE TABLE `searches` (
  `id` int NOT NULL,
  `searches` int NOT NULL,
  `prod_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `search_history`
--

CREATE TABLE `search_history` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `prod_id` int DEFAULT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `search_history`
--

INSERT INTO `search_history` (`id`, `user_id`, `prod_id`, `date`) VALUES
(2964, 1, 20, '2022-02-13 13:40:18.000000'),
(2965, 1, 19, '2022-02-14 13:01:06.000000'),
(2966, 1, 18, '2022-02-14 12:56:40.000000'),
(2967, 1, 17, '2022-02-13 13:40:35.000000'),
(2968, 1, 4, '2022-02-21 17:34:14.000000'),
(2969, 1, 3, '2022-02-14 12:56:59.000000'),
(2970, 1, 16, '2022-02-13 11:40:55.000000'),
(2971, 1, 21, '2022-02-19 19:57:47.000000'),
(2972, 2, 3, '2022-06-01 13:36:28.000000'),
(2973, 2, 21, '2022-03-26 22:36:51.000000'),
(2974, 2, 4, '2022-03-27 11:54:57.000000'),
(2975, 2, 19, '2022-03-26 23:16:56.000000'),
(2976, 2, 20, '2022-03-21 15:05:00.000000'),
(2977, 2, 17, '2022-03-23 18:26:18.000000'),
(2978, 2, 18, '2022-03-23 18:36:46.000000'),
(2979, 2, 16, '2022-03-23 18:27:08.000000'),
(2980, 2, 22, '2022-03-26 23:17:02.000000'),
(2981, 2, 23, '2022-03-27 11:34:14.000000'),
(2982, 1, 23, '2022-02-21 17:32:33.000000'),
(2983, 2, 24, '2022-03-26 18:55:59.000000'),
(2984, 2, 25, '2022-03-26 21:52:01.000000'),
(2985, 2, 26, '2022-03-27 17:14:18.000000'),
(2986, 2, 27, '2022-03-27 11:48:12.000000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `user_type` enum('user','seller','developer') NOT NULL DEFAULT 'user',
  `activated` tinyint NOT NULL DEFAULT '0',
  `name` varchar(60) DEFAULT NULL,
  `surname` varchar(60) DEFAULT NULL,
  `address` varchar(60) DEFAULT NULL,
  `phone_number` varchar(9) DEFAULT NULL,
  `joined_at` datetime NOT NULL,
  `last_active` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `user_type`, `activated`, `name`, `surname`, `address`, `phone_number`, `joined_at`, `last_active`) VALUES
(1, 'damiander2004@gmail.com', '$2b$10$YgyT3x54FtjNECymVzC/fufATMzmVJjR1LnxB2G6kdx0Vxhasbw5e', 'user', 1, 'Damian', NULL, NULL, NULL, '2022-01-23 19:39:40', '2022-01-23 19:39:40.387950'),
(2, 'kozakdamian73@gmail.com', '$2b$10$OBfOEXrLjog/Sskors5Niu.IT2atVoFO.EdxtARMaz2BsZ1f1.67O', 'developer', 1, 'dmq', 'hello', 'Auauauuaua 23a', '213465656', '2022-01-24 13:43:52', '2022-01-24 13:43:52.348217'),
(3, 'test@user.com', '$2b$10$PqdaHBQ/wfIk2heOsqQub.zex19qwHAbWBmTic/uSljkJ6Wf/5GhW', 'user', 1, NULL, NULL, NULL, NULL, '2022-02-03 11:35:25', '2022-02-03 11:35:24.903969'),
(12, 'prokoks76@gmail.com', '$2b$10$XZ8t6qW2sjSB667ompLoneJ1D3I9PyiBIdR6XUIDpTXSGztTC28dW', 'user', 1, NULL, NULL, NULL, NULL, '2022-02-05 12:41:58', '2022-02-05 12:41:57.517357'),
(13, 'awpskillsf2@gmail.com', '$2b$10$fR/PmuAOA9DzoxlZlnmBZ.cfQ2xmXXQu3AxXDCanFUICvaYTryxeK', 'user', 1, NULL, NULL, NULL, NULL, '2022-02-05 13:15:24', '2022-02-05 13:15:24.288469'),
(14, 'levelonero123@gmail.com', '$2b$10$z6luS6CqLJDp4CHir5Ub5.Yyud.WsAujgohuNPWYip3eMhCr./OZe', 'user', 1, 'Damian', NULL, NULL, '213464646', '2022-02-06 12:11:36', '2022-02-06 12:11:35.921592'),
(16, 'tchey30@gmail.com', '$2b$10$mnbDRs3rCIpypnyX.FbibeXGfpSOD2tUQ16pe15C6HtUWeZ1/lnQe', 'user', 1, NULL, NULL, NULL, NULL, '2022-02-15 19:30:52', '2022-02-15 19:30:52.106374'),
(19, 'pagewan272@mahazai.com', '$2b$10$v2MPgFX.o8LKu0bosT2p5Or6U13y1wklS3aySqo/.EKI8FTJuSFzm', 'user', 0, NULL, NULL, NULL, NULL, '2022-06-22 15:28:32', '2022-06-22 15:28:32.264555');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `id` int NOT NULL,
  `prod_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `watchlist`
--

INSERT INTO `watchlist` (`id`, `prod_id`, `user_id`) VALUES
(139, 4, 1),
(140, 21, 1),
(260, 3, 2),
(261, 21, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auction`
--
ALTER TABLE `auction`
  ADD PRIMARY KEY (`auction_id`),
  ADD KEY `FK_a9a129f2e2f5f9d2277ffe0ffd4` (`product`);

--
-- Indexes for table `auction_bids_bids`
--
ALTER TABLE `auction_bids_bids`
  ADD PRIMARY KEY (`auction_id`,`bid_id`),
  ADD KEY `IDX_1e5647918bf9559a0975342a85` (`auction_id`),
  ADD KEY `IDX_ab48c123de30a3f98e7fef9f6f` (`bid_id`);

--
-- Indexes for table `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`bid_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `FK_0966c50f8cb7b4bef0732016892` (`prod_id`);

--
-- Indexes for table `daily_promotion`
--
ALTER TABLE `daily_promotion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a1f3312ddda3afde326d40c4396` (`prod_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cc488c528bab6628436557fcbb5` (`prod_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prod_id`),
  ADD KEY `FK_5968eb8cf6b4b350578734e9f3c` (`vendor`);

--
-- Indexes for table `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `FK_d38fa1517ee76e6814ba7bb736f` (`prod_id`),
  ADD KEY `FK_e1204d5f9ad6352e8c95395f3a8` (`payment_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `FK_ce3eb35f5367eb83202595eebbb` (`prod_id`);

--
-- Indexes for table `searches`
--
ALTER TABLE `searches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d8921b0a677bec472afa06b6d81` (`prod_id`);

--
-- Indexes for table `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9470002c328d58c07074bdfbd07` (`prod_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_116b3a91612f008beb96bfd5742` (`user_id`),
  ADD KEY `FK_5f731249ef58a537a129a27b065` (`prod_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=344;

--
-- AUTO_INCREMENT for table `daily_promotion`
--
ALTER TABLE `daily_promotion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prod_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `purchase_history`
--
ALTER TABLE `purchase_history`
  MODIFY `history_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `searches`
--
ALTER TABLE `searches`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `search_history`
--
ALTER TABLE `search_history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2987;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auction`
--
ALTER TABLE `auction`
  ADD CONSTRAINT `FK_a9a129f2e2f5f9d2277ffe0ffd4` FOREIGN KEY (`product`) REFERENCES `products` (`prod_id`);

--
-- Constraints for table `auction_bids_bids`
--
ALTER TABLE `auction_bids_bids`
  ADD CONSTRAINT `FK_1e5647918bf9559a0975342a85b` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`auction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ab48c123de30a3f98e7fef9f6f9` FOREIGN KEY (`bid_id`) REFERENCES `bids` (`bid_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_0966c50f8cb7b4bef0732016892` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`);

--
-- Constraints for table `daily_promotion`
--
ALTER TABLE `daily_promotion`
  ADD CONSTRAINT `FK_a1f3312ddda3afde326d40c4396` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `FK_cc488c528bab6628436557fcbb5` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_5968eb8cf6b4b350578734e9f3c` FOREIGN KEY (`vendor`) REFERENCES `users` (`id`);

--
-- Constraints for table `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD CONSTRAINT `FK_d38fa1517ee76e6814ba7bb736f` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_e1204d5f9ad6352e8c95395f3a8` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `FK_ce3eb35f5367eb83202595eebbb` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`);

--
-- Constraints for table `searches`
--
ALTER TABLE `searches`
  ADD CONSTRAINT `FK_d8921b0a677bec472afa06b6d81` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE;

--
-- Constraints for table `search_history`
--
ALTER TABLE `search_history`
  ADD CONSTRAINT `FK_9470002c328d58c07074bdfbd07` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE;

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `FK_116b3a91612f008beb96bfd5742` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FK_5f731249ef58a537a129a27b065` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
