-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ql thuexe
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ql thuexe`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ql thuexe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `ql thuexe`;

--
-- Table structure for table `chitietdv`
--

DROP TABLE IF EXISTS `chitietdv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chitietdv` (
  `MADATXE` varchar(20) NOT NULL,
  `MADV` varchar(20) NOT NULL,
  `SOLUONG` int(50) DEFAULT NULL,
  `GIATHOIDIEMDAT` int(11) DEFAULT NULL,
  KEY `fk_chitietdv_datxe` (`MADATXE`),
  KEY `fk_chitietdv_dichvu` (`MADV`),
  CONSTRAINT `fk_chitietdv_datxe` FOREIGN KEY (`MADATXE`) REFERENCES `datxe` (`MADATXE`),
  CONSTRAINT `fk_chitietdv_dichvu` FOREIGN KEY (`MADV`) REFERENCES `dichvu` (`MADV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdv`
--

LOCK TABLES `chitietdv` WRITE;
/*!40000 ALTER TABLE `chitietdv` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietdv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datxe`
--

DROP TABLE IF EXISTS `datxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datxe` (
  `MADATXE` varchar(20) NOT NULL,
  `MANGUOIDUNG` varchar(20) NOT NULL,
  `MAXE` varchar(20) NOT NULL,
  `TRANGTHAIDATXE` varchar(50) NOT NULL,
  `NGAYNHAN` datetime NOT NULL,
  `NGAYTRA` datetime NOT NULL,
  `NGAYTAODON` datetime NOT NULL,
  `TONGTIEN` int(11) NOT NULL,
  PRIMARY KEY (`MADATXE`),
  KEY `fk_datxe_nguoidung` (`MANGUOIDUNG`),
  KEY `fk_datxe_xe` (`MAXE`),
  CONSTRAINT `fk_datxe_nguoidung` FOREIGN KEY (`MANGUOIDUNG`) REFERENCES `nguoidung` (`MANGUOIDUNG`),
  CONSTRAINT `fk_datxe_xe` FOREIGN KEY (`MAXE`) REFERENCES `xe` (`MAXE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datxe`
--

LOCK TABLES `datxe` WRITE;
/*!40000 ALTER TABLE `datxe` DISABLE KEYS */;
INSERT INTO `datxe` VALUES ('DX001','ND001','X001','Đã hoàn thành','2026-02-01 08:00:00','2026-02-03 17:00:00','2026-01-28 10:30:00',2400000),('DX002','ND002','X002','Đã hoàn thành','2026-02-05 07:30:00','2026-02-07 17:30:00','2026-02-01 15:20:00',3000000),('DX003','ND003','X003','Đang thuê','2026-08-06 08:00:00','2026-08-09 17:00:00','2026-08-04 09:15:00',2100000),('DX004','ND004','X004','Đã hoàn thành','2026-02-15 06:00:00','2026-02-17 20:00:00','2026-02-10 14:00:00',2800000),('DX005','ND005','X006','Đã hoàn thành','2026-02-20 08:00:00','2026-02-22 18:00:00','2026-02-18 11:45:00',2200000),('DX006','ND006','X007','Đang thuê','2026-08-05 07:00:00','2026-08-08 17:00:00','2026-08-02 16:30:00',2400000),('DX007','ND007','X008','Đã hoàn thành','2026-03-01 09:00:00','2026-03-02 18:00:00','2026-02-25 10:00:00',500000),('DX008','ND008','X009','Đã hoàn thành','2026-03-05 08:00:00','2026-03-08 17:00:00','2026-03-01 08:20:00',6000000),('DX009','ND009','X010','Đã hoàn thành','2026-03-12 07:30:00','2026-03-14 17:30:00','2026-03-09 13:10:00',1300000),('DX010','ND010','X011','Đang thuê','2026-08-06 08:00:00','2026-08-09 18:00:00','2026-08-05 14:25:00',2100000),('DX011','ND011','X012','Đã hoàn thành','2026-03-20 08:00:00','2026-03-22 17:00:00','2026-03-15 09:00:00',1700000),('DX012','ND012','X013','Đã hoàn thành','2026-03-25 07:00:00','2026-03-28 19:00:00','2026-03-20 11:15:00',2700000),('DX013','ND013','X014','Đã hoàn thành','2026-04-01 06:00:00','2026-04-03 20:00:00','2026-03-28 15:40:00',3200000),('DX014','ND014','X016','Đã hoàn thành','2026-04-05 08:00:00','2026-04-06 18:00:00','2026-04-02 10:05:00',950000),('DX015','ND015','X017','Đang thuê','2026-08-07 07:30:00','2026-08-10 17:30:00','2026-08-06 08:50:00',3900000),('DX016','ND016','X018','Đã hoàn thành','2026-04-12 08:00:00','2026-04-14 17:00:00','2026-04-08 16:15:00',2200000),('DX017','ND017','X019','Đã hoàn thành','2026-04-18 07:00:00','2026-04-20 18:00:00','2026-04-15 13:40:00',1600000),('DX018','ND018','X020','Đã hoàn thành','2026-04-25 08:30:00','2026-04-26 17:30:00','2026-04-20 09:20:00',700000),('DX019','ND019','X021','Đang thuê','2026-08-05 08:00:00','2026-08-08 17:00:00','2026-08-03 11:10:00',3600000),('DX020','ND020','X022','Đã hoàn thành','2026-05-02 06:00:00','2026-05-05 21:00:00','2026-04-28 14:50:00',7500000),('DX021','ND021','X023','Đã hoàn thành','2026-05-10 08:00:00','2026-05-12 18:00:00','2026-05-05 10:30:00',5600000),('DX022','ND022','X024','Chờ duyệt','2026-08-10 09:00:00','2026-08-12 17:00:00','2026-08-07 15:40:00',6000000),('DX023','ND023','X025','Đang thuê','2026-08-04 07:30:00','2026-08-08 17:30:00','2026-08-01 09:05:00',5600000),('DX024','ND024','X026','Đã hoàn thành','2026-05-20 08:00:00','2026-05-22 17:00:00','2026-05-15 16:15:00',2200000),('DX025','ND025','X027','Đã hoàn thành','2026-05-25 07:00:00','2026-05-27 18:00:00','2026-05-20 11:30:00',2000000),('DX026','ND026','X028','Đã hoàn thành','2026-06-01 08:00:00','2026-06-03 17:00:00','2026-05-28 14:00:00',1400000),('DX027','ND027','X029','Đang thuê','2026-08-05 08:00:00','2026-08-09 18:00:00','2026-08-03 09:25:00',4000000),('DX028','ND028','X030','Đã hoàn thành','2026-06-10 07:30:00','2026-06-12 17:30:00','2026-06-05 10:10:00',2800000),('DX029','ND029','X001','Chờ duyệt','2026-08-11 08:00:00','2026-08-13 17:00:00','2026-08-07 16:00:00',2400000),('DX030','ND030','X002','Đã hoàn thành','2026-06-20 08:00:00','2026-06-22 18:00:00','2026-06-15 11:20:00',3000000);
/*!40000 ALTER TABLE `datxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dichvu`
--

DROP TABLE IF EXISTS `dichvu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dichvu` (
  `MADV` varchar(20) NOT NULL,
  `TENDV` varchar(50) DEFAULT NULL,
  `GIADV` int(11) NOT NULL,
  `MOTA` varchar(150) NOT NULL,
  `TRANGTHAI` tinyint(1) NOT NULL,
  PRIMARY KEY (`MADV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dichvu`
--

LOCK TABLES `dichvu` WRITE;
/*!40000 ALTER TABLE `dichvu` DISABLE KEYS */;
INSERT INTO `dichvu` VALUES ('DV01','Bảo hiểm chuyến đi',100000,'Bảo hiểm sự cố dân sự và va quẹt nhỏ cho xe trong suốt thời gian thuê.',1),('DV02','Bảo hiểm thân vỏ mở rộng',200000,'Bảo hiểm đền bù 100% hư hỏng thân vỏ, không tính khấu trừ.',1),('DV03','Bảo hiểm ngập nước thủy kích',150000,'Gói bảo hiểm mở rộng đặc biệt phòng tránh rủi ro thời tiết ngập lụt.',1),('DV04','Giao xe tận nơi',150000,'Giao nhận xe tận nhà hoặc sân bay trong bán kính 15km từ cửa hàng.',1),('DV05','Giao xe ngoại thành',300000,'Hỗ trợ giao và nhận xe tại các khu vực ngoại thành trên 15km.',1),('DV06','Nhận xe tại điểm hẹn khác',120000,'Hỗ trợ khách hàng trả xe tại một địa điểm khác hệ thống cửa hàng.',1),('DV07','Ghế an toàn cho trẻ em',50000,'Ghế ngồi chuyên dụng cho trẻ em từ 1-5 tuổi, lắp đặt sẵn theo yêu cầu.',1),('DV08','Bộ phát Wifi di động',30000,'Thiết bị phát Wifi 4G tốc độ cao không giới hạn dung lượng trên xe.',1),('DV09','Giá đỡ điện thoại & Sạc',10000,'Bộ tẩu sạc nhanh kèm giá đỡ điện thoại thông minh gắn trên xe.',1),('DV10','Cámara hành trình thông minh',40000,'Thiết bị ghi hình hành trình trước sau kèm thẻ nhớ lưu trữ dữ liệu.',1),('DV11','Thuê tài xế theo ngày',500000,'Tài xế kinh nghiệm trên 5 năm, phục vụ tối đa 10 tiếng/ngày.',1),('DV12','Thuê tài xế tiếng Anh',800000,'Tài xế giao tiếp ngoại ngữ tốt, chuyên phục vụ khách nước ngoài.',1),('DV13','Tài xế lái xe đường dài',650000,'Tài xế chuyên chạy đường tỉnh, phục vụ các lộ trình xuyên đêm.',1),('DV14','Rửa xe khi trả',80000,'Trả xe không cần rửa, tiết kiệm thời gian cho khách hàng khi kết thúc chuyến đi.',1),('DV15','Vệ sinh nội thất khử mùi',250000,'Gói vệ sinh chuyên sâu bằng hơi nước nóng sau khi khách trả xe.',1),('DV16','Bảo hiểm chuyến đi (Gói VIP)',180000,'Gói bảo hiểm toàn diện cao cấp không giới hạn giá trị đền bù.',1),('DV17','Thuê tài xế theo ngày (Cuối tuần)',600000,'Phụ thu tài xế phục vụ vào các ngày thứ Bảy và Chủ Nhật.',1),('DV18','Giao xe tận nơi (Giờ cao điểm)',200000,'Giao xe nhanh chóng trong các khung giờ cao điểm kẹt xe.',1),('DV19','Ghế an toàn cho trẻ em (Sơ sinh)',50000,'Nôi nằm chuyên dụng an toàn cho trẻ sơ sinh dưới 1 tuổi.',1),('DV20','Bộ phát Wifi di động (Gói 5G)',50000,'Thiết bị phát Wifi 5G tốc độ siêu cao hỗ trợ nhiều thiết bị.',1),('DV21','Thuê tài xế lễ Tết',1000000,'Tài xế phục vụ các ngày lễ Tết nguyên đán (Hiện đang đóng).',0),('DV22','Dịch vụ trang trí xe hoa',400000,'Trang trí hoa giả cưới theo mẫu có sẵn trên xe (Tạm ngưng).',0),('DV23','Thuê lều cắm trại đi kèm',100000,'Bộ lều cắm trại 4 người xếp gọn cốp xe (Đang bảo trì).',0),('DV24','Bảo hiểm chuyến đi (Khuyến mãi)',0,'Gói bảo hiểm tặng kèm áp dụng cho các chương trình tri ân.',1),('DV25','Bóng che nắng ô tô',10000,'Trang bị thêm các tấm chắn nắng cho toàn bộ hệ thống kính xe.',1),('DV26','Bản đồ dẫn đường Vietmap',20000,'Cung cấp thiết bị hoặc tài khoản dẫn đường Vietmap bản quyền.',1),('DV27','Hộp y tế dự phòng cốp xe',15000,'Cung cấp bộ sơ cứu y tế cơ bản đặt sẵn trong cốp xe thuê.',1),('DV28','Thùng đá giữ nhiệt mini',30000,'Thuê kèm thùng đá giữ nhiệt dung tích 15L đặt ở hàng ghế sau.',1),('DV29','Dịch vụ trả xe muộn (Dưới 2h)',100000,'Hỗ trợ khách hàng gia hạn thời gian trả xe trễ tối đa 2 tiếng.',1),('DV30','Hỗ trợ cứu hộ 24/7 Premium',50000,'Gói dịch vụ cứu hộ kéo xe khẩn cấp miễn phí trên toàn quốc.',1);
/*!40000 ALTER TABLE `dichvu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_thue`
--

DROP TABLE IF EXISTS `don_thue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `don_thue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `ngay_thue` date NOT NULL,
  `ngay_tra` date NOT NULL,
  `tong_tien` decimal(15,2) NOT NULL,
  `trang_thai` varchar(50) DEFAULT 'Chờ duyệt',
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_thue`
--

LOCK TABLES `don_thue` WRITE;
/*!40000 ALTER TABLE `don_thue` DISABLE KEYS */;
INSERT INTO `don_thue` VALUES (1,1,1,'2026-09-05','2026-09-07',15000000.00,'Chờ duyệt','2026-09-01 14:39:25'),(2,1,2,'2026-08-20','2026-08-22',30000000.00,'Đã hoàn thành','2026-09-01 14:39:25');
/*!40000 ALTER TABLE `don_thue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichlaithu`
--

DROP TABLE IF EXISTS `lichlaithu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lichlaithu` (
  `MALICHLAITHU` varchar(10) NOT NULL,
  `MANGUOIDUNG` varchar(20) NOT NULL,
  `MAXE` varchar(20) DEFAULT NULL,
  `NGAYGIOLAITHU` datetime DEFAULT NULL,
  `TRANGTHAILICH` varchar(20) NOT NULL,
  `GHICHU` varchar(200) NOT NULL,
  PRIMARY KEY (`MALICHLAITHU`),
  KEY `fk_laithu_xe` (`MAXE`),
  KEY `fk_laithu_nguoidung` (`MANGUOIDUNG`),
  CONSTRAINT `fk_laithu_nguoidung` FOREIGN KEY (`MANGUOIDUNG`) REFERENCES `nguoidung` (`MANGUOIDUNG`),
  CONSTRAINT `fk_laithu_xe` FOREIGN KEY (`MAXE`) REFERENCES `xe` (`MAXE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichlaithu`
--

LOCK TABLES `lichlaithu` WRITE;
/*!40000 ALTER TABLE `lichlaithu` DISABLE KEYS */;
INSERT INTO `lichlaithu` VALUES ('LT01','ND001','X001','2026-09-01 09:00:00','Đã hoàn thành','Khách hàng hài lòng với công nghệ xe điện VF8.'),('LT02','ND002','X002','2026-09-01 10:30:00','Đã hoàn thành','Khách thích nội thất rộng rãi của Toyota Camry.'),('LT03','ND003','X003','2026-09-01 14:00:00','Đã hủy','Khách bận việc đột xuất xin hủy lịch thử Honda City.'),('LT04','ND004','X001','2026-09-01 15:30:00','Đã xác nhận','Yêu cầu kiểm tra pin xe VF8 trước khi khách đến.'),('LT05','ND005','X004','2026-09-02 08:30:00','Chờ duyệt','Khách muốn lái thử SantaFe bản máy dầu.'),('LT06','ND006','X005','2026-09-02 10:00:00','Chờ duyệt','Khách đăng ký lái thử dòng Mazda CX-5.'),('LT07','ND007','X003','2026-09-02 16:00:00','Đã xác nhận','Liên hệ nhắc lịch khách trước 30 phút.'),('LT08','ND008','X002','2026-09-03 09:15:00','Chờ duyệt','Khách muốn thử khả năng cách âm của Camry.'),('LT09','ND009','X004','2026-09-03 11:00:00','Chờ duyệt','Hẹn gặp khách hàng tại showroom trung tâm.'),('LT10','ND010','X005','2026-09-03 14:30:00','Chờ duyệt','Khách đi cùng gia đình để trải nghiệm không gian ghế sau.'),('LT11','ND011','X002','2026-09-04 09:00:00','Chờ duyệt','Yêu cầu nhân viên tư vấn đi kèm hỗ trợ.'),('LT12','ND012','X001','2026-09-04 13:30:00','Chờ duyệt','Khách muốn trải nghiệm tính năng trợ lý ảo trên VF8.'),('LT13','ND013','X004','2026-09-04 15:00:00','Đã hủy','Đổi sang lịch thuê chạy đường dài trực tiếp.'),('LT14','ND014','X005','2026-09-05 10:30:00','Chờ duyệt','Đăng ký chương trình trải nghiệm xe cuối tuần.'),('LT15','ND015','X003','2026-09-05 16:00:00','Chờ duyệt','Khách hàng yêu cầu hỗ trợ lái thử gần nhà.'),('LT16','ND016','X004','2026-09-06 09:00:00','Chờ duyệt','Khách muốn check camera 360 độ trên SantaFe.'),('LT17','ND017','X005','2026-09-06 11:00:00','Chờ duyệt','Khách muốn trải nghiệm cảm giác lái của Mazda.'),('LT18','ND018','X001','2026-09-06 14:00:00','Chờ duyệt','Yêu cầu kiểm tra bằng lái trước khi cho thử.'),('LT19','ND019','X002','2026-09-07 08:30:00','Chờ duyệt','Đăng ký thông qua ứng dụng di động.'),('LT20','ND020','X003','2026-09-07 10:30:00','Chờ duyệt','Khách hẹn gặp riêng tư vấn viên kinh doanh.'),('LT21','ND001','X003','2026-09-07 15:00:00','Chờ duyệt','Thử nghiệm khả năng tăng tốc của xe City.'),('LT22','ND002','X004','2026-09-08 09:30:00','Chờ duyệt','Kiểm tra độ ồn khoang cabin xe SantaFe.'),('LT23','ND003','X006','2026-09-08 14:00:00','Chờ duyệt','Khách muốn lái thử dòng bán tải Ford Ranger Wildtrak.'),('LT24','ND004','X001','2026-09-08 16:30:00','Chờ duyệt','Khách muốn test tính năng ADAS tự động lái.'),('LT25','ND005','X002','2026-09-09 10:00:00','Chờ duyệt','Cần tư vấn thêm phương án trả góp sau lái thử.'),('LT26','ND006','X006','2026-09-09 13:30:00','Chờ duyệt','Khách muốn thử sức kéo và tải trọng của Ford Ranger.'),('LT27','ND007','X003','2026-09-09 15:30:00','Chờ duyệt','Yêu cầu bật sẵn điều hòa làm mát xe trước.'),('LT28','ND008','X001','2026-09-10 09:00:00','Chờ duyệt','Khách muốn chạy thử xe điện ngoài đường trường.'),('LT29','ND009','X004','2026-09-10 11:00:00','Chờ duyệt','Đăng ký lái thử kết hợp tham quan xưởng dịch vụ.'),('LT30','ND010','X002','2026-09-10 14:30:00','Chờ duyệt','Khách hàng muốn chốt cọc ngay nếu chạy thử ưng ý.');
/*!40000 ALTER TABLE `lichlaithu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lotrinhxe`
--

DROP TABLE IF EXISTS `lotrinhxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lotrinhxe` (
  `MALOTRINH` int(11) NOT NULL AUTO_INCREMENT,
  `MADATXE` varchar(20) NOT NULL,
  `THOIGIAN` datetime NOT NULL,
  `TOADO` varchar(50) NOT NULL,
  `VANTOC` int(11) NOT NULL,
  PRIMARY KEY (`MALOTRINH`),
  KEY `fk_lotrinhxe_datxe` (`MADATXE`),
  CONSTRAINT `fk_lotrinhxe_datxe` FOREIGN KEY (`MADATXE`) REFERENCES `datxe` (`MADATXE`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lotrinhxe`
--

LOCK TABLES `lotrinhxe` WRITE;
/*!40000 ALTER TABLE `lotrinhxe` DISABLE KEYS */;
INSERT INTO `lotrinhxe` VALUES (1,'DX001','2026-02-01 08:15:00','10.7769, 106.7009',45),(2,'DX001','2026-02-01 08:30:00','10.7626, 106.6601',50),(3,'DX001','2026-02-01 08:45:00','10.7289, 106.7036',30),(4,'DX001','2026-02-01 09:00:00','10.7324, 106.7150',0),(5,'DX002','2026-02-05 08:00:00','21.0285, 105.8542',35),(6,'DX002','2026-02-05 08:15:00','21.0368, 105.8342',40),(7,'DX002','2026-02-05 08:30:00','21.0227, 105.7892',55),(8,'DX003','2026-08-06 08:30:00','16.0544, 108.2022',50),(9,'DX003','2026-08-06 08:45:00','15.9922, 108.2783',60),(10,'DX003','2026-08-06 09:00:00','15.8801, 108.3380',45),(11,'DX004','2026-02-15 06:45:00','10.8016, 106.7594',70),(12,'DX004','2026-02-15 07:00:00','10.8251, 106.8402',90),(13,'DX004','2026-02-15 07:15:00','10.9125, 107.0254',95),(14,'DX006','2026-08-05 07:45:00','10.6823, 106.8041',55),(15,'DX006','2026-08-05 08:15:00','10.5147, 107.1125',65),(16,'DX006','2026-08-05 08:45:00','10.3541, 107.0850',40),(17,'DX010','2026-08-06 09:15:00','10.7934, 106.6605',25),(18,'DX010','2026-08-06 09:30:00','10.8012, 106.6502',15),(19,'DX010','2026-08-06 09:45:00','10.8155, 106.6520',0),(20,'DX015','2026-08-07 08:30:00','12.2458, 109.1942',40),(21,'DX015','2026-08-07 09:00:00','12.2589, 109.1811',50),(22,'DX019','2026-08-05 09:00:00','10.8752, 106.7841',45),(23,'DX019','2026-08-05 09:30:00','10.9804, 106.6742',50),(24,'DX023','2026-08-04 08:30:00','10.9574, 106.8426',40),(25,'DX023','2026-08-04 09:00:00','10.9612, 106.9105',55),(26,'DX027','2026-08-05 09:15:00','21.0024, 105.9541',75),(27,'DX027','2026-08-05 09:45:00','20.8625, 106.6824',60);
/*!40000 ALTER TABLE `lotrinhxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoidung` (
  `MANGUOIDUNG` varchar(20) NOT NULL,
  `HOTEN` varchar(50) NOT NULL,
  `SĐT` varchar(20) NOT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `ANHCCCD` varchar(255) DEFAULT NULL,
  `NGAYTAO` datetime NOT NULL,
  `SOBANGLAIXE` varchar(25) DEFAULT NULL,
  `VAITRO` varchar(20) NOT NULL DEFAULT 'khach',
  `MATKHAU` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`MANGUOIDUNG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES ('AD001','Quản trị viên','0900000001','admin@ktshowroom.vn',NULL,'2026-09-02 00:50:43',NULL,'admin','$2y$10$kP7I4kfZy3.XE8xl/R4T/uf0sWVfbMMtSWMullzsWPNPZow03QUzO'),('ND001','Nguyễn Văn Nam','0912345678','vannam.nguyen@gmail.com','cccd_nd001.jpg','2026-01-15 08:30:00','790123456789','khach',NULL),('ND002','Trần Thị Bích','0987654321','thibich.tran@yahoo.com','cccd_nd002.jpg','2026-01-18 14:15:00','790987654321','khach',NULL),('ND003','Lê Hoàng Lan','0905123456','hoanglan.le@outlook.com','cccd_nd003.jpg','2026-01-20 09:45:00','480123456789','khach',NULL),('ND004','Phạm Minh Quân','0934567890','minhquan.pham@gmail.com','cccd_nd004.jpg','2026-01-22 16:20:00','010123456789','khach',NULL),('ND005','Vũ Hoàng Bách','0978123456','hoangbach.vu@gmail.com','cccd_nd005.jpg','2026-01-25 11:10:00','360123456789','khach',NULL),('ND006','Hoàng Lệ Thủy','0962345678','lethuy.hoang@gmail.com','cccd_nd006.jpg','2026-02-01 10:05:00','750123456789','khach',NULL),('ND007','Đặng Anh Tú','0945678901','anhtu.dang@gmail.com','cccd_nd007.jpg','2026-02-03 15:30:00','790234567890','khach',NULL),('ND008','Bùi Tiến Dũng','0919876543','tiendung.bui@yahoo.com','cccd_nd008.jpg','2026-02-05 08:20:00','300123456789','khach',NULL),('ND009','Đỗ Minh Trí','0981234567','minhtri.do@gmail.com','cccd_nd009.jpg','2026-02-08 13:40:00','350123456789','khach',NULL),('ND010','Ngô Quốc Bảo','0903456789','quocbao.ngo@outlook.com','cccd_nd010.jpg','2026-02-10 17:50:00','460123456789','khach',NULL),('ND011','Dương Khánh Linh','0938765432','khanhlinh.duong@gmail.com','cccd_nd011.jpg','2026-02-12 09:15:00','790345678901','khach',NULL),('ND012','Lý Thành Long','0975678901','thanhlong.ly@gmail.com','cccd_nd012.jpg','2026-02-15 14:00:00','520123456789','khach',NULL),('ND013','Phan Thu Thủy','0918123456','thuthuy.phan@yahoo.com','cccd_nd013.jpg','2026-02-18 11:25:00','600123456789','khach',NULL),('ND014','Mai Đức Trung','0949876543','ductrung.mai@gmail.com','cccd_nd014.jpg','2026-02-20 16:10:00','790456789012','khach',NULL),('ND015','Trịnh Hữu Phước','0986543210','huuphuoc.trinh@gmail.com','cccd_nd015.jpg','2026-02-22 08:55:00','380123456789','khach',NULL),('ND016','Đoàn Đình Khang','0907654321','dinhkhang.doan@outlook.com','cccd_nd016.jpg','2026-02-25 13:20:00','400123456789','khach',NULL),('ND017','Đinh Thanh Hải','0932345678','thanhhai.dinh@gmail.com','cccd_nd017.jpg','2026-03-01 10:45:00','790567890123','khach',NULL),('ND018','Lâm Thùy Dung','0979876543','thuydung.lam@gmail.com','cccd_nd018.jpg','2026-03-03 15:05:00','640123456789','khach',NULL),('ND019','Phùng Tiến Đạt','0917654321','tiendat.phung@yahoo.com','cccd_nd019.jpg','2026-03-05 09:30:00','310123456789','khach',NULL),('ND020','Tống Ngọc Anh','0943456789','ngocanh.tong@gmail.com','cccd_nd020.jpg','2026-03-08 14:40:00','790678901234','khach',NULL),('ND021','Hà Minh Đức','0984567890','minhduc.ha@gmail.com','cccd_nd021.jpg','2026-03-10 11:15:00','340123456789','khach',NULL),('ND022','Tạ Quang Huy','0902345678','quanghuy.ta@outlook.com','cccd_nd022.jpg','2026-03-12 16:50:00','440123456789','khach',NULL),('ND023','Vương Kim Yến','0931234567','kimyen.vuong@gmail.com','cccd_nd023.jpg','2026-03-15 08:10:00','790789012345','khach',NULL),('ND024','Trần Nhật Minh','0971234567','nhatminh.tran@gmail.com','cccd_nd024.jpg','2026-03-18 13:55:00','770123456789','khach',NULL),('ND025','Nguyễn Bích Ngọc','0916789012','bichngoc.nguyen@yahoo.com','cccd_nd025.jpg','2026-03-20 10:20:00','720123456789','khach',NULL),('ND026','Lê Cao Cường','0948901234','caocuong.le@gmail.com','cccd_nd026.jpg','2026-03-22 15:40:00','790890123456','khach',NULL),('ND027','Phạm Quỳnh Hương','0989012345','quynhhuong.pham@gmail.com','cccd_nd027.jpg','2026-03-25 09:05:00','370123456789','khach',NULL),('ND028','Vũ Tuyết Mai','0908901234','tuyetmai.vu@outlook.com','cccd_nd028.jpg','2026-03-28 14:15:00','450123456789','khach',NULL),('ND029','Hoàng Gia Bảo','0939012345','giabao.hoang@gmail.com','cccd_nd029.jpg','2026-04-01 11:30:00','790901234567','khach',NULL),('ND030','Đặng Hồng Nhung','0979012345','hongnhung.dang@gmail.com','cccd_nd030.jpg','2026-04-03 16:45:00','670123456789','khach',NULL);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Cột phục vụ khóa đăng nhập: sai mật khẩu 3 lần → khóa 30 phút (bổ sung 2026-09)
--
ALTER TABLE `nguoidung`
  ADD COLUMN IF NOT EXISTS `SOLANDANGNHAPSAI` int(11) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `KHOADENLUC` datetime DEFAULT NULL;

--
-- Table structure for table `thanhtoan`
--

DROP TABLE IF EXISTS `thanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thanhtoan` (
  `MATHANHTOAN` varchar(20) NOT NULL,
  `MADATXE` varchar(20) NOT NULL,
  `PTTT` varchar(50) NOT NULL,
  `MAGIAODICH` varchar(50) DEFAULT NULL,
  `TTTT` varchar(50) NOT NULL,
  `SOTIENTRA` int(11) NOT NULL,
  `TGTT` datetime DEFAULT NULL,
  PRIMARY KEY (`MATHANHTOAN`),
  KEY `fk_thanhtoan_datxe` (`MADATXE`),
  CONSTRAINT `fk_thanhtoan_datxe` FOREIGN KEY (`MADATXE`) REFERENCES `datxe` (`MADATXE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanhtoan`
--

LOCK TABLES `thanhtoan` WRITE;
/*!40000 ALTER TABLE `thanhtoan` DISABLE KEYS */;
INSERT INTO `thanhtoan` VALUES ('TT001','DX001','Chuyển khoản','FT260281030','Đã thanh toán',2400000,'2026-01-28 10:35:00'),('TT002','DX002','Chuyển khoản','FT260211520','Đã thanh toán',3000000,'2026-02-01 15:22:00'),('TT003','DX003','Ví điện tử','MOMO8040915','Đã thanh toán',2100000,'2026-08-04 09:16:00'),('TT004','DX004','Chuyển khoản','FT260101400','Đã thanh toán',2800000,'2026-02-10 14:05:00'),('TT005','DX005','Chuyển khoản','FT260181145','Đã thanh toán',2200000,'2026-02-18 11:48:00'),('TT006','DX006','Ví điện tử','VNPAY802163','Đã thanh toán',2400000,'2026-08-02 16:32:00'),('TT007','DX007','Tiền mặt','TM301090000','Đã thanh toán',500000,'2026-03-01 18:00:00'),('TT008','DX008','Chuyển khoản','FT260310820','Đã thanh toán',6000000,'2026-03-01 08:25:00'),('TT009','DX009','Ví điện tử','MOMO3091310','Đã thanh toán',1300000,'2026-03-09 13:12:00'),('TT010','DX010','Chuyển khoản','FT260851425','Đã thanh toán',2100000,'2026-08-05 14:26:00'),('TT011','DX011','Chuyển khoản','FT260350900','Đã thanh toán',1700000,'2026-03-15 09:02:00'),('TT012','DX012','Ví điện tử','VNPAY320111','Đã thanh toán',2700000,'2026-03-20 11:18:00'),('TT013','DX013','Chuyển khoản','FT260381540','Đã thanh toán',3200000,'2026-03-28 15:44:00'),('TT014','DX014','Tiền mặt','TM405080000','Đã thanh toán',950000,'2026-04-06 18:00:00'),('TT015','DX015','Chuyển khoản','FT260860850','Đã thanh toán',3900000,'2026-08-06 08:52:00'),('TT016','DX016','Ví điện tử','MOMO4081615','Đã thanh toán',2200000,'2026-04-08 16:18:00'),('TT017','DX017','Chuyển khoản','FT260451340','Đã thanh toán',1600000,'2026-04-15 13:42:00'),('TT018','DX018','Chuyển khoản','FT260400920','Đã thanh toán',700000,'2026-04-20 09:22:00'),('TT019','DX019','Ví điện tử','VNPAY803111','Đã thanh toán',3600000,'2026-08-03 11:12:00'),('TT020','DX020','Chuyển khoản','FT260481450','Đã thanh toán',7500000,'2026-04-28 14:55:00'),('TT021','DX021','Chuyển khoản','FT260551030','Đã thanh toán',5600000,'2026-05-05 10:33:00'),('TT022','DX022','Chuyển khoản',NULL,'Chưa thanh toán',0,NULL),('TT023','DX023','Ví điện tử','MOMO8010905','Đã thanh toán',5600000,'2026-08-01 09:06:00'),('TT024','DX024','Chuyển khoản','FT260516150','Đã thanh toán',2200000,'2026-05-15 16:18:00'),('TT025','DX025','Ví điện tử','VNPAY520113','Đã thanh toán',2000000,'2026-05-20 11:32:00'),('TT026','DX026','Chuyển khoản','FT260581400','Đã thanh toán',1400000,'2026-05-28 14:02:00'),('TT027','DX027','Chuyển khoản','FT260830925','Đã thanh toán',4000000,'2026-08-03 09:26:00'),('TT028','DX028','Ví điện tử','MOMO6051010','Đã thanh toán',2800000,'2026-06-05 10:12:00'),('TT029','DX029','Chuyển khoản',NULL,'Chưa thanh toán',0,NULL),('TT030','DX030','Chuyển khoản','FT260611200','Đã thanh toán',3000000,'2026-06-15 11:22:00');
/*!40000 ALTER TABLE `thanhtoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xe`
--

DROP TABLE IF EXISTS `xe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xe` (
  `MAXE` varchar(20) NOT NULL,
  `TENXE` varchar(30) NOT NULL,
  `LOAIXE` varchar(30) NOT NULL,
  `MAU` varchar(30) NOT NULL,
  `BIENSOXE` varchar(20) NOT NULL,
  `ODO` int(11) NOT NULL,
  `TRANGTHAIXE` varchar(50) NOT NULL,
  `GIATHEONGAY` int(11) NOT NULL,
  `TIENDATCOC` int(11) DEFAULT NULL,
  `HINHANH` varchar(255) DEFAULT NULL,
  `MOTA` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`MAXE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xe`
--

LOCK TABLES `xe` WRITE;
/*!40000 ALTER TABLE `xe` DISABLE KEYS */;
INSERT INTO `xe` VALUES ('X001','VinFast VF8','SUV 5 chỗ','Đen','51K-123.45',15200,'Sẵn sàng',1200000,5000000,'/images/cars/porsche_cayenne.png','Xe điện thông minh, rộng rãi, công nghệ hiện đại'),('X002','Toyota Camry','Sedan 5 chỗ','Trắng','30H-678.90',28400,'Sẵn sàng',1500000,10000000,'/images/cars/bmw_530i.png','Xe sang trọng, lịch lãm, thích hợp gặp đối tác'),('X003','Honda City','Sedan 5 chỗ','Đỏ','43A-555.21',42100,'Đang thuê',700000,3000000,'/images/cars/honda_city_trang.png','Xe phân khúc B tiết kiệm nhiên liệu, dễ lái trong phố'),('X004','Hyundai SantaFe','SUV 7 chỗ','Vàng cát','60A-888.88',35000,'Sẵn sàng',1400000,8000000,'/images/cars/porsche_trang.png','Xe gia đình 7 chỗ máy dầu mạnh mẽ, nội thất tiện nghi'),('X005','Mazda CX-5','CUV 5 chỗ','Xám','51L-432.10',19800,'Bảo trì',1000000,5000000,'/images/cars/mazda_6_xam.png','Thiết kế Kodo trẻ trung, trang bị nhiều tính năng an toàn'),('X006','Ford Ranger Wildtrak','Bán tải 5 chỗ','Cam','29H-111.22',53000,'Sẵn sàng',1100000,5000000,'/images/cars/porsche_cayenne.png','Xe bán tải đa dụng, gầm cao vượt địa hình tốt'),('X007','Mitsubishi Xpander','MPV 7 chỗ','Bạc','72A-345.67',62000,'Đang thuê',800000,3000000,'/images/cars/mercedes_gle_trang.png','Xe 7 chỗ quốc dân, rộng rãi cho cả gia đình đi du lịch'),('X008','Kia Morning','Hatchback 4 chỗ','Trắng','51K-999.11',75000,'Sẵn sàng',500000,2000000,'/images/cars/vios_do.png','Xe nhỏ gọn, di chuyển linh hoạt, giá thuê hạt dẻ'),('X009','VinFast VF9','SUV 7 chỗ','Xanh dương','30K-222.33',8900,'Sẵn sàng',2000000,15000000,'/images/cars/mercedes_benz_450.png','Chủ tịch xe điện, cực kỳ rộng rãi và đẳng cấp'),('X010','Toyota Vios','Sedan 5 chỗ','Vàng cát','51G-567.89',88000,'Sẵn sàng',650000,3000000,'/images/cars/toyota_vios_2024_front_1787641127844.png','Xe bền bỉ, điều hòa mát sâu, tiết kiệm xăng'),('X011','Hyundai Accent','Sedan 5 chỗ','Đen','37A-444.55',31000,'Đang thuê',700000,3000000,'/images/cars/bmw_530i_den.png','Option phong phú, kiểu dáng thể thao trẻ trung'),('X012','Mazda 3','Sedan 5 chỗ','Đỏ','47A-123.99',25000,'Sẵn sàng',850000,4000000,'/images/cars/mazda_6_do.png','Nội thất tiệm cận xe sang, cách âm tốt'),('X013','Kia Seltos','SUV 5 chỗ','Trắng nóc đen','61A-777.66',27500,'Sẵn sàng',900000,4000000,'/images/cars/porsche_trang.png','Gầm cao đô thị thời trang, không gian thoải mái'),('X014','Ford Everest','SUV 7 chỗ','Đen','51K-888.99',41000,'Sẵn sàng',1600000,10000000,'/images/cars/bentley_den.png','Cơ bắp Mỹ, đi đường trường cực đầm và chắc chắn'),('X015','Toyota Fortuner','SUV 7 chỗ','Bạc','30F-555.66',95000,'Bảo trì',1300000,7000000,'/images/cars/porsche_cayenne.png','Xe gầm cao máy dầu bền bỉ thách thức mọi cung đường'),('X016','VinFast VF6','SUV 5 chỗ','Xám','51L-888.12',6400,'Sẵn sàng',950000,4000000,'/images/cars/mazda6_2024_back.png','Xe điện cỡ B năng động, gia tốc tốt'),('X017','Honda CR-V','SUV 7 chỗ','Trắng','30G-999.99',48000,'Đang thuê',1300000,7000000,'/images/cars/mercedes_gle_trang.png','Xe gia đình cao cấp, vận hành êm ái, an toàn cao'),('X018','Hyundai Tucson','SUV 5 chỗ','Đỏ','75A-222.11',33000,'Sẵn sàng',1100000,5000000,'/images/cars/bentley_gt.png','Thiết kế tương lai, khoảng trống ngồi chân rộng rãi'),('X019','Suzuki XL7','MPV 7 chỗ','Khaki','65A-888.77',51000,'Sẵn sàng',800000,3000000,'/images/cars/mercedes_benz_450.png','Xe nhập khẩu nguyên chiếc, thực dụng và tiết kiệm'),('X020','VinFast VF5','SUV 5 chỗ','Xanh VinFast','51K-777.88',18000,'Sẵn sàng',700000,3000000,'/images/cars/toyota-vios-right.png','Xe điện đô thị nhỏ gọn, chi phí vận hành siêu rẻ'),('X021','Toyota Innova Cross','MPV 7 chỗ','Trắng','30L-111.45',12000,'Đang thuê',1200000,5000000,'/images/cars/mercedes_gle_trang.png','Thế hệ mới khung gầm liền khối cực êm, rộng rãi'),('X022','Kia Carnival','MPV 7 chỗ','Đen','51K-666.88',39000,'Sẵn sàng',2500000,20000000,'/images/cars/bentley_den.png','Chuyên cơ mặt đất, ghế thương gia, siêu rộng rãi'),('X023','BMW 320i','Sedan 5 chỗ','Trắng','30H-999.88',22000,'Sẵn sàng',2800000,30000000,'/images/cars/bmw_530i.png','Xe sang thể thao cảm giác lái phấn khích'),('X024','Mercedes C200','Sedan 5 chỗ','Đen','51L-555.55',26000,'Sẵn sàng',3000000,30000000,'/images/cars/mercedes_benz_450.png','Đẳng cấp doanh nhân, nội thất đèn led rực rỡ'),('X025','Hyundai Custin','MPV 7 chỗ','Bạc','60L-222.88',14500,'Đang thuê',1400000,8000000,'/images/cars/porsche_trang.png','Cửa lùa tự động tiện lợi, ghế có chế độ thư giãn'),('X026','Mazda 6','Sedan 5 chỗ','Trắng','43A-666.77',47000,'Sẵn sàng',1100000,5000000,'/images/cars/mazda6_2024_front.png','Sedan hạng D lịch lãm, đi đầm chắc'),('X027','Ford Territory','SUV 5 chỗ','Trắng','30K-777.99',16000,'Sẵn sàng',1000000,5000000,'/images/cars/porsche_cayenne.png','Nội thất toàn màn hình lớn, siêu rộng trong phân khúc'),('X028','Toyota Raize','SUV 5 chỗ','Đỏ nóc đen','51K-333.44',21000,'Sẵn sàng',700000,3000000,'/images/cars/honda_city_2024_right.png','Xe gầm cao cỡ nhỏ phù hợp cho gia đình trẻ'),('X029','Honda Civic','Sedan 5 chỗ','Xám','30H-888.11',34000,'Đang thuê',1000000,5000000,'/images/cars/honda_city_2024_front.png','Kiểu dáng sedan thể thao bản lĩnh, lái hay'),('X030','VinFast VF7','SUV 5 chỗ','Xanh hỏa long','51L-999.88',5500,'Sẵn sàng',1400000,8000000,'/images/cars/porsche_trang.png','Thiết kế phi thuyền cực ngầu, tăng tốc xé gió'),('XM001','Honda Vision 2024','Xe ga scooter','Trắng','59A3-11111',5000,'Sẵn sàng',150000,1000000,'/images/motobike/airblade_den.png','Xe ga quốc dân, tiết kiệm xăng, chạy êm.'),('XM002','Honda SH 160i','Xe ga scooter','Đen mờ','59A3-22222',2000,'Sẵn sàng',350000,3000000,'/images/motobike/sh_trang.png','Xe ga cao cấp, sang trọng, động cơ mạnh mẽ.'),('XM003','Yamaha Grande','Xe ga scooter','Đỏ mận','59A3-33333',8000,'Sẵn sàng',160000,1000000,'/images/motobike/nvx_cam.png','Kiểu dáng thời trang, cốp rộng, thích hợp cho nữ.'),('XM004','Honda Air Blade 160','Xe ga scooter','Xám xi măng','59A3-44444',4500,'Sẵn sàng',200000,1500000,'/images/motobike/airblade_bac.png','Thiết kế thể thao, nam tính, vận hành đầm chắc.'),('XM005','Yamaha Exciter 155','Xe số manual','Xanh GP','59A3-55555',6000,'Sẵn sàng',180000,1500000,'/images/motobike/ex_xanh.png','Xe côn tay mạnh mẽ, trải nghiệm lái phấn khích.'),('XM006','Honda Winner X v4','Xe số manual','Đỏ đen','59A3-66666',3500,'Sẵn sàng',170000,1500000,'/images/motobike/ex_den.png','Xe côn tay thể thao, phanh ABS an toàn.'),('XM007','Honda Wave Alpha','Xe số manual','Xanh nhớt','59A3-77777',12000,'Sẵn sàng',100000,500000,'/images/motobike/wave_xanh.png','Xe số bền bỉ, tiết kiệm xăng tối đa, dễ chạy.'),('XM008','Yamaha Sirius FI','Xe số manual','Trắng đen','59A3-88888',9500,'Sẵn sàng',110000,500000,'/images/motobike/wave_trang.png','Xe số nhỏ gọn, tăng tốc mượt mà.'),('XM009','VinFast Evo 200','Xe điện electric','Vàng','59A3-99999',1500,'Sẵn sàng',120000,1000000,'/images/motobike/vinfast_vang.png','Xe máy điện thông minh, di chuyển linh hoạt.'),('XM010','VinFast Feliz S','Xe điện electric','Xanh rêu','59A3-00000',3000,'Sẵn sàng',150000,1500000,'/images/motobike/vinfast_trang.png','Xe điện công suất lớn, cốp rộng, đi chuyển xa.');
/*!40000 ALTER TABLE `xe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Cột phân loại phương tiện: 'oto' | 'xemay' (bổ sung 2026-09)
--
ALTER TABLE `xe` ADD COLUMN IF NOT EXISTS `PHANLOAI` varchar(10) NOT NULL DEFAULT 'oto';
UPDATE `xe` SET `PHANLOAI` = 'xemay'
  WHERE `MAXE` LIKE 'XM%'
     OR `LOAIXE` LIKE '%scooter%' OR `LOAIXE` LIKE '%manual%' OR `LOAIXE` LIKE '%electric%';

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
