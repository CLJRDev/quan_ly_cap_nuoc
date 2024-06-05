-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quan_ly_cap_nuoc
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_chinhanh`
--

DROP TABLE IF EXISTS `dm_chinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_chinhanh` (
  `ma_chi_nhanh` int NOT NULL AUTO_INCREMENT,
  `ten_chi_nhanh` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dia_chi` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`ma_chi_nhanh`),
  UNIQUE KEY `ten_chi_nhanh` (`ten_chi_nhanh`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_chinhanh`
--

LOCK TABLES `dm_chinhanh` WRITE;
/*!40000 ALTER TABLE `dm_chinhanh` DISABLE KEYS */;
INSERT INTO `dm_chinhanh` VALUES (1,'Chi nhánh Cấp nước Hải Phòng 3','Thôn Do Nha, xã Tân Tiến, H. An Dương, TP. Hải Phòng'),(2,'Chi nhánh Cấp nước Trung tâm','Số 54 Đinh Tiên Hoàng, P. Hoàng Văn Thụ, Q. Hồng Bàng, TP. Hải Phòng'),(3,'Chi nhánh Cấp nước Hải Phòng 4','Thôn Nguyệt Áng, xã Thái Sơn, H. An Lão, TP. Hải Phòng'),(4,'Chi nhánh Cấp nước Hải Phòng 5','Đường Đông Nam, KĐT Cựu Viên, P. Quán Trữ, Q. Kiến An, TP. Hải Phòng'),(5,'Chi nhánh Cấp nước Hải Phòng 6','Ngõ 111 đường Lý Thánh Tông, P. Vạn Sơn, Q. Đồ Sơn, TP. Hải Phòng'),(6,'Chi nhánh Cấp nước Hải Phòng 7','LKhu 2 Lũng Đông, P. Đằng Hải, Q. Hải An, TP. Hải Phòng'),(7,'Chi nhánh Cấp nước Hải Phòng 8','TDP số 4, đường 361, P. Hưng Đạo, Q. Dương Kinh, TP. Hải Phòng'),(8,'Chi nhánh Cấp nước Cát Bà','Số 99 đường 1/4, Thị trấn Cát Bà, H. Cát Hải, TP. Hải Phòng'),(9,'Chi nhánh Cấp nước Vĩnh Bảo','Khu Bắc Hải, Thị trấn Vĩnh Bảo, H. Vĩnh Bảo, TP. Hải Phòng'),(10,'Tổ VH & KDNM Thủy Nguyên','Xã Ngũ Lão, H. Thủy Nguyên, TP. Hải Phòng'),(11,'Chi nhánh Nước Tinh khiết','Số 249 Tôn Đức Thắng, P. Lam Sơn, Q. Lê Chân, TP. Hải Phòng');
/*!40000 ALTER TABLE `dm_chinhanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_codongho`
--

DROP TABLE IF EXISTS `dm_codongho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_codongho` (
  `ma_co_dong_ho` int NOT NULL AUTO_INCREMENT,
  `ten_co_dong_ho` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ma_co_dong_ho`),
  UNIQUE KEY `ten_co_dong_ho` (`ten_co_dong_ho`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_codongho`
--

LOCK TABLES `dm_codongho` WRITE;
/*!40000 ALTER TABLE `dm_codongho` DISABLE KEYS */;
INSERT INTO `dm_codongho` VALUES (9,'D100'),(1,'D15'),(10,'D150'),(2,'D20'),(11,'D200'),(3,'D25'),(12,'D250'),(13,'D300'),(4,'D32'),(5,'D40'),(14,'D400'),(6,'D50'),(7,'D65'),(8,'D80');
/*!40000 ALTER TABLE `dm_codongho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_loaidongho`
--

DROP TABLE IF EXISTS `dm_loaidongho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_loaidongho` (
  `ma_loai_dong_ho` int NOT NULL AUTO_INCREMENT,
  `ten_loai_dong_ho` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ma_loai_dong_ho`),
  UNIQUE KEY `ten_loai_dong_ho` (`ten_loai_dong_ho`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_loaidongho`
--

LOCK TABLES `dm_loaidongho` WRITE;
/*!40000 ALTER TABLE `dm_loaidongho` DISABLE KEYS */;
INSERT INTO `dm_loaidongho` VALUES (1,'Lưu tốc'),(2,'Thể tích'),(3,'Turbine'),(4,'Điện từ');
/*!40000 ALTER TABLE `dm_loaidongho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_loaikhachhang`
--

DROP TABLE IF EXISTS `dm_loaikhachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_loaikhachhang` (
  `ma_loai_khach_hang` int NOT NULL AUTO_INCREMENT,
  `ten_loai_khach_hang` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ma_loai_khach_hang`),
  UNIQUE KEY `ten_loai_khach_hang` (`ten_loai_khach_hang`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_loaikhachhang`
--

LOCK TABLES `dm_loaikhachhang` WRITE;
/*!40000 ALTER TABLE `dm_loaikhachhang` DISABLE KEYS */;
INSERT INTO `dm_loaikhachhang` VALUES (5,'Hộ dân cư tại khu vực nông thôn'),(3,'Hộ dân cư tại khu vực đô thị'),(2,'Khách hàng hành chính sự nghiệp'),(1,'Khách hàng kinh doanh dịch vụ'),(6,'Khách hàng sản xuất'),(4,'Nhóm khách bình quân');
/*!40000 ALTER TABLE `dm_loaikhachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_nhacungcap`
--

DROP TABLE IF EXISTS `dm_nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_nhacungcap` (
  `ma_nha_cung_cap` int NOT NULL AUTO_INCREMENT,
  `ten_nha_cung_cap` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `dia_chi` text COLLATE utf8mb4_general_ci,
  `sdt` int DEFAULT NULL,
  PRIMARY KEY (`ma_nha_cung_cap`),
  UNIQUE KEY `ten_nha_cung_cap` (`ten_nha_cung_cap`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_nhacungcap`
--

LOCK TABLES `dm_nhacungcap` WRITE;
/*!40000 ALTER TABLE `dm_nhacungcap` DISABLE KEYS */;
INSERT INTO `dm_nhacungcap` VALUES (1,'Công ty TNHH PTP','AAA',NULL),(2,'Aichi Tokei Denki','BBB',NULL),(3,'Apator Powogaz S.A',NULL,NULL),(4,'Thổ Nhĩ Kỳ',NULL,NULL),(5,'Sensus',NULL,NULL),(6,'Việt Hồng Hà',NULL,NULL),(7,'Brazil',NULL,NULL),(8,'Công ty Phú Thịnh',NULL,NULL),(9,'Hawaco',NULL,NULL),(10,'Nhật',NULL,NULL),(11,'Vucico',NULL,NULL),(12,'Song Thanh',NULL,NULL),(13,'CTCPĐTTMXNK Phú Thái',NULL,NULL),(14,'CTCPCN Bách Việt',NULL,NULL),(15,'CTCPKT',NULL,NULL),(16,'DH',NULL,NULL),(17,'DVQLTT',NULL,NULL),(18,'HSO',NULL,NULL),(19,'CTTNHH Minh Khang',NULL,NULL);
/*!40000 ALTER TABLE `dm_nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_phuongxa`
--

DROP TABLE IF EXISTS `dm_phuongxa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_phuongxa` (
  `ma_phuong_xa` int NOT NULL AUTO_INCREMENT,
  `ten_phuong_xa` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ma_quan_huyen` int NOT NULL,
  PRIMARY KEY (`ma_phuong_xa`),
  UNIQUE KEY `ten_phuong_xa` (`ten_phuong_xa`),
  KEY `dm_phuongxa_ibfk_1` (`ma_quan_huyen`),
  CONSTRAINT `dm_phuongxa_ibfk_1` FOREIGN KEY (`ma_quan_huyen`) REFERENCES `dm_quanhuyen` (`ma_quan_huyen`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_phuongxa`
--

LOCK TABLES `dm_phuongxa` WRITE;
/*!40000 ALTER TABLE `dm_phuongxa` DISABLE KEYS */;
INSERT INTO `dm_phuongxa` VALUES (1,'Phường Hàng Kênh',1),(2,'Phường Dư Hàng Kênh',1),(3,'Phường An Biên',1),(4,'Phường An Dương',1),(5,'Phường Cát Dài',1),(6,'Phường Đông Hải',1),(7,'Phường Dư Hàng',1),(8,'Phường Hồ Nam',1),(9,'Phường Kênh Dương',1),(10,'Phường Lam Sơn',1),(11,'Phường Nghĩa Xá',1),(12,'Phường Niệm Nghĩa',1),(13,'Phường Trại Cau',1),(14,'Phường Trần Nguyên Hãn',1),(15,'Phường Vĩnh Niệm',1),(16,'Phường Anh Dũng',2),(17,'Phường Hải Thành',2),(18,'Phường Hoà Nghĩa',2),(19,'Phường Hưng Đạo',2),(20,'Phường Tân Thành',2),(21,'Phường Cầu Đất',3),(22,'Phường Cầu Tre',3),(23,'Phường Đằng Giang',3),(24,'Phường Đông Khê',3),(25,'Phường Đồng Quốc Bình',3),(26,'Phường Lạc Viên',3),(27,'Phường Gia Viên',3),(28,'Phường Lạch Tray',3),(29,'Phường Lê Lợi',3),(30,'Phường Máy Chai',3),(31,'Phường Máy Tơ',3),(32,'Phường Vạn Mỹ',3),(33,'Thị trấn Núi Đèo',4),(34,'Thị trấn Minh Đức',4),(35,'Xã An Lư',4),(36,'Xã An Sơn',4),(37,'Xã Cao Nhân',4),(38,'Xã Chính Mỹ',4),(39,'Xã Dương Quan',4),(40,'Xã Đông Sơn',4),(41,'Xã Gia Đức',4),(42,'Xã Gia Minh',4),(43,'Xã Hoa Động',4),(44,'Xã Hòa Bình - Thủy Nguyên',4),(45,'Xã Hoàng Động',4),(46,'Xã Hợp Thành',4),(47,'Xã Kênh Giang',4),(48,'Xã Kiền Bái',4),(49,'Xã Kỳ Sơn',4),(50,'Xã Lại Xuân',4),(51,'Xã Lâm Động',4),(52,'Xã Lập Lễ',4),(53,'Xã Liên Khê',4),(54,'Xã Lưu Kiếm',4),(55,'Xã Lưu Kỳ',4),(56,'Xã Minh Tân - Thủy Nguyên',4),(57,'Xã Mỹ Đồng',4),(58,'Xã Ngũ Lão',4),(59,'Xã Phả Lễ',4),(60,'Xã Phù Ninh',4),(61,'Xã Phục Lễ',4),(62,'Xã Quảng Thanh',4),(63,'Xã Tam Hưng',4),(64,'Xã Tân Dương',4),(65,'Xã Thiên Hương',4),(66,'Xã Thủy Đường',4),(67,'Xã Thủy Sơn',4),(68,'Xã Thủy Triều',4),(69,'Xã Trung Hà',4),(70,'Phường Bàng La',5),(71,'Phường Hải Sơn',5),(72,'Phường Hợp Đức',5),(73,'Phường Minh Đức',5),(74,'Phường Ngọc Xuyên',5),(75,'Phường Vạn Hương',5),(76,'Thị trấn An Dương',6),(77,'Xã An Đồng',6),(78,'Xã An Hòa - An Dương',6),(79,'Xã An Hồng',6),(80,'Xã An Hưng',6),(81,'Xã Bắc Sơn',6),(82,'Xã Đại Bản',6),(83,'Xã Đặng Cương',6),(84,'Xã Đồng Thái',6),(85,'Xã Hồng Phong',6),(86,'Xã Hồng Thái',6),(87,'Xã Lê Lợi',6),(88,'Xã Lê Thiện',6),(89,'Xã Nam Sơn',6),(90,'Xã Quốc Tuấn - An Dương',6),(91,'Xã Tân Tiến',6),(92,'Phường Bắc Sơn',7),(93,'Phường Đồng Hòa',7),(94,'Phường Lãm Hà',7),(95,'Phường Nam Sơn',7),(96,'Phường Ngọc Sơn',7),(97,'Phường Phù Liễn',7),(98,'Phường Quán Trữ',7),(99,'Phường Trần Thành Ngọ',7),(100,'Phường Tràng Minh',7),(101,'Phường Văn Đẩu',7),(102,'Thị trấn Tiên Lãng',8),(103,'Xã Bắc Hưng',8),(104,'Xã Bạch Đằng',8),(105,'Xã Cấp Tiến',8),(106,'Xã Đại Thắng',8),(107,'Xã Đoàn Lập',8),(108,'Xã Đông Hưng',8),(109,'Xã Hùng Thắng',8),(110,'Xã Khởi Nghĩa',8),(111,'Xã Kiến Thiết',8),(112,'Xã Nam Hưng',8),(113,'Xã Quang Phục',8),(114,'Xã Quyết Tiến',8),(115,'Xã Tây Hưng',8),(116,'Xã Tiên Cường',8),(117,'Xã Tiên Minh',8),(118,'Xã Tiên Thắng',8),(119,'Xã Tiên Thanh',8),(120,'Xã Toàn Thắng',8),(121,'Xã Tự Cường',8),(122,'Xã Vinh Quang - Tiên Lãng',8),(141,'Thị trấn Núi Đối',9),(142,'Xã Đại Đồng',9),(143,'Xã Đại Hà',9),(144,'Xã Đại Hợp',9),(145,'Xã Đoàn Xá',9),(146,'Xã Đông Phương',9),(147,'Xã Du Lễ',9),(148,'Xã Hữu Bằng',9),(149,'Xã Kiến Quốc',9),(150,'Xã Minh Tân - Kiến Thụy',9),(151,'Xã Ngũ Đoan',9),(152,'Xã Ngũ Phúc',9),(153,'Xã Tân Phong',9),(154,'Xã Tân Trào',9),(155,'Xã Thanh Sơn',9),(156,'Xã Thuận Thiên',9),(157,'Xã Thụy Hương',9),(158,'Xã Tú Sơn',9),(159,'Phường Hạ Lý',10),(160,'Phường Hoàng Văn Thụ',10),(161,'Phường Hùng Vương',10),(162,'Phường Minh Khai',10),(163,'Phường Phan Bội Châu',10),(164,'Phường Quán Toan',10),(165,'Phường Sở Dầu',10),(166,'Phường Thượng Lý',10),(167,'Phường Trại Chuối',10),(185,'Thị trấn An Lão',11),(186,'Thị trấn Trường Sơn',11),(187,'Xã An Thái',11),(188,'Xã An Thắng',11),(189,'Xã An Thọ',11),(190,'Xã An Tiến',11),(191,'Xã Bát Trang',11),(192,'Xã Chiến Thắng',11),(193,'Xã Mỹ Đức',11),(194,'Xã Quang Hưng',11),(195,'Xã Quang Trung',11),(196,'Xã Quốc Tuấn - An Lão',11),(197,'Xã Tân Dân',11),(198,'Xã Tân Viên',11),(199,'Xã Thái Sơn',11),(200,'Xã Trường Thành',11),(201,'Xã Trường Thọ',11),(202,'Thị trấn Cát Bà',12),(203,'Thị trấn Cát Hải',12),(204,'Xã Đồng Bài',12),(205,'Xã Gia Luận',12),(206,'Xã Hiền Hào',12),(207,'Xã Hoàng Châu',12),(208,'Xã Nghĩa Lộ',12),(209,'Xã Phù Long',12),(210,'Xã Trân Châu',12),(211,'Xã Văn Phong',12),(212,'Xã Việt Hải',12),(213,'Xã Xuân Đám',12),(214,'Phường Cát Bi',13),(215,'Phường Đằng Lâm',13),(216,'Phường Đằng Hải',13),(217,'Phường Đông Hải 1',13),(218,'Phường Đông Hải 2',13),(219,'Phường Nam Hải',13),(220,'Phường Thành Tô',13),(221,'Phường Tràng Cát',13),(312,'Thị trấn Vĩnh Bảo',14),(313,'Xã An Hòa - Vĩnh Bảo',14),(314,'Xã Cao Minh',14),(315,'Xã Cổ Am',14),(316,'Xã Cộng Hiền',14),(317,'Xã Đồng Minh',14),(318,'Xã Dũng Tiến',14),(319,'Xã Giang Biên',14),(320,'Xã Hiệp Hòa',14),(321,'Xã Hòa Bình - Vĩnh Bảo',14),(322,'Xã Hưng Nhân',14),(323,'Xã Hùng Tiến',14),(324,'Xã Liên Am',14),(325,'Xã Lý Học',14),(326,'Xã Nhân Hòa',14),(327,'Xã Tam Cường',14),(328,'Xã Tam Đa',14),(329,'Xã Tân Hưng',14),(330,'Xã Tân Liên',14),(331,'Xã Thắng Thủy',14),(332,'Xã Thanh Lương',14),(333,'Xã Tiền Phong',14),(334,'Xã Trấn Dương',14),(335,'Xã Trung Lập',14),(336,'Xã Việt Tiến',14),(337,'Xã Vĩnh An',14),(338,'Xã Vĩnh Long',14),(339,'Xã Vĩnh Phong',14),(340,'Xã Vinh Quang - Vĩnh Bảo',14),(341,'Xã Vĩnh Tiến',14),(342,'Huyện Bạch Long Vỹ',15);
/*!40000 ALTER TABLE `dm_phuongxa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_ptthanhtoan`
--

DROP TABLE IF EXISTS `dm_ptthanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_ptthanhtoan` (
  `ma_phuong_thuc` int NOT NULL AUTO_INCREMENT,
  `ten_phuong_thuc` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ma_phuong_thuc`),
  UNIQUE KEY `ten_phuong_thuc` (`ten_phuong_thuc`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_ptthanhtoan`
--

LOCK TABLES `dm_ptthanhtoan` WRITE;
/*!40000 ALTER TABLE `dm_ptthanhtoan` DISABLE KEYS */;
INSERT INTO `dm_ptthanhtoan` VALUES (3,'Chuyển khoản qua MOMO'),(1,'Chuyển khoản qua ngân hàng'),(2,'Chuyển khoản qua VNPay'),(6,'Nộp tại địa điểm được ủy quyền'),(5,'Tiền mặt'),(4,'Ủy thác thanh toán định kỳ qua ngân hàng');
/*!40000 ALTER TABLE `dm_ptthanhtoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_quanhuyen`
--

DROP TABLE IF EXISTS `dm_quanhuyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_quanhuyen` (
  `ma_quan_huyen` int NOT NULL AUTO_INCREMENT,
  `ten_quan_huyen` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ma_quan_huyen`),
  UNIQUE KEY `ten_quan_huyen` (`ten_quan_huyen`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_quanhuyen`
--

LOCK TABLES `dm_quanhuyen` WRITE;
/*!40000 ALTER TABLE `dm_quanhuyen` DISABLE KEYS */;
INSERT INTO `dm_quanhuyen` VALUES (6,'Huyện An Dương'),(11,'Huyện An Lão'),(15,'Huyện Bạch Long Vỹ'),(12,'Huyện Cát Hải'),(9,'Huyện Kiến Thụy'),(4,'Huyện Thủy Nguyên'),(8,'Huyện Tiên Lãng'),(14,'Huyện Vĩnh Bảo'),(2,'Quận Dương Kinh'),(13,'Quận Hải An'),(10,'Quận Hồng Bàng'),(7,'Quận Kiến An'),(1,'Quận Lê Chân'),(3,'Quận Ngô Quyền'),(5,'Quận Đồ Sơn');
/*!40000 ALTER TABLE `dm_quanhuyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_quyen`
--

DROP TABLE IF EXISTS `dm_quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_quyen` (
  `ma_quyen` int NOT NULL AUTO_INCREMENT,
  `ten_quyen` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `trang_thai` int NOT NULL,
  PRIMARY KEY (`ma_quyen`),
  UNIQUE KEY `ten_quyen` (`ten_quyen`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_quyen`
--

LOCK TABLES `dm_quyen` WRITE;
/*!40000 ALTER TABLE `dm_quyen` DISABLE KEYS */;
INSERT INTO `dm_quyen` VALUES (1,'Quản trị viên',1),(2,'QLDM địa bàn',1),(5,'QLDM đồng hồ',1),(6,'QLDM khách hàng',1),(7,'QL báo cáo',1),(8,'QL đồng hồ',1),(14,'QL ghi chỉ số đồng hồ',1),(15,'QL khách hàng',1),(16,'QL hợp đồng',1),(17,'QL hóa đơn',1),(18,'QL giá',1);
/*!40000 ALTER TABLE `dm_quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_toquanly`
--

DROP TABLE IF EXISTS `dm_toquanly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_toquanly` (
  `ma_to_quan_ly` int NOT NULL AUTO_INCREMENT,
  `ten_to_quan_ly` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ma_chi_nhanh` int NOT NULL,
  PRIMARY KEY (`ma_to_quan_ly`),
  KEY `ma_chi_nhanh` (`ma_chi_nhanh`),
  CONSTRAINT `dm_toquanly_ibfk_1` FOREIGN KEY (`ma_chi_nhanh`) REFERENCES `dm_chinhanh` (`ma_chi_nhanh`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_toquanly`
--

LOCK TABLES `dm_toquanly` WRITE;
/*!40000 ALTER TABLE `dm_toquanly` DISABLE KEYS */;
INSERT INTO `dm_toquanly` VALUES (1,'Tổ 1 - HP3',1),(2,'Tổ 2 - HP3',1),(3,'Tổ 3 - HP3',1),(4,'Tổ 4 - HP3',1),(5,'Tổ 5 - HP3',1),(6,'Tổ 1 - TT',2),(7,'Tổ 2 - TT',2),(8,'Tổ 3 - TT',2),(9,'Tổ 4 - TT',2),(10,'Tổ 5 - TT',2),(11,'Tổ 5 - HP4',3),(12,'Tổ 4 - HP4',3),(13,'Tổ 3 - HP4',3),(14,'Tổ 2 - HP4',3),(15,'Tổ 1 - HP4',3),(16,'Tổ 1 - HP5',4),(17,'Tổ 2 - HP5',4),(18,'Tổ 3 - HP5',4),(19,'Tổ 4 - HP5',4),(20,'Tổ 5 - HP5',4),(21,'Tổ 5 - HP6',5),(22,'Tổ 4 - HP6',5),(23,'Tổ 3 - HP6',5),(24,'Tổ 2 - HP6',5),(25,'Tổ 1 - HP6',5),(26,'Tổ 1 - HP7',6),(27,'Tổ 2 - HP7',6),(28,'Tổ 3 - HP7',6),(29,'Tổ 4 - HP7',6),(30,'Tổ 5 - HP7',6),(31,'Tổ 5 - HP8',7),(32,'Tổ 4 - HP8',7),(33,'Tổ 3 - HP8',7),(34,'Tổ 2 - HP8',7),(35,'Tổ 1 - HP8',7),(36,'Tổ 1 - CB',8),(37,'Tổ 2 - CB',8),(38,'Tổ 3 - CB',8),(39,'Tổ 4 - CB',8),(40,'Tổ 5 - CB',8),(41,'Tổ 5 - VB',9),(42,'Tổ 4 - VB',9),(43,'Tổ 3 - VB',9),(44,'Tổ 2 - VB',9),(45,'Tổ 1 - VB',9),(46,'Tổ 1 - TN',10),(47,'Tổ 2 - TN',10),(48,'Tổ 3 - TN',10),(49,'Tổ 4 - TN',10),(50,'Tổ 5 - TN',10),(51,'Tổ 5 - NTK',11),(52,'Tổ 4 - NTK',11),(53,'Tổ 3 - NTK',11),(54,'Tổ 2 - NTK',11),(55,'Tổ 1 - NTK',11);
/*!40000 ALTER TABLE `dm_toquanly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dm_tuyendoc`
--

DROP TABLE IF EXISTS `dm_tuyendoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dm_tuyendoc` (
  `ma_tuyen` int NOT NULL AUTO_INCREMENT,
  `ten_tuyen` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `trang_thai` int NOT NULL,
  `ma_phuong_xa` int NOT NULL,
  `ma_to_quan_ly` int NOT NULL,
  PRIMARY KEY (`ma_tuyen`),
  KEY `ma_phuong_xa` (`ma_phuong_xa`),
  KEY `ma_to_quan_ly` (`ma_to_quan_ly`),
  CONSTRAINT `dm_tuyendoc_ibfk_1` FOREIGN KEY (`ma_phuong_xa`) REFERENCES `dm_phuongxa` (`ma_phuong_xa`) ON UPDATE CASCADE,
  CONSTRAINT `dm_tuyendoc_ibfk_2` FOREIGN KEY (`ma_to_quan_ly`) REFERENCES `dm_toquanly` (`ma_to_quan_ly`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dm_tuyendoc`
--

LOCK TABLES `dm_tuyendoc` WRITE;
/*!40000 ALTER TABLE `dm_tuyendoc` DISABLE KEYS */;
INSERT INTO `dm_tuyendoc` VALUES (1,'Tuyến Hàng Kênh 1',1,1,1),(2,'Tuyến Hàng Kênh 2',1,1,2),(3,'Tuyến Hàng Kênh 3',1,1,3),(4,'Tuyến Hàng Kênh 4',1,1,4),(5,'Tuyến Hàng Kênh 5',1,1,5),(6,'Tuyến Dư Hàng Kênh 1',1,2,1),(7,'Tuyến Dư Hàng Kênh 2',1,2,2),(8,'Tuyến Dư Hàng Kênh 3',1,2,3),(9,'Tuyến Dư Hàng Kênh 4',1,2,4),(10,'Tuyến Dư Hàng Kênh 5',1,2,5),(11,'Tuyến Dư Hàng Kênh 2',1,2,2),(12,'Tuyến Dư Hàng Kênh 3',1,2,3),(13,'Tuyến Dư Hàng Kênh 4',1,2,4),(14,'Tuyến Dư Hàng Kênh 5',1,2,5),(15,'Tuyến An Biên 1',1,3,1),(16,'Tuyến An Biên 2',1,3,2),(17,'Tuyến An Biên 3',1,3,3),(18,'Tuyến An Biên 4',1,3,4),(19,'Tuyến An Biên 5',1,3,5),(20,'Tuyến An Dương 1',1,4,1),(21,'Tuyến An Dương 2',1,4,2),(22,'Tuyến An Dương 3',0,4,3),(23,'Tuyến An Dương 4',0,4,4),(24,'Tuyến An Dương 5',0,4,5),(25,'Tuyến Cát Dài 1',0,5,1),(26,'Tuyến Cát Dài 2',0,5,2),(27,'Tuyến Cát Dài 3',0,5,3),(28,'Tuyến Cát Dài 4',0,5,4),(29,'Tuyến Cát Dài 5',0,5,5),(30,'Tuyến Đông Hải 1',0,6,1),(31,'Tuyến Đông Hải 2',0,6,2),(32,'Tuyến Đông Hải 3',0,6,3),(33,'Tuyến Đông Hải 4',0,6,4),(34,'Tuyến Đông Hải 5',0,6,5),(35,'Tuyến Dư Hàng 1',0,7,1),(36,'Tuyến Dư Hàng 2',0,7,2),(37,'Tuyến Dư Hàng 3',0,7,3),(38,'Tuyến Dư Hàng 4',0,7,4),(39,'Tuyến Dư Hàng 5',0,7,5),(40,'Tuyến Hồ Nam 1',0,8,1),(41,'Tuyến Hồ Nam 2',0,8,2),(42,'Tuyến Hồ Nam 3',0,8,3),(43,'Tuyến Hồ Nam 4',0,8,4),(44,'Tuyến Hồ Nam 5',0,8,5),(45,'Tuyến Kênh Dương 1',0,9,6),(46,'Tuyến Kênh Dương 2',0,9,7),(47,'Tuyến Kênh Dương 3',0,9,8),(48,'Tuyến Kênh Dương 4',0,9,9),(49,'Tuyến Kênh Dương 5',0,9,10),(50,'Tuyến Lam Sơn 1',0,10,6),(51,'Tuyến Lam Sơn 2',0,10,7),(52,'Tuyến Lam Sơn 3',0,10,8),(53,'Tuyến Lam Sơn 4',0,10,9),(54,'Tuyến Lam Sơn 5',0,10,10),(55,'Tuyến Nghĩa Xá 1',0,11,6),(56,'Tuyến Nghĩa Xá 2',0,11,7),(57,'Tuyến Nghĩa Xá 3',0,11,8),(58,'Tuyến Nghĩa Xá 4',0,11,9),(59,'Tuyến Nghĩa Xá 5',0,11,10),(60,'Tuyến Niệm Nghĩa 1',0,12,6),(61,'Tuyến Niệm Nghĩa 2',0,12,7),(62,'Tuyến Niệm Nghĩa 3',0,12,8),(63,'Tuyến Niệm Nghĩa 4',0,12,9),(64,'Tuyến Niệm Nghĩa 5',0,12,10);
/*!40000 ALTER TABLE `dm_tuyendoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_general_ci NOT NULL,
  `queue` text COLLATE utf8mb4_general_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `attempts` tinyint NOT NULL,
  `reserved_at` int DEFAULT NULL,
  `available_at` int NOT NULL,
  `created_at` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `queue` (`queue`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'default','{\"uuid\":\"b492ded6-de39-4b98-a43c-40c1f63632e4\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":1:{s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2024-05-22 10:07:07.659835\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}',0,NULL,1716372427,1716372367),(2,'default','{\"uuid\":\"40f9e069-76db-4946-9582-0af5dcb8dab3\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716372433,1716372433),(3,'default','{\"uuid\":\"f0f5f19f-edf8-45cb-b9f7-0f14984c5ee2\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716372527,1716372527),(4,'default','{\"uuid\":\"d9cf74c2-1a95-4070-964e-dc89c7dd4bcb\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716372569,1716372569),(5,'default','{\"uuid\":\"396b25d1-4e90-4799-aaaf-c407284546c2\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716372629,1716372629),(6,'default','{\"uuid\":\"cbc58c7a-b1b0-4e99-b541-1b9c3fd94b3f\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716372657,1716372657),(7,'default','{\"uuid\":\"721ee363-211a-4969-b574-40a0e3fb4ce7\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716372815,1716372815),(8,'default','{\"uuid\":\"7f223c90-76f0-4140-ac5c-cf7295197905\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716372886,1716372886),(9,'default','{\"uuid\":\"9efdd27a-0ad1-4f8f-a040-b12fe1344a2f\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716373339,1716373339),(10,'default','{\"uuid\":\"25993c30-96a3-4be5-9933-6b470c062da3\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":1:{s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2024-05-22 10:40:01.182673\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}',0,NULL,1716374401,1716374341),(11,'default','{\"uuid\":\"63b8ba98-bb70-47df-b710-0713d065ade9\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":1:{s:5:\\\"delay\\\";O:25:\\\"Illuminate\\\\Support\\\\Carbon\\\":3:{s:4:\\\"date\\\";s:26:\\\"2024-05-22 10:43:08.903763\\\";s:13:\\\"timezone_type\\\";i:3;s:8:\\\"timezone\\\";s:3:\\\"UTC\\\";}}\"}}',0,NULL,1716374588,1716374528),(12,'default','{\"uuid\":\"02c078bc-9b54-4943-8962-0c8b5c0fc4f9\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":0:{}\"}}',0,NULL,1716374547,1716374547),(13,'default','{\"uuid\":\"c391fb77-2ce9-464d-bb1a-3a54953f1165\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":2:{s:12:\\\"\\u0000*\\u0000thong_tin\\\";a:1:{s:5:\\\"check\\\";s:4:\\\"hien\\\";}s:13:\\\"\\u0000*\\u0000khach_hang\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:27:\\\"App\\\\Models\\\\QLKhachHangModel\\\";s:2:\\\"id\\\";a:1:{i:0;i:1;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"}}',0,NULL,1716375172,1716375172),(14,'default','{\"uuid\":\"706627fc-8ef8-474d-b05f-afb9361333fa\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":2:{s:12:\\\"\\u0000*\\u0000thong_tin\\\";a:1:{s:5:\\\"check\\\";s:4:\\\"hien\\\";}s:13:\\\"\\u0000*\\u0000khach_hang\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:27:\\\"App\\\\Models\\\\QLKhachHangModel\\\";s:2:\\\"id\\\";a:1:{i:0;i:1;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"}}',0,NULL,1716375325,1716375325),(15,'default','{\"uuid\":\"c6c56b58-fe29-40f9-bb18-cb5a76c9e76c\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":2:{s:12:\\\"\\u0000*\\u0000thong_tin\\\";a:1:{s:5:\\\"check\\\";s:4:\\\"hien\\\";}s:13:\\\"\\u0000*\\u0000khach_hang\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:27:\\\"App\\\\Models\\\\QLKhachHangModel\\\";s:2:\\\"id\\\";a:1:{i:0;i:1;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"}}',0,NULL,1716375389,1716375389),(16,'default','{\"uuid\":\"2a920ea2-62f2-4450-95b3-ce0a7765195e\",\"displayName\":\"App\\\\Jobs\\\\GuiMailJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\GuiMailJob\",\"command\":\"O:19:\\\"App\\\\Jobs\\\\GuiMailJob\\\":2:{s:12:\\\"\\u0000*\\u0000thong_tin\\\";a:1:{s:5:\\\"check\\\";s:4:\\\"hien\\\";}s:13:\\\"\\u0000*\\u0000khach_hang\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:27:\\\"App\\\\Models\\\\QLKhachHangModel\\\";s:2:\\\"id\\\";a:1:{i:0;i:1;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"}}',0,NULL,1716376880,1716376880);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ls_donghokhoi`
--

DROP TABLE IF EXISTS `ls_donghokhoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ls_donghokhoi` (
  `ma_lich_su` int NOT NULL AUTO_INCREMENT,
  `ky_chi_so` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tu_ngay` date NOT NULL,
  `den_ngay` date NOT NULL,
  `khoa` int NOT NULL,
  `chi_so_cu` int NOT NULL,
  `chi_so_moi` int NOT NULL,
  `so_tieu_thu` int NOT NULL,
  `ma_lap_dat` int NOT NULL,
  PRIMARY KEY (`ma_lich_su`),
  KEY `ma_lap_dat` (`ma_lap_dat`),
  CONSTRAINT `ls_donghokhoi_ibfk_1` FOREIGN KEY (`ma_lap_dat`) REFERENCES `ql_lapdatdhkhoi` (`ma_lap_dat`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ls_donghokhoi`
--

LOCK TABLES `ls_donghokhoi` WRITE;
/*!40000 ALTER TABLE `ls_donghokhoi` DISABLE KEYS */;
INSERT INTO `ls_donghokhoi` VALUES (6,'T1 - 2024','2024-01-01','2024-01-31',1,0,10,10,3),(7,'T2 - 2024','2024-02-01','2024-02-29',0,10,25,15,3),(8,'T1 - 2024','2024-01-01','2024-01-31',0,0,25,25,4),(9,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,5),(10,'T2 - 2024','2024-02-01','2024-02-29',0,15,16,1,5),(11,'T3 - 2024','2024-03-02','2024-03-31',1,0,16,16,7),(12,'T4 - 2024','2024-04-01','2024-04-30',1,16,25,9,7),(13,'T5 - 2024','2024-05-01','2024-05-31',0,25,30,5,7),(14,'T2 - 2022','2022-02-01','2022-02-28',1,0,100,100,8),(15,'T2 - 2022','2022-02-01','2022-02-28',1,0,200,200,9),(16,'T3 - 2022','2022-03-01','2022-03-31',1,100,350,350,8),(19,'T4 - 2022','2022-04-01','2022-04-30',1,350,400,0,8),(20,'T1 - 2024','2024-01-01','2024-01-31',1,400,400,0,8),(21,'T1 - 2024','2024-01-01','2024-01-31',1,0,431,431,11),(22,'T1 - 2024','2024-01-01','2024-01-31',1,200,452,252,9),(23,'T1 - 2024','2024-01-01','2024-01-31',1,0,467,467,10),(24,'T1 - 2024','2024-01-01','2024-01-31',1,0,340,340,12),(25,'T1 - 2024','2024-01-01','2024-01-31',1,0,503,503,13),(26,'T1 - 2024','2024-01-01','2024-01-31',1,0,400,400,14),(27,'T2 - 2024','2024-02-01','2024-02-29',1,400,500,100,8),(28,'T2 - 2024','2024-02-01','2024-02-29',1,452,520,68,9),(29,'T2 - 2024','2024-02-01','2024-02-29',1,467,530,63,10),(30,'T2 - 2024','2024-02-01','2024-02-29',1,431,580,149,11),(31,'T2 - 2024','2024-02-01','2024-02-29',1,340,580,240,12),(32,'T2 - 2024','2024-02-01','2024-02-29',1,503,580,77,13),(33,'T2 - 2024','2024-02-01','2024-02-29',1,400,550,150,14),(34,'T2 - 2024','2024-02-01','2024-02-29',1,0,550,550,15),(35,'T2 - 2024','2024-02-01','2024-02-29',1,0,400,400,16),(36,'T2 - 2024','2024-02-01','2024-02-29',1,0,400,400,17),(37,'T2 - 2024','2024-02-01','2024-02-29',1,0,405,405,18),(38,'T2 - 2024','2024-02-01','2024-02-29',1,0,405,405,19),(39,'T2 - 2024','2024-02-01','2024-02-29',1,0,450,450,20),(40,'T2 - 2024','2024-02-01','2024-02-29',0,0,450,450,21),(41,'T2 - 2024','2024-02-01','2024-02-29',0,0,452,452,22),(42,'T2 - 2024','2024-02-01','2024-02-29',0,0,452,452,23),(43,'T2 - 2024','2024-02-01','2024-02-29',0,0,540,540,24),(44,'T2 - 2024','2024-02-01','2024-02-29',0,0,600,600,25),(45,'T2 - 2024','2024-02-01','2024-02-29',0,0,700,700,27),(46,'T3 - 2024','2024-03-01','2024-03-31',1,500,800,300,8),(47,'T3 - 2024','2024-03-01','2024-03-31',1,520,800,280,9),(48,'T3 - 2024','2024-03-01','2024-03-31',1,530,800,270,10),(49,'T3 - 2024','2024-03-01','2024-03-31',1,580,800,220,11),(50,'T3 - 2024','2024-03-01','2024-03-31',1,580,850,270,12),(51,'T3 - 2024','2024-03-01','2024-03-31',1,580,850,270,13),(52,'T3 - 2024','2024-03-01','2024-03-31',1,550,850,300,14),(53,'T3 - 2024','2024-03-01','2024-03-31',1,550,870,320,15),(54,'T3 - 2024','2024-03-01','2024-03-31',1,400,875,475,16),(55,'T3 - 2024','2024-03-01','2024-03-31',1,400,877,477,17),(56,'T3 - 2024','2024-03-01','2024-03-31',1,405,877,472,18),(57,'T3 - 2024','2024-03-01','2024-03-31',1,405,877,472,19),(58,'T3 - 2024','2024-03-01','2024-03-31',1,450,877,427,20),(59,'T4 - 2024','2024-04-01','2024-04-30',1,800,1200,400,8),(60,'T4 - 2024','2024-04-01','2024-04-30',1,800,1200,400,9),(61,'T4 - 2024','2024-04-01','2024-04-30',1,800,1200,400,10),(62,'T4 - 2024','2024-04-01','2024-04-30',1,800,1200,400,11),(63,'T4 - 2024','2024-04-01','2024-04-30',1,850,1200,350,12),(64,'T4 - 2024','2024-04-01','2024-04-30',1,850,1254,404,13),(65,'T4 - 2024','2024-04-01','2024-04-30',1,850,1254,404,14),(66,'T4 - 2024','2024-04-01','2024-04-30',1,870,1267,397,15),(67,'T4 - 2024','2024-04-01','2024-04-30',1,875,1276,401,16),(68,'T4 - 2024','2024-04-01','2024-04-30',1,877,1276,399,17),(69,'T4 - 2024','2024-04-01','2024-04-30',1,877,1354,477,18),(70,'T4 - 2024','2024-04-01','2024-04-30',1,877,1354,477,19),(71,'T4 - 2024','2024-04-01','2024-04-30',1,877,1354,477,20),(72,'T5 - 2024','2024-05-01','2024-05-31',0,1200,1600,400,8),(73,'T5 - 2024','2024-05-01','2024-05-31',0,1200,1600,400,9),(74,'T5 - 2024','2024-05-01','2024-05-31',0,1200,1600,400,10),(75,'T5 - 2024','2024-05-01','2024-05-31',0,1200,1654,454,11),(76,'T5 - 2024','2024-05-01','2024-05-31',0,1200,1654,454,12),(77,'T5 - 2024','2024-05-01','2024-05-31',0,1254,1667,413,13),(78,'T5 - 2024','2024-05-01','2024-05-31',0,1254,1667,413,14),(79,'T5 - 2024','2024-05-01','2024-05-31',0,1267,1667,400,15),(80,'T5 - 2024','2024-05-01','2024-05-31',0,1276,1666,390,16),(81,'T5 - 2024','2024-05-01','2024-05-31',0,1276,1666,390,17),(82,'T5 - 2024','2024-05-01','2024-05-31',0,1354,1765,411,18),(83,'T5 - 2024','2024-05-01','2024-05-31',0,1354,1765,411,19),(84,'T5 - 2024','2024-05-01','2024-05-31',0,1354,1765,411,20);
/*!40000 ALTER TABLE `ls_donghokhoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_donghokhach`
--

DROP TABLE IF EXISTS `ql_donghokhach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_donghokhach` (
  `ma_dong_ho` int NOT NULL AUTO_INCREMENT,
  `ten_dong_ho` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tinh_trang` int NOT NULL,
  `nam_san_xuat` int NOT NULL,
  `so_seri` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_nhap` date NOT NULL,
  `ngay_kiem_dinh` date NOT NULL,
  `so_nam_hieu_luc` int NOT NULL,
  `so_thang_bao_hanh` int NOT NULL,
  `ma_loai_dong_ho` int NOT NULL,
  `ma_nha_cung_cap` int NOT NULL,
  `ma_co_dong_ho` int NOT NULL,
  PRIMARY KEY (`ma_dong_ho`),
  UNIQUE KEY `ten_dong_ho` (`ten_dong_ho`),
  UNIQUE KEY `so_seri` (`so_seri`),
  KEY `ma_co_dong_ho` (`ma_co_dong_ho`),
  KEY `ma_loai_dong_ho` (`ma_loai_dong_ho`),
  KEY `ma_nha_cung_cap` (`ma_nha_cung_cap`),
  CONSTRAINT `ql_donghokhach_ibfk_1` FOREIGN KEY (`ma_co_dong_ho`) REFERENCES `dm_codongho` (`ma_co_dong_ho`) ON UPDATE CASCADE,
  CONSTRAINT `ql_donghokhach_ibfk_2` FOREIGN KEY (`ma_loai_dong_ho`) REFERENCES `dm_loaidongho` (`ma_loai_dong_ho`) ON UPDATE CASCADE,
  CONSTRAINT `ql_donghokhach_ibfk_3` FOREIGN KEY (`ma_nha_cung_cap`) REFERENCES `dm_nhacungcap` (`ma_nha_cung_cap`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_donghokhach`
--

LOCK TABLES `ql_donghokhach` WRITE;
/*!40000 ALTER TABLE `ql_donghokhach` DISABLE KEYS */;
INSERT INTO `ql_donghokhach` VALUES (1,'Đồng hồ 1',1,2022,'00000000001','2022-01-01','2022-01-01',5,24,2,7,2),(2,'Đồng hồ 2',1,2022,'00000000002','2022-01-01','2022-01-01',10,24,1,2,1),(3,'Đồng hồ 3',1,2022,'00000000003','2022-01-01','2022-01-02',8,8,1,15,1),(4,'Đồng hồ 4',1,2022,'00000000004','2024-02-01','2024-02-02',5,50,1,2,1),(5,'Đồng hồ 5',0,2022,'0000000005','2024-02-01','2024-02-02',5,50,1,2,1),(6,'Đồng hồ 6',1,2022,'0000000006','2024-02-01','2024-02-02',5,50,1,2,1),(7,'Đồng hồ 7',1,2022,'0000000007','2024-02-01','2024-02-02',5,50,1,2,1),(8,'Đồng hồ 8',1,2022,'0000000008','2024-02-01','2024-02-02',5,50,1,2,1),(9,'Đồng hồ 9',1,2022,'0000000009','2024-02-01','2024-02-02',5,50,1,2,1),(10,'Đồng hồ 10',1,2022,'0000000010','2024-02-01','2024-02-02',5,50,1,2,1),(11,'Đồng hồ 11',1,2022,'0000000011','2024-02-01','2024-02-02',5,50,1,2,1),(12,'Đồng hồ 12',1,2022,'0000000012','2024-02-01','2024-02-02',5,50,1,2,1),(13,'Đồng hồ 13',1,2022,'0000000013','2024-02-01','2024-02-02',5,50,1,2,1),(14,'Đồng hồ 14',1,2022,'0000000014','2024-02-01','2024-02-02',5,50,1,2,1),(15,'Đồng hồ 15',1,2022,'0000000015','2024-02-01','2024-02-02',5,50,1,2,1),(16,'Đồng hồ 16',1,2022,'0000000016','2024-02-01','2024-02-02',5,50,1,2,1),(17,'Đồng hồ 17',1,2022,'0000000017','2024-02-01','2024-02-02',5,50,1,2,1),(18,'Đồng hồ 18',1,2022,'0000000018','2024-02-01','2024-02-02',5,50,1,2,1),(19,'Đồng hồ 19',1,2022,'0000000019','2024-02-01','2024-02-02',5,50,1,2,1),(20,'Đồng hồ 20',1,2022,'0000000020','2024-02-01','2024-02-02',5,50,1,2,1);
/*!40000 ALTER TABLE `ql_donghokhach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_donghokhoi`
--

DROP TABLE IF EXISTS `ql_donghokhoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_donghokhoi` (
  `ma_dong_ho` int NOT NULL AUTO_INCREMENT,
  `ten_dong_ho` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tinh_trang` int NOT NULL,
  `ngay_nhap` date NOT NULL,
  `ngay_kiem_dinh` date NOT NULL,
  `so_nam_hieu_luc` int NOT NULL,
  `so_thang_bao_hanh` int NOT NULL,
  `ma_loai_dong_ho` int NOT NULL,
  `ma_nha_cung_cap` int NOT NULL,
  `ma_co_dong_ho` int NOT NULL,
  PRIMARY KEY (`ma_dong_ho`),
  UNIQUE KEY `ten_dong_ho` (`ten_dong_ho`),
  KEY `ma_co_dong_ho` (`ma_co_dong_ho`),
  KEY `ma_loai_dong_ho` (`ma_loai_dong_ho`),
  KEY `ma_nha_cung_cap` (`ma_nha_cung_cap`),
  CONSTRAINT `ql_donghokhoi_ibfk_1` FOREIGN KEY (`ma_co_dong_ho`) REFERENCES `dm_codongho` (`ma_co_dong_ho`) ON UPDATE CASCADE,
  CONSTRAINT `ql_donghokhoi_ibfk_2` FOREIGN KEY (`ma_loai_dong_ho`) REFERENCES `dm_loaidongho` (`ma_loai_dong_ho`) ON UPDATE CASCADE,
  CONSTRAINT `ql_donghokhoi_ibfk_3` FOREIGN KEY (`ma_nha_cung_cap`) REFERENCES `dm_nhacungcap` (`ma_nha_cung_cap`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_donghokhoi`
--

LOCK TABLES `ql_donghokhoi` WRITE;
/*!40000 ALTER TABLE `ql_donghokhoi` DISABLE KEYS */;
INSERT INTO `ql_donghokhoi` VALUES (3,'Đồng hồ khối 1',0,'2023-10-10','2023-10-20',4,24,1,2,2),(4,'Đồng hồ khối 2',0,'2023-10-10','2023-10-20',3,12,2,1,2),(5,'Đồng hồ khối 3',0,'2023-10-10','2023-10-20',5,12,2,2,1),(6,'Đồng hồ khối 4',1,'2023-10-10','2023-10-20',5,12,2,2,1),(7,'Đồng hồ khối 5',1,'2022-01-01','2022-01-01',1,1,2,2,6),(8,'Đồng hồ khối 6',1,'2022-01-01','2022-01-01',9,9,4,5,12),(9,'Đồng hồ khối 7',1,'2022-01-01','2022-01-01',9,9,4,1,8),(10,'Đồng hồ khối 8',1,'2022-01-01','2022-01-01',9,9,4,1,13),(11,'Đồng hồ khối 9',1,'2022-01-01','2022-01-02',9,9,4,2,13),(12,'Đồng hồ khối 10',1,'2022-01-01','2022-01-01',9,10,3,6,14),(13,'Đồng hồ khối 11',1,'2022-01-01','2022-01-01',9,10,3,6,14),(14,'Đồng hồ khối 12',1,'2022-01-01','2022-01-01',9,10,3,2,13),(15,'Đồng hồ khối 13',1,'2022-01-01','2022-01-01',9,10,3,2,13),(16,'Đồng hồ khối 14',1,'2022-01-01','2022-01-01',9,10,4,12,12),(17,'Đồng hồ khối 15',1,'2022-01-01','2022-01-01',9,10,4,12,12),(18,'Đồng hồ khối 16',1,'2022-01-01','2022-01-01',9,10,4,12,12),(19,'Đồng hồ khối 17',1,'2022-01-01','2022-01-01',9,10,4,10,14),(20,'Đồng hồ khối 18',1,'2022-01-01','2022-01-01',9,10,4,10,14),(21,'Đồng hồ khối 19',1,'2022-01-01','2022-01-01',9,10,4,10,14),(22,'Đồng hồ khối 20',1,'2022-01-01','2022-01-01',9,10,4,10,14),(23,'Đồng hồ khối 22',1,'2022-01-01','2022-01-01',9,10,4,10,14),(24,'Đồng hồ khối 23',1,'2022-01-01','2022-01-01',9,10,4,10,14),(25,'Đồng hồ khối 24',1,'2022-01-01','2022-01-01',9,10,4,10,14),(26,'Đồng hồ khối 25',1,'2022-01-01','2022-01-01',9,10,4,10,14),(27,'Đồng hồ khối 26',1,'2022-01-01','2022-01-01',9,10,4,10,14),(28,'Đồng hồ khối 27',1,'2022-01-01','2022-01-01',9,10,4,10,14),(29,'Đồng hồ khối 28',1,'2022-01-01','2022-01-01',9,10,4,10,14),(30,'Đồng hồ khối 29',0,'2022-01-01','2022-01-01',9,10,4,10,14),(31,'Đồng hồ khối 30',0,'2022-01-01','2022-01-01',9,10,4,10,14);
/*!40000 ALTER TABLE `ql_donghokhoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_hoadon`
--

DROP TABLE IF EXISTS `ql_hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_hoadon` (
  `ma_hoa_don` int NOT NULL AUTO_INCREMENT,
  `ky_hoa_don` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tu_ngay` date NOT NULL,
  `den_ngay` date NOT NULL,
  `khoa` int NOT NULL,
  `chi_so_cu` int NOT NULL,
  `chi_so_moi` int NOT NULL,
  `so_tieu_thu` int NOT NULL,
  `tong_tien_thue` double NOT NULL,
  `tong_tien_truoc_thue` double NOT NULL,
  `tong_cong` double NOT NULL,
  `trang_thai` int NOT NULL,
  `ma_phuong_thuc` int DEFAULT NULL,
  `ma_lap_dat` int NOT NULL,
  PRIMARY KEY (`ma_hoa_don`),
  KEY `ma_hop_dong` (`ma_lap_dat`),
  KEY `ma_phuong_thuc` (`ma_phuong_thuc`),
  CONSTRAINT `ql_hoadon_ibfk_3` FOREIGN KEY (`ma_phuong_thuc`) REFERENCES `dm_ptthanhtoan` (`ma_phuong_thuc`) ON UPDATE CASCADE,
  CONSTRAINT `ql_hoadon_ibfk_4` FOREIGN KEY (`ma_lap_dat`) REFERENCES `ql_lapdatdhkhach` (`ma_lap_dat`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_hoadon`
--

LOCK TABLES `ql_hoadon` WRITE;
/*!40000 ALTER TABLE `ql_hoadon` DISABLE KEYS */;
INSERT INTO `ql_hoadon` VALUES (3,'T1 - 2022','2022-01-01','2022-01-31',1,0,30,30,18207.504,364150.08,345942.576,0,NULL,4),(5,'T1 - 2022','2022-01-01','2022-01-31',1,0,10,10,5572.476,111449.52,105877.044,0,NULL,3),(6,'T2 - 2022','2022-02-01','2022-02-28',1,10,20,10,5572.476,111449.52,105877.044,0,NULL,3),(7,'T2 - 2022','2022-02-01','2022-02-28',1,30,40,10,4619.916,92398.32,87778.404,0,NULL,4),(8,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,7511.616,150232.32,157743.936,0,NULL,5),(9,'T2 - 2024','2024-02-01','2024-02-28',1,15,30,15,7511.616,150232.32,157743.936,0,NULL,5),(10,'T1 - 2024','2024-01-01','2024-01-31',1,0,16,16,13063.68,261273.6,274337.28,0,NULL,6),(11,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,7),(12,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,8),(13,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,9),(14,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,10),(15,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,11),(16,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,12),(17,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,13),(18,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,14),(19,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,15),(20,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,16329.6,326592,342921.6,0,NULL,16),(21,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,8940.456,178809.12,187749.576,0,NULL,17),(22,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,8940.456,178809.12,187749.576,0,NULL,18),(23,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,8940.456,178809.12,187749.576,0,NULL,19),(24,'T1 - 2024','2024-01-01','2024-01-31',1,0,15,15,8940.456,178809.12,187749.576,0,NULL,20),(25,'T2 - 2024','2024-02-01','2024-02-29',1,16,34,18,14696.64,293932.8,308629.44,0,NULL,6),(26,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,7),(27,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,8),(28,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,9),(29,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,10),(30,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,11),(31,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,12),(32,'T2 - 2024','2024-02-01','2024-02-29',1,20,34,14,8266.86,165337.2,173604.06,0,NULL,3),(33,'T2 - 2024','2024-02-01','2024-02-29',1,40,40,0,0,0,0,0,NULL,4),(34,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,13),(35,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,14),(36,'T2 - 2024','2024-02-01','2024-02-29',1,15,36,21,22861.44,457228.8,480090.24,0,NULL,15),(37,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,20684.16,413683.2,434367.36,0,NULL,16),(38,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,11634.84,232696.8,244331.64,0,NULL,17),(39,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,11634.84,232696.8,244331.64,0,NULL,18),(40,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,11634.84,232696.8,244331.64,0,NULL,19),(41,'T2 - 2024','2024-02-01','2024-02-29',1,15,34,19,11634.84,232696.8,244331.64,0,NULL,20),(42,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,9614.052,192281.04,201895.092,0,NULL,3),(43,'T3 - 2024','2024-03-01','2024-03-31',1,40,50,10,4619.916,92398.32,97018.236,0,NULL,4),(44,'T3 - 2024','2024-03-01','2024-03-31',1,30,50,20,10573.416,211468.32,222041.736,0,NULL,5),(45,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,13063.68,261273.6,274337.28,0,NULL,6),(46,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,7),(47,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,8),(48,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,9),(49,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,10),(50,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,11),(51,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,12),(52,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,13),(53,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,14),(54,'T3 - 2024','2024-03-01','2024-03-31',1,36,50,14,15240.96,304819.2,320060.16,0,NULL,15),(55,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,17418.24,348364.8,365783.04,0,NULL,16),(56,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,9614.052,192281.04,201895.092,0,NULL,17),(57,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,9614.052,192281.04,201895.092,0,NULL,18),(58,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,9614.052,192281.04,201895.092,0,NULL,19),(59,'T3 - 2024','2024-03-01','2024-03-31',1,34,50,16,9614.052,192281.04,201895.092,0,NULL,20),(60,'T4 - 2024','2024-04-01','2024-04-30',1,50,90,40,32441.472,648829.44,681270.912,0,NULL,3),(61,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,7511.616,150232.32,157743.936,0,NULL,4),(62,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,7511.616,150232.32,157743.936,0,NULL,5),(63,'T4 - 2024','2024-04-01','2024-04-30',0,50,100,50,40824,816480,857304,0,NULL,6),(64,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,7),(65,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,8),(66,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,9),(67,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,10),(68,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,11),(69,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,12),(70,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,13),(71,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,14),(72,'T4 - 2024','2024-04-01','2024-04-30',1,50,70,20,21772.8,435456,457228.8,0,NULL,15),(73,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,16329.6,326592,342921.6,0,NULL,16),(74,'T4 - 2024','2024-04-01','2024-04-30',1,50,65,15,8940.456,178809.12,187749.576,0,NULL,17),(75,'T4 - 2024','2024-04-01','2024-04-30',1,50,77,27,18819.864,376397.28,395217.144,0,NULL,18),(76,'T4 - 2024','2024-04-01','2024-04-30',1,50,76,26,17921.736,358434.72,376356.456,0,NULL,19),(77,'T4 - 2024','2024-04-01','2024-04-30',1,50,80,30,21691.152,433823.04,455514.192,0,NULL,20),(78,'T5 - 2024','2024-05-01','2024-05-31',0,90,115,25,17023.608,340472.16,357495.768,0,NULL,3),(79,'T5 - 2024','2024-05-01','2024-05-31',0,65,80,15,7511.616,150232.32,157743.936,0,NULL,4),(80,'T5 - 2024','2024-05-01','2024-05-31',0,65,65,0,0,0,0,0,NULL,5),(81,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,7),(82,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,8),(83,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,9),(84,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,10),(85,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,11),(86,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,12),(87,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,13),(88,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,14),(89,'T5 - 2024','2024-05-01','2024-05-31',0,70,84,14,15240.96,304819.2,320060.16,0,NULL,15),(90,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,20684.16,413683.2,434367.36,0,NULL,16),(91,'T5 - 2024','2024-05-01','2024-05-31',0,65,84,19,11634.84,232696.8,244331.64,0,NULL,17),(92,'T5 - 2024','2024-05-01','2024-05-31',0,77,84,7,3810.24,76204.8,80015.04,0,NULL,18),(93,'T5 - 2024','2024-05-01','2024-05-31',0,76,84,8,4354.56,87091.2,91445.76,0,NULL,19),(94,'T5 - 2024','2024-05-01','2024-05-31',0,80,84,4,2177.28,43545.6,45722.88,0,NULL,20);
/*!40000 ALTER TABLE `ql_hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_hopdong`
--

DROP TABLE IF EXISTS `ql_hopdong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_hopdong` (
  `ma_hop_dong` int NOT NULL AUTO_INCREMENT,
  `ten_nguoi_dai_dien` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `chuc_vu_nguoi_dai_dien` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dia_chi` text COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_lap` date NOT NULL,
  `trang_thai` int NOT NULL,
  `ma_khach_hang` int NOT NULL,
  `ma_tuyen` int NOT NULL,
  `ma_nhom_gia` int NOT NULL,
  PRIMARY KEY (`ma_hop_dong`),
  KEY `ma_nhom_gia` (`ma_nhom_gia`),
  KEY `ma_khach_hang` (`ma_khach_hang`),
  KEY `ql_hopdong_ibfk_3` (`ma_tuyen`),
  CONSTRAINT `fk_1` FOREIGN KEY (`ma_khach_hang`) REFERENCES `ql_khachhang` (`ma_khach_hang`),
  CONSTRAINT `fk_2` FOREIGN KEY (`ma_tuyen`) REFERENCES `dm_tuyendoc` (`ma_tuyen`),
  CONSTRAINT `fk_3` FOREIGN KEY (`ma_nhom_gia`) REFERENCES `ql_nhomgia` (`ma_nhom_gia`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_hopdong`
--

LOCK TABLES `ql_hopdong` WRITE;
/*!40000 ALTER TABLE `ql_hopdong` DISABLE KEYS */;
INSERT INTO `ql_hopdong` VALUES (2,'Đỗ Đức Mạnh','Giám đốc','14 Lạch Tray','2024-05-29',1,2,1,2),(3,'Đỗ Đức Mạnh','Giám đốc','14 Lạch Tray','2024-05-29',1,3,2,3),(4,'Đỗ Đức Mạnh','Giám đốc','2 Lạch Tray','2023-01-01',1,4,2,3),(5,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,5,14,4),(6,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,6,15,6),(7,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,7,17,6),(8,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,8,18,6),(9,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,9,19,6),(10,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,10,20,6),(11,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,11,21,6),(12,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,12,22,6),(13,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,13,23,6),(14,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,14,24,6),(15,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,15,25,6),(16,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,16,26,6),(17,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,17,27,2),(18,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,18,28,2),(19,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,19,9,2),(20,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',1,20,24,2),(21,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',0,21,24,2),(22,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',0,22,22,2),(23,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',0,23,23,2),(24,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',0,24,24,2),(25,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',0,25,25,2),(26,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',0,26,26,2),(27,'Nguyễn Công Lâm','Phó giám đốc','14 Lạch Tray','2023-12-02',0,27,27,2);
/*!40000 ALTER TABLE `ql_hopdong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_khachhang`
--

DROP TABLE IF EXISTS `ql_khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_khachhang` (
  `ma_khach_hang` int NOT NULL AUTO_INCREMENT,
  `ten_khach_hang` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `can_cuoc` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `dia_chi` text COLLATE utf8mb4_general_ci NOT NULL,
  `sdt` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_dang_ky` date NOT NULL,
  PRIMARY KEY (`ma_khach_hang`),
  UNIQUE KEY `can_cuoc` (`can_cuoc`),
  UNIQUE KEY `sdt` (`sdt`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_khachhang`
--

LOCK TABLES `ql_khachhang` WRITE;
/*!40000 ALTER TABLE `ql_khachhang` DISABLE KEYS */;
INSERT INTO `ql_khachhang` VALUES (1,'Phạm Thị Thu Hiền','031300005030','34/46 Lạch Tray','0834285958','ddmanh1420@gmail.com','2024-01-01'),(2,'Nguyễn Văn A','000000000001','1 Lạch Tray','0000000001','NVA@qlcn.com','2024-01-01'),(3,'Nguyễn Văn B','000000000002','2 Lạch Tray','0000000002','ddmanh1420@gmail.com','2024-01-01'),(4,'Nguyễn Văn C','000000000003','3 Lạch Tray','0000000003','NVC@qlcn.com','2024-01-01'),(5,'Nguyễn Văn D','000000000004','4 Lạch Tray','0000000004','NVD@qlcn.com','2024-01-01'),(6,'Nguyễn Văn E','000000000005','5 Lạch Tray','0000000005','NVE@qlcn.com','2024-02-01'),(7,'Nguyễn Văn F','000000000006','6 Lạch Tray','0000000006','NVF@qlcn.com','2024-02-01'),(8,'Nguyễn Văn G','000000000007','7 Lạch Tray','0000000007','NVG@qlcn.com','2024-02-01'),(9,'Nguyễn Văn H','000000000008','8 Lạch Tray','0000000008','NVH@qlcn.com','2024-02-01'),(10,'Nguyễn Văn I','000000000009','9 Lạch Tray','0000000009','NVI@qlcn.com','2024-02-01'),(11,'Nguyễn Văn J','000000000010','10 Lạch Tray','0000000010','NVJ@qlcn.com','2024-02-01'),(12,'Nguyễn Văn K','000000000011','11 Lạch Tray','0000000011','NVK@qlcn.com','2024-02-01'),(13,'Nguyễn Văn L','000000000012','12 Lạch Tray','0000000012','NVL@qlcn.com','2024-03-01'),(14,'Nguyễn Văn M','000000000013','13 Lạch Tray','0000000013','NVM@qlcn.com','2024-03-01'),(15,'Nguyễn Văn N','000000000014','14 Lạch Tray','0000000014','NVN@qlcn.com','2024-03-01'),(16,'Nguyễn Văn O','000000000015','15 Lạch Tray','0000000015','NVO@qlcn.com','2024-03-01'),(17,'Nguyễn Văn P','000000000016','16 Lạch Tray','0000000016','NVP@qlcn.com','2024-03-01'),(18,'Nguyễn Văn Q','000000000017','17 Lạch Tray','0000000017','NVQ@qlcn.com','2024-03-01'),(19,'Nguyễn Văn R','000000000019','19 Lạch Tray','0000000019','NVR@qlcn.com','2024-03-01'),(20,'Nguyễn Văn S','000000000020','20 Lạch Tray','0000000020','NVS@qlcn.com','2024-04-01'),(21,'Nguyễn Văn T','000000000021','21 Lạch Tray','0000000021','NVT@qlcn.com','2024-04-01'),(22,'Nguyễn Văn U','000000000022','22 Lạch Tray','0000000022','NVU@qlcn.com','2024-04-01'),(23,'Nguyễn Văn V','000000000023','23 Lạch Tray','0000000023','NVV@qlcn.com','2024-06-01'),(24,'Nguyễn Văn W','000000000024','24 Lạch Tray','0000000024','NVW@qlcn.com','2024-06-01'),(25,'Nguyễn Văn X','000000000025','25 Lạch Tray','0000000025','NVX@qlcn.com','2024-06-01'),(26,'Nguyễn Văn Y','000000000026','26 Lạch Tray','0000000026','NVY@qlcn.com','2024-06-01'),(27,'Nguyễn Văn Z','000000000027','27 Lạch Tray','0000000027','NVZ@qlcn.com','2024-06-01'),(28,'Nguyễn Văn A','123456789144','214 Lý Thánh Tông','0865089822','lam@gmail.com','2024-06-05'),(29,'Nguyễn Văn B','123432789130','215 Lý Thánh Tông','0865089823','lam@gmail.com','2024-06-05'),(30,'Nguyễn Văn C','123126789131','216 Lý Thánh Tông','0865089824','lam@gmail.com','2024-06-05'),(31,'Nguyễn Văn E','123452759133','218 Lý Thánh Tông','0865089826','lam@gmail.com','2024-06-05'),(32,'Nguyễn Văn F','123426719134','219 Lý Thánh Tông','0865089827','lam@gmail.com','2024-06-05'),(33,'Nguyễn Văn G','123456782135','220 Lý Thánh Tông','0865089828','lam@gmail.com','2024-06-05'),(34,'Nguyễn Văn H','113456719136','221 Lý Thánh Tông','0865089829','lam@gmail.com','2024-06-05'),(35,'Nguyễn Văn L','923456789131','222 Lý Thánh Tông','0865089830','lam@gmail.com','2024-06-05'),(36,'Nguyễn Văn P','133456789198','223 Lý Thánh Tông','0865089831','lam@gmail.com','2024-06-05'),(37,'Nguyễn Văn C','121456789132','224 Lý Thánh Tông','0865089832','lam@gmail.com','2024-06-05'),(38,'Nguyễn Văn A','123454789147','225 Lý Thánh Tông','0865089833','lam@gmail.com','2024-06-05');
/*!40000 ALTER TABLE `ql_khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_lapdatdhkhach`
--

DROP TABLE IF EXISTS `ql_lapdatdhkhach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_lapdatdhkhach` (
  `ma_lap_dat` int NOT NULL AUTO_INCREMENT,
  `chi_so_dau` int NOT NULL,
  `chi_so_cuoi` int DEFAULT NULL,
  `so_tieu_thu` int DEFAULT NULL,
  `tu_ngay` date NOT NULL,
  `den_ngay` date DEFAULT NULL,
  `ma_dong_ho` int NOT NULL,
  `ma_hop_dong` int NOT NULL,
  PRIMARY KEY (`ma_lap_dat`),
  KEY `ma_dong_ho` (`ma_dong_ho`),
  KEY `ma_hop_dong` (`ma_hop_dong`),
  CONSTRAINT `ql_lapdatdhkhach_ibfk_1` FOREIGN KEY (`ma_dong_ho`) REFERENCES `ql_donghokhach` (`ma_dong_ho`) ON UPDATE CASCADE,
  CONSTRAINT `ql_lapdatdhkhach_ibfk_2` FOREIGN KEY (`ma_hop_dong`) REFERENCES `ql_hopdong` (`ma_hop_dong`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_lapdatdhkhach`
--

LOCK TABLES `ql_lapdatdhkhach` WRITE;
/*!40000 ALTER TABLE `ql_lapdatdhkhach` DISABLE KEYS */;
INSERT INTO `ql_lapdatdhkhach` VALUES (3,0,NULL,NULL,'2024-04-30',NULL,1,2),(4,0,NULL,NULL,'2022-01-01',NULL,2,3),(5,0,NULL,NULL,'2023-02-01',NULL,3,4),(6,0,NULL,NULL,'2024-01-01',NULL,4,5),(7,0,NULL,NULL,'2024-01-01',NULL,6,6),(8,0,NULL,NULL,'2024-01-01',NULL,7,7),(9,0,NULL,NULL,'2024-01-01',NULL,8,8),(10,0,NULL,NULL,'2024-01-01',NULL,9,9),(11,0,NULL,NULL,'2024-01-01',NULL,10,10),(12,0,NULL,NULL,'2024-01-01',NULL,11,11),(13,0,NULL,NULL,'2024-01-01',NULL,12,12),(14,0,NULL,NULL,'2024-01-01',NULL,13,13),(15,0,NULL,NULL,'2024-01-01',NULL,14,14),(16,0,NULL,NULL,'2024-01-01',NULL,16,16),(17,0,NULL,NULL,'2024-01-01',NULL,17,17),(18,0,NULL,NULL,'2024-01-01',NULL,18,18),(19,0,NULL,NULL,'2024-01-01',NULL,19,19),(20,0,NULL,NULL,'2024-01-01',NULL,20,20);
/*!40000 ALTER TABLE `ql_lapdatdhkhach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_lapdatdhkhoi`
--

DROP TABLE IF EXISTS `ql_lapdatdhkhoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_lapdatdhkhoi` (
  `ma_lap_dat` int NOT NULL AUTO_INCREMENT,
  `chi_so_dau` int NOT NULL,
  `chi_so_cuoi` int DEFAULT NULL,
  `so_tieu_thu` int DEFAULT NULL,
  `tu_ngay` date NOT NULL,
  `den_ngay` date DEFAULT NULL,
  `ma_dong_ho` int NOT NULL,
  `ma_tuyen` int NOT NULL,
  PRIMARY KEY (`ma_lap_dat`),
  KEY `ql_lapdatdhkhoi_ibfk_1` (`ma_tuyen`),
  KEY `ql_lapdatdhkhoi_ibfk_2` (`ma_dong_ho`),
  CONSTRAINT `ql_lapdatdhkhoi_ibfk_1` FOREIGN KEY (`ma_tuyen`) REFERENCES `dm_tuyendoc` (`ma_tuyen`) ON UPDATE CASCADE,
  CONSTRAINT `ql_lapdatdhkhoi_ibfk_2` FOREIGN KEY (`ma_dong_ho`) REFERENCES `ql_donghokhoi` (`ma_dong_ho`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_lapdatdhkhoi`
--

LOCK TABLES `ql_lapdatdhkhoi` WRITE;
/*!40000 ALTER TABLE `ql_lapdatdhkhoi` DISABLE KEYS */;
INSERT INTO `ql_lapdatdhkhoi` VALUES (3,0,25,25,'2023-12-31','2024-03-01',3,2),(4,0,25,0,'2023-12-31','2024-02-01',4,1),(5,0,16,16,'2023-12-31','2024-03-01',5,2),(6,25,25,0,'2024-05-19','2024-05-19',4,2),(7,0,30,30,'2024-03-02','2024-05-31',6,2),(8,0,NULL,NULL,'2022-02-01',NULL,7,7),(9,0,NULL,NULL,'2022-02-01',NULL,8,4),(10,0,NULL,NULL,'2022-02-01',NULL,9,24),(11,0,NULL,NULL,'2022-02-01',NULL,10,32),(12,0,NULL,NULL,'2022-02-01',NULL,11,62),(13,0,NULL,NULL,'2022-02-01',NULL,12,3),(14,0,NULL,NULL,'2022-02-01',NULL,13,4),(15,0,NULL,NULL,'2022-02-01',NULL,14,5),(16,0,NULL,NULL,'2022-02-01',NULL,15,6),(17,0,NULL,NULL,'2022-02-01',NULL,16,8),(18,0,NULL,NULL,'2022-02-01',NULL,17,9),(19,0,NULL,NULL,'2022-02-01',NULL,18,10),(20,0,NULL,NULL,'2022-02-01',NULL,19,11),(21,0,NULL,NULL,'2022-02-01',NULL,20,12),(22,0,NULL,NULL,'2022-02-01',NULL,21,13),(23,0,NULL,NULL,'2022-02-01',NULL,22,14),(24,0,NULL,NULL,'2022-02-01',NULL,23,15),(25,0,NULL,NULL,'2022-02-01',NULL,24,16),(26,0,NULL,NULL,'2022-02-01',NULL,25,17),(27,0,NULL,NULL,'2022-02-01',NULL,26,18),(28,0,NULL,NULL,'2022-02-01',NULL,27,19),(29,0,NULL,NULL,'2022-02-01',NULL,28,20),(30,0,NULL,NULL,'2022-02-01',NULL,29,21);
/*!40000 ALTER TABLE `ql_lapdatdhkhoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_nhomgia`
--

DROP TABLE IF EXISTS `ql_nhomgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_nhomgia` (
  `ma_nhom_gia` int NOT NULL AUTO_INCREMENT,
  `ten_nhom_gia` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `hs_duoi_10m` double DEFAULT NULL,
  `hs_tu_10m_den_20m` double DEFAULT NULL,
  `hs_tu_20m_den_30m` double DEFAULT NULL,
  `hs_tren_30m` double DEFAULT NULL,
  `hs_rieng` double DEFAULT NULL,
  `hs_thue` double NOT NULL,
  `gia_ban` double NOT NULL,
  `ma_loai_khach_hang` int NOT NULL,
  PRIMARY KEY (`ma_nhom_gia`),
  KEY `ql_nhomgia_ibfk_1` (`ma_loai_khach_hang`),
  CONSTRAINT `ql_nhomgia_ibfk_1` FOREIGN KEY (`ma_loai_khach_hang`) REFERENCES `dm_loaikhachhang` (`ma_loai_khach_hang`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_nhomgia`
--

LOCK TABLES `ql_nhomgia` WRITE;
/*!40000 ALTER TABLE `ql_nhomgia` DISABLE KEYS */;
INSERT INTO `ql_nhomgia` VALUES (1,'Giá bán lẻ nước sạch bình quân',NULL,NULL,NULL,NULL,1,0.05,13608,4),(2,'Giá cụ thể theo hộ dân cư đô thị sử dụng nước sạch',0.8,0.99,1.32,1.58,NULL,0.05,13608,3),(3,'Giá cụ thể theo hộ dân cư nông thôn sử dụng nước sạch',0.66,0.85,1.1,1.32,NULL,0.05,13608,5),(4,'Cơ quan hành chính; đơn vị sự nghiệp công lập; trường học, bệnh viện, cơ sở khám, chữa bệnh (công lập và tư nhân); phục vụ mục đích công cộng (phi lợi nhuận)',NULL,NULL,NULL,NULL,1.2,0.05,13608,2),(5,'Tổ chức, cá nhân sản xuất vật chất',NULL,NULL,NULL,NULL,1.34,0.05,13608,6),(6,'Tổ chức, cá nhân kinh doanh dịch vụ',NULL,NULL,NULL,NULL,1.6,0.05,13608,1),(7,'Giá bán buôn nước sạch bình quân',NULL,NULL,NULL,NULL,1,0.08,12708,4),(8,'Giá bán buôn theo nhóm hộ dân cư đô thị',NULL,NULL,NULL,NULL,0.78,0.08,12708,3),(9,'Giá bán buôn theo nhóm hộ dân cư nông thôn',NULL,NULL,NULL,NULL,0.63,0.08,12708,5),(10,'Giá bán buôn theo nhóm khách hàng hành chính sự nghiệp',NULL,NULL,NULL,NULL,1.18,0.08,12708,2),(11,'Giá bán buôn theo nhóm khách hàng sản xuất',NULL,NULL,NULL,NULL,1.29,0.08,12708,6),(12,'Giá bán buôn theo nhóm khách hàng kinh doanh dịch vụ',NULL,NULL,NULL,NULL,1.54,0.08,12708,1),(13,'Bán buôn ngoài vùng phục vụ cấp nước cho các đơn vị cấp nước để cung cấp cho khu vực dân cư nông thôn. (không bao gồm khu, cụm công nghiệp, khu dịch vụ thương mại, du lịch ...)',NULL,NULL,NULL,NULL,0.43,0.08,12708,4);
/*!40000 ALTER TABLE `ql_nhomgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_phanquyen`
--

DROP TABLE IF EXISTS `ql_phanquyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_phanquyen` (
  `ma_phan_quyen` int NOT NULL AUTO_INCREMENT,
  `ma_nhan_vien` int NOT NULL,
  `ma_quyen` int NOT NULL,
  `ma_tuyen` int DEFAULT NULL,
  PRIMARY KEY (`ma_phan_quyen`),
  UNIQUE KEY `ma_nhan_vien` (`ma_nhan_vien`,`ma_quyen`),
  KEY `ma_quyen` (`ma_quyen`),
  KEY `ql_phanquyen_ibfk_3` (`ma_tuyen`),
  CONSTRAINT `ql_phanquyen_ibfk_1` FOREIGN KEY (`ma_quyen`) REFERENCES `dm_quyen` (`ma_quyen`),
  CONSTRAINT `ql_phanquyen_ibfk_2` FOREIGN KEY (`ma_nhan_vien`) REFERENCES `ql_taikhoan` (`ma_nhan_vien`),
  CONSTRAINT `ql_phanquyen_ibfk_3` FOREIGN KEY (`ma_tuyen`) REFERENCES `dm_tuyendoc` (`ma_tuyen`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_phanquyen`
--

LOCK TABLES `ql_phanquyen` WRITE;
/*!40000 ALTER TABLE `ql_phanquyen` DISABLE KEYS */;
INSERT INTO `ql_phanquyen` VALUES (1,100000,1,NULL),(2,100000,2,NULL),(6,100000,5,NULL),(7,100001,6,NULL),(8,100001,2,NULL),(11,100006,14,1),(12,100000,14,NULL),(13,100000,16,NULL),(14,100000,8,NULL),(15,100000,7,NULL),(16,100000,17,NULL),(17,100000,18,NULL),(18,100000,15,NULL);
/*!40000 ALTER TABLE `ql_phanquyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_taikhoan`
--

DROP TABLE IF EXISTS `ql_taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_taikhoan` (
  `ma_nhan_vien` int NOT NULL AUTO_INCREMENT,
  `mat_khau` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `trang_thai` int NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `sdt` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `chuc_vu` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ho_ten` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_sinh` date DEFAULT NULL,
  PRIMARY KEY (`ma_nhan_vien`)
) ENGINE=InnoDB AUTO_INCREMENT=100031 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_taikhoan`
--

LOCK TABLES `ql_taikhoan` WRITE;
/*!40000 ALTER TABLE `ql_taikhoan` DISABLE KEYS */;
INSERT INTO `ql_taikhoan` VALUES (100000,'c4ca4238a0b923820dcc509a6f75849b',1,'ddmanh1420@gmail.com','0834285958','Giám đốc','Đỗ Đức Mạnh','2000-04-14'),(100001,'c4ca4238a0b923820dcc509a6f75849b',1,'lam@qlcn.com','0213123123','Phó giám đốc','Nguyễn Công Lâm','2002-11-05'),(100003,'c4ca4238a0b923820dcc509a6f75849b',1,'phuc@qlcn.com','0123456780','Trưởng phòng','Phạm Quang Phúc','2000-08-06'),(100004,'c4ca4238a0b923820dcc509a6f75849b',1,'NVA@qlcn.com','0123456789','Trưởng phòng','Nguyễn Văn A','2000-08-06'),(100005,'c4ca4238a0b923820dcc509a6f75849b',0,'NVB@qlcn.com','0000000001','Nhân viên','Nguyễn Văn B','2024-05-25'),(100006,'c4ca4238a0b923820dcc509a6f75849b',1,'NVC@qlcn.com','0000000002','Nhân viên','Nguyễn Văn C','2024-05-25'),(100007,'c4ca4238a0b923820dcc509a6f75849b',1,'NVD@qlcn.com','0000000003','Nhân viên','Nguyễn Văn D','2024-05-25'),(100008,'c4ca4238a0b923820dcc509a6f75849b',1,'NVE@qlcn.com','0000000004','Nhân viên','Nguyễn Văn E','2024-05-25'),(100009,'c4ca4238a0b923820dcc509a6f75849b',0,'NVF@qlcn.com','0000000005','Nhân viên','Nguyễn Văn F','2024-05-25'),(100010,'c4ca4238a0b923820dcc509a6f75849b',1,'NVG@qlcn.com','0000000006','Nhân viên','Nguyễn Văn G','2024-05-25'),(100011,'c4ca4238a0b923820dcc509a6f75849b',1,'NVH@qlcn.com','0000000007','Nhân viên','Nguyễn Văn H','2024-05-25'),(100012,'c4ca4238a0b923820dcc509a6f75849b',1,'NVI@qlcn.com','0000000008','Nhân viên','Nguyễn Văn I','2024-05-25'),(100013,'c4ca4238a0b923820dcc509a6f75849b',1,'NVJ@qlcn.com','0000000009','Nhân viên','Nguyễn Văn J','2024-05-25'),(100014,'c4ca4238a0b923820dcc509a6f75849b',1,'NVK@qlcn.com','0000000010','Nhân viên','Nguyễn Văn K','2024-05-25'),(100015,'c4ca4238a0b923820dcc509a6f75849b',1,'NVL@qlcn.com','0000000011','Nhân viên','Nguyễn Văn L','2024-05-25'),(100016,'c4ca4238a0b923820dcc509a6f75849b',1,'NVM@qlcn.com','0000000012','Nhân viên','Nguyễn Văn M','2024-05-25'),(100017,'c4ca4238a0b923820dcc509a6f75849b',1,'NVN@qlcn.com','0000000013','Nhân viên','Nguyễn Văn N','2024-05-25'),(100018,'c4ca4238a0b923820dcc509a6f75849b',1,'NVO@qlcn.com','0000000015','Nhân viên','Nguyễn Văn O','2024-05-25'),(100019,'c4ca4238a0b923820dcc509a6f75849b',1,'NVP@qlcn.com','0000000016','Nhân viên','Nguyễn Văn P','2024-05-25'),(100020,'c4ca4238a0b923820dcc509a6f75849b',1,'NVQ@qlcn.com','0000000017','Nhân viên','Nguyễn Văn Q','2024-05-25'),(100021,'c4ca4238a0b923820dcc509a6f75849b',1,'NVR@qlcn.com','0000000018','Nhân viên','Nguyễn Văn R','2024-05-25'),(100022,'c4ca4238a0b923820dcc509a6f75849b',0,'NVS@qlcn.com','0000000019','Nhân viên','Nguyễn Văn S','2024-05-25'),(100023,'c4ca4238a0b923820dcc509a6f75849b',0,'NVT@qlcn.com','0000000020','Nhân viên','Nguyễn Văn T','2024-05-25'),(100024,'c4ca4238a0b923820dcc509a6f75849b',0,'NVU@qlcn.com','0000000021','Nhân viên','Nguyễn Văn U','2024-05-25'),(100025,'c4ca4238a0b923820dcc509a6f75849b',0,'NVV@qlcn.com','0000000022','Nhân viên','Nguyễn Văn V','2024-05-25'),(100026,'c4ca4238a0b923820dcc509a6f75849b',1,'NVW@qlcn.com','0000000023','Nhân viên','Nguyễn Văn W','2024-05-25'),(100027,'c4ca4238a0b923820dcc509a6f75849b',1,'NVX@qlcn.com','0000000024','Nhân viên','Nguyễn Văn X','2024-05-25'),(100028,'c4ca4238a0b923820dcc509a6f75849b',1,'NVY@qlcn.com','0000000025','Nhân viên','Nguyễn Văn Y','2024-05-25'),(100029,'c4ca4238a0b923820dcc509a6f75849b',1,'NVZ@qlcn.com','0000000026','Nhân viên','Nguyễn Văn Z','2024-05-25'),(100030,'c4ca4238a0b923820dcc509a6f75849b',1,'nguyenconglam2002a@gmail.com',NULL,'Nhân viên','Lâm Nguyễn Công',NULL);
/*!40000 ALTER TABLE `ql_taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ql_taikhoansocial`
--

DROP TABLE IF EXISTS `ql_taikhoansocial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ql_taikhoansocial` (
  `ma_tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ma_nhan_vien` int NOT NULL,
  `ma_social` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `ten_social` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nguon_social` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ma_tai_khoan`),
  KEY `ma_nhan_vien` (`ma_nhan_vien`),
  CONSTRAINT `ql_taikhoansocial_ibfk_1` FOREIGN KEY (`ma_nhan_vien`) REFERENCES `ql_taikhoan` (`ma_nhan_vien`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ql_taikhoansocial`
--

LOCK TABLES `ql_taikhoansocial` WRITE;
/*!40000 ALTER TABLE `ql_taikhoansocial` DISABLE KEYS */;
INSERT INTO `ql_taikhoansocial` VALUES (1,100030,'109295638506835118282','Lâm Nguyễn Công','google');
/*!40000 ALTER TABLE `ql_taikhoansocial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 12:16:53
