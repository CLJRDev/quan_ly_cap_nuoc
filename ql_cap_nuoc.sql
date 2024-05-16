-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2024 at 02:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ql_cap_nuoc`
--

-- --------------------------------------------------------

--
-- Table structure for table `dm_chinhanh`
--

CREATE TABLE `dm_chinhanh` (
  `ma_chi_nhanh` int(11) NOT NULL,
  `ten_chi_nhanh` varchar(50) NOT NULL,
  `dia_chi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_chinhanh`
--

INSERT INTO `dm_chinhanh` (`ma_chi_nhanh`, `ten_chi_nhanh`, `dia_chi`) VALUES
(1, 'Hải Phòng 2', '34/46');

-- --------------------------------------------------------

--
-- Table structure for table `dm_codongho`
--

CREATE TABLE `dm_codongho` (
  `ma_co_dong_ho` int(11) NOT NULL,
  `ten_co_dong_ho` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_codongho`
--

INSERT INTO `dm_codongho` (`ma_co_dong_ho`, `ten_co_dong_ho`) VALUES
(1, 'A'),
(2, 'B');

-- --------------------------------------------------------

--
-- Table structure for table `dm_loaidongho`
--

CREATE TABLE `dm_loaidongho` (
  `ma_loai_dong_ho` int(11) NOT NULL,
  `ten_loai_dong_ho` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_loaidongho`
--

INSERT INTO `dm_loaidongho` (`ma_loai_dong_ho`, `ten_loai_dong_ho`) VALUES
(1, 'A'),
(2, 'B');

-- --------------------------------------------------------

--
-- Table structure for table `dm_loaikhachhang`
--

CREATE TABLE `dm_loaikhachhang` (
  `ma_loai_khach_hang` int(11) NOT NULL,
  `ten_loai_khach_hang` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_loaikhachhang`
--

INSERT INTO `dm_loaikhachhang` (`ma_loai_khach_hang`, `ten_loai_khach_hang`) VALUES
(2, 'Doanh nghiệp'),
(1, 'Khách hàng');

-- --------------------------------------------------------

--
-- Table structure for table `dm_nhacungcap`
--

CREATE TABLE `dm_nhacungcap` (
  `ma_nha_cung_cap` int(11) NOT NULL,
  `ten_nha_cung_cap` varchar(100) NOT NULL,
  `dia_chi` text DEFAULT NULL,
  `sdt` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_nhacungcap`
--

INSERT INTO `dm_nhacungcap` (`ma_nha_cung_cap`, `ten_nha_cung_cap`, `dia_chi`, `sdt`) VALUES
(1, 'A', 'AAA', NULL),
(2, 'B', 'BBB', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dm_phuongxa`
--

CREATE TABLE `dm_phuongxa` (
  `ma_phuong_xa` int(11) NOT NULL,
  `ten_phuong_xa` varchar(50) NOT NULL,
  `ma_quan_huyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_phuongxa`
--

INSERT INTO `dm_phuongxa` (`ma_phuong_xa`, `ten_phuong_xa`, `ma_quan_huyen`) VALUES
(1, 'Hàng Kênh', 1),
(2, 'Dư Hàng Kênh', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dm_ptthanhtoan`
--

CREATE TABLE `dm_ptthanhtoan` (
  `ma_phuong_thuc` int(11) NOT NULL,
  `ten_phuong_thuc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dm_quanhuyen`
--

CREATE TABLE `dm_quanhuyen` (
  `ma_quan_huyen` int(11) NOT NULL,
  `ten_quan_huyen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_quanhuyen`
--

INSERT INTO `dm_quanhuyen` (`ma_quan_huyen`, `ten_quan_huyen`) VALUES
(1, 'Lê Chân'),
(3, 'Ngô Quyền');

-- --------------------------------------------------------

--
-- Table structure for table `dm_quyen`
--

CREATE TABLE `dm_quyen` (
  `ma_quyen` int(11) NOT NULL,
  `ten_quyen` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_quyen`
--

INSERT INTO `dm_quyen` (`ma_quyen`, `ten_quyen`, `trang_thai`) VALUES
(1, 'Quản trị viên', 1),
(2, 'Thu ngân', 0),
(5, 'Nhân viên', 0),
(6, 'Trưởng phòng', 1),
(7, 'Quản lý', 1),
(8, 'Thanh tra', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dm_toquanly`
--

CREATE TABLE `dm_toquanly` (
  `ma_to_quan_ly` int(11) NOT NULL,
  `ten_to_quan_ly` varchar(50) NOT NULL,
  `ma_chi_nhanh` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_toquanly`
--

INSERT INTO `dm_toquanly` (`ma_to_quan_ly`, `ten_to_quan_ly`, `ma_chi_nhanh`) VALUES
(1, 'Tổ 2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dm_tuyendoc`
--

CREATE TABLE `dm_tuyendoc` (
  `ma_tuyen` int(11) NOT NULL,
  `ten_tuyen` varchar(100) NOT NULL,
  `ma_phuong_xa` int(11) NOT NULL,
  `ma_to_quan_ly` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_tuyendoc`
--

INSERT INTO `dm_tuyendoc` (`ma_tuyen`, `ten_tuyen`, `ma_phuong_xa`, `ma_to_quan_ly`) VALUES
(1, 'A', 1, 1),
(2, 'B', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ls_donghokhoi`
--

CREATE TABLE `ls_donghokhoi` (
  `ma_lich_su` int(11) NOT NULL,
  `ky_chi_so` varchar(50) NOT NULL,
  `tu_ngay` date NOT NULL,
  `den_ngay` date NOT NULL,
  `khoa` int(11) NOT NULL,
  `chi_so_cu` int(11) NOT NULL,
  `chi_so_moi` int(11) NOT NULL,
  `so_tieu_thu` int(11) NOT NULL,
  `ma_dong_ho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ls_donghokhoi`
--

INSERT INTO `ls_donghokhoi` (`ma_lich_su`, `ky_chi_so`, `tu_ngay`, `den_ngay`, `khoa`, `chi_so_cu`, `chi_so_moi`, `so_tieu_thu`, `ma_dong_ho`) VALUES
(1, '1A', '2024-04-02', '2024-04-10', 1, 0, 10, 10, 1),
(2, '1B', '2024-04-10', '2024-06-10', 1, 10, 20, 10, 1),
(3, '2A', '2024-04-02', '2024-04-10', 1, 0, 15, 15, 2),
(4, '2B', '2024-04-10', '2024-06-10', 1, 15, 20, 5, 2),
(5, '1C', '2024-04-10', '2024-06-10', 1, 20, 30, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ql_donghokhach`
--

CREATE TABLE `ql_donghokhach` (
  `ma_dong_ho` int(11) NOT NULL,
  `ten_dong_ho` varchar(50) NOT NULL,
  `tinh_trang` int(11) NOT NULL,
  `nam_san_xuat` int(11) NOT NULL,
  `so_seri` int(11) NOT NULL,
  `ngay_nhap` date NOT NULL,
  `ngay_kiem_dinh` date NOT NULL,
  `so_nam_hieu_luc` int(11) NOT NULL,
  `so_thang_bao_hanh` int(11) NOT NULL,
  `ma_loai_dong_ho` int(11) NOT NULL,
  `ma_nha_cung_cap` int(11) NOT NULL,
  `ma_co_dong_ho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ql_donghokhoi`
--

CREATE TABLE `ql_donghokhoi` (
  `ma_dong_ho` int(11) NOT NULL,
  `ten_dong_ho` varchar(50) NOT NULL,
  `tinh_trang` int(11) NOT NULL,
  `ngay_nhap` date NOT NULL,
  `ngay_kiem_dinh` date NOT NULL,
  `so_nam_hieu_luc` int(11) NOT NULL,
  `so_thang_bao_hanh` int(11) NOT NULL,
  `ma_loai_dong_ho` int(11) NOT NULL,
  `ma_nha_cung_cap` int(11) NOT NULL,
  `ma_co_dong_ho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ql_donghokhoi`
--

INSERT INTO `ql_donghokhoi` (`ma_dong_ho`, `ten_dong_ho`, `tinh_trang`, `ngay_nhap`, `ngay_kiem_dinh`, `so_nam_hieu_luc`, `so_thang_bao_hanh`, `ma_loai_dong_ho`, `ma_nha_cung_cap`, `ma_co_dong_ho`) VALUES
(1, 'A', 1, '2020-10-19', '2021-10-19', 3, 14, 1, 2, 2),
(2, 'B', 1, '2020-10-19', '2021-10-19', 3, 14, 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ql_hopdong`
--

CREATE TABLE `ql_hopdong` (
  `ma_hop_dong` int(11) NOT NULL,
  `ten_nguoi_dai_dien` varchar(50) NOT NULL,
  `chuc_vu_nguoi_dai_dien` varchar(50) NOT NULL,
  `dia_chi` text NOT NULL,
  `ngay_lap` date NOT NULL,
  `ma_khach_hang` int(11) NOT NULL,
  `ma_dong_ho` int(11) NOT NULL,
  `ma_nhom_gia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ql_hopdong`
--

INSERT INTO `ql_hopdong` (`ma_hop_dong`, `ten_nguoi_dai_dien`, `chuc_vu_nguoi_dai_dien`, `dia_chi`, `ngay_lap`, `ma_khach_hang`, `ma_dong_ho`, `ma_nhom_gia`) VALUES
(1, 'Hiền', 'Người yêu', 'chợ lũng', '2024-05-11', 1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `ql_khachhang`
--

CREATE TABLE `ql_khachhang` (
  `ma_khach_hang` int(11) NOT NULL,
  `ten_khach_hang` varchar(50) NOT NULL,
  `dia_chi` text NOT NULL,
  `sdt` int(10) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ql_khachhang`
--

INSERT INTO `ql_khachhang` (`ma_khach_hang`, `ten_khach_hang`, `dia_chi`, `sdt`, `email`) VALUES
(1, 'Phạm Thị Thu Hiền', '34/40', 23123222, 'hien@qlcn.com');

-- --------------------------------------------------------

--
-- Table structure for table `ql_lapdatdhkhach`
--

CREATE TABLE `ql_lapdatdhkhach` (
  `ma_lap_dat` int(11) NOT NULL,
  `chi_so_dau` int(11) NOT NULL,
  `chi_so_cuoi` int(11) DEFAULT NULL,
  `so_tieu_thu` int(11) DEFAULT NULL,
  `trang_thai` int(11) NOT NULL,
  `ngay_lap_dat` date NOT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `ma_dong_ho` int(11) NOT NULL,
  `ma_tuyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ql_lapdatdhkhoi`
--

CREATE TABLE `ql_lapdatdhkhoi` (
  `ma_lap_dat` int(11) NOT NULL,
  `chi_so_dau` int(11) NOT NULL,
  `chi_so_cuoi` int(11) DEFAULT NULL,
  `so_tieu_thu` int(11) DEFAULT NULL,
  `trang_thai` int(11) NOT NULL,
  `ngay_lap_dat` date NOT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `ma_dong_ho` int(11) NOT NULL,
  `ma_tuyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ql_lapdatdhkhoi`
--

INSERT INTO `ql_lapdatdhkhoi` (`ma_lap_dat`, `chi_so_dau`, `chi_so_cuoi`, `so_tieu_thu`, `trang_thai`, `ngay_lap_dat`, `ngay_ket_thuc`, `ma_dong_ho`, `ma_tuyen`) VALUES
(1, 0, NULL, NULL, 1, '2024-05-10', NULL, 1, 1),
(2, 0, NULL, NULL, 1, '2024-05-08', NULL, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ql_nhomgia`
--

CREATE TABLE `ql_nhomgia` (
  `ma_nhom_gia` int(11) NOT NULL,
  `ten_nhom_gia` text NOT NULL,
  `hs_duoi_10m` double DEFAULT NULL,
  `hs_tu_10m_den_20m` double DEFAULT NULL,
  `hs_tu_20m_den_30m` double DEFAULT NULL,
  `hs_tren_30m` double DEFAULT NULL,
  `hs_rieng` double DEFAULT NULL,
  `gia_ban` double NOT NULL,
  `ma_loai_khach_hang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ql_nhomgia`
--

INSERT INTO `ql_nhomgia` (`ma_nhom_gia`, `ten_nhom_gia`, `hs_duoi_10m`, `hs_tu_10m_den_20m`, `hs_tu_20m_den_30m`, `hs_tren_30m`, `hs_rieng`, `gia_ban`, `ma_loai_khach_hang`) VALUES
(3, 'Dân dụng', 1, 0.8, 0.7, 0.6, NULL, 13000, 1),
(4, 'Giá reing', NULL, NULL, NULL, NULL, 1, 13000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ql_phanquyen`
--

CREATE TABLE `ql_phanquyen` (
  `ma_phan_quyen` int(11) NOT NULL,
  `ma_nhan_vien` int(6) NOT NULL,
  `ma_quyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ql_phanquyen`
--

INSERT INTO `ql_phanquyen` (`ma_phan_quyen`, `ma_nhan_vien`, `ma_quyen`) VALUES
(1, 100000, 1),
(2, 100000, 2),
(6, 100000, 5),
(8, 100001, 2),
(7, 100001, 6);

-- --------------------------------------------------------

--
-- Table structure for table `ql_quanhehopdong`
--

CREATE TABLE `ql_quanhehopdong` (
  `ma_quan_he` int(11) NOT NULL,
  `ma_hop_dong` int(11) NOT NULL,
  `ma_dong_ho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ql_taikhoan`
--

CREATE TABLE `ql_taikhoan` (
  `ma_nhan_vien` int(6) NOT NULL,
  `mat_khau` varchar(32) NOT NULL,
  `trang_thai` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sdt` int(10) NOT NULL,
  `chuc_vu` varchar(50) NOT NULL,
  `ho_ten` varchar(50) NOT NULL,
  `ngay_sinh` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ql_taikhoan`
--

INSERT INTO `ql_taikhoan` (`ma_nhan_vien`, `mat_khau`, `trang_thai`, `email`, `sdt`, `chuc_vu`, `ho_ten`, `ngay_sinh`) VALUES
(100000, 'c4ca4238a0b923820dcc509a6f75849b', 1, 'manh@qlcn.com', 0, 'Giám đốc', 'Đỗ Đức Mạnh', '2000-04-14'),
(100001, 'c4ca4238a0b923820dcc509a6f75849b', 1, 'lam@qlcn.com', 0, 'Giám đốc', 'Nguyễn Công Lâm', '2002-11-05'),
(100003, 'c4ca4238a0b923820dcc509a6f75849b', 0, 'phuc@qlcn.com', 1, 'Trưởng phòng', 'Phạm Quang Phúc', '2000-08-06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dm_chinhanh`
--
ALTER TABLE `dm_chinhanh`
  ADD PRIMARY KEY (`ma_chi_nhanh`),
  ADD UNIQUE KEY `ten_chi_nhanh` (`ten_chi_nhanh`);

--
-- Indexes for table `dm_codongho`
--
ALTER TABLE `dm_codongho`
  ADD PRIMARY KEY (`ma_co_dong_ho`),
  ADD UNIQUE KEY `ten_co_dong_ho` (`ten_co_dong_ho`);

--
-- Indexes for table `dm_loaidongho`
--
ALTER TABLE `dm_loaidongho`
  ADD PRIMARY KEY (`ma_loai_dong_ho`),
  ADD UNIQUE KEY `ten_loai_dong_ho` (`ten_loai_dong_ho`);

--
-- Indexes for table `dm_loaikhachhang`
--
ALTER TABLE `dm_loaikhachhang`
  ADD PRIMARY KEY (`ma_loai_khach_hang`),
  ADD UNIQUE KEY `ten_loai_khach_hang` (`ten_loai_khach_hang`);

--
-- Indexes for table `dm_nhacungcap`
--
ALTER TABLE `dm_nhacungcap`
  ADD PRIMARY KEY (`ma_nha_cung_cap`),
  ADD UNIQUE KEY `ten_nha_cung_cap` (`ten_nha_cung_cap`);

--
-- Indexes for table `dm_phuongxa`
--
ALTER TABLE `dm_phuongxa`
  ADD PRIMARY KEY (`ma_phuong_xa`),
  ADD UNIQUE KEY `ten_phuong_xa` (`ten_phuong_xa`),
  ADD KEY `dm_phuongxa_ibfk_1` (`ma_quan_huyen`);

--
-- Indexes for table `dm_ptthanhtoan`
--
ALTER TABLE `dm_ptthanhtoan`
  ADD PRIMARY KEY (`ma_phuong_thuc`),
  ADD UNIQUE KEY `ten_phuong_thuc` (`ten_phuong_thuc`);

--
-- Indexes for table `dm_quanhuyen`
--
ALTER TABLE `dm_quanhuyen`
  ADD PRIMARY KEY (`ma_quan_huyen`),
  ADD UNIQUE KEY `ten_quan_huyen` (`ten_quan_huyen`);

--
-- Indexes for table `dm_quyen`
--
ALTER TABLE `dm_quyen`
  ADD PRIMARY KEY (`ma_quyen`),
  ADD UNIQUE KEY `ten_quyen` (`ten_quyen`);

--
-- Indexes for table `dm_toquanly`
--
ALTER TABLE `dm_toquanly`
  ADD PRIMARY KEY (`ma_to_quan_ly`),
  ADD KEY `ma_chi_nhanh` (`ma_chi_nhanh`);

--
-- Indexes for table `dm_tuyendoc`
--
ALTER TABLE `dm_tuyendoc`
  ADD PRIMARY KEY (`ma_tuyen`),
  ADD KEY `ma_phuong_xa` (`ma_phuong_xa`),
  ADD KEY `ma_to_quan_ly` (`ma_to_quan_ly`);

--
-- Indexes for table `ls_donghokhoi`
--
ALTER TABLE `ls_donghokhoi`
  ADD PRIMARY KEY (`ma_lich_su`),
  ADD KEY `ma_dong_ho` (`ma_dong_ho`);

--
-- Indexes for table `ql_donghokhach`
--
ALTER TABLE `ql_donghokhach`
  ADD PRIMARY KEY (`ma_dong_ho`),
  ADD UNIQUE KEY `ten_dong_ho` (`ten_dong_ho`),
  ADD UNIQUE KEY `so_seri` (`so_seri`),
  ADD UNIQUE KEY `ten_dong_ho_2` (`ten_dong_ho`);

--
-- Indexes for table `ql_donghokhoi`
--
ALTER TABLE `ql_donghokhoi`
  ADD PRIMARY KEY (`ma_dong_ho`),
  ADD UNIQUE KEY `ten_dong_ho` (`ten_dong_ho`),
  ADD KEY `ma_co_dong_ho` (`ma_co_dong_ho`),
  ADD KEY `ma_loai_dong_ho` (`ma_loai_dong_ho`),
  ADD KEY `ma_nha_cung_cap` (`ma_nha_cung_cap`);

--
-- Indexes for table `ql_hopdong`
--
ALTER TABLE `ql_hopdong`
  ADD PRIMARY KEY (`ma_hop_dong`),
  ADD KEY `ma_nhom_gia` (`ma_nhom_gia`),
  ADD KEY `ma_khach_hang` (`ma_khach_hang`);

--
-- Indexes for table `ql_khachhang`
--
ALTER TABLE `ql_khachhang`
  ADD PRIMARY KEY (`ma_khach_hang`);

--
-- Indexes for table `ql_lapdatdhkhach`
--
ALTER TABLE `ql_lapdatdhkhach`
  ADD PRIMARY KEY (`ma_lap_dat`),
  ADD KEY `ma_tuyen` (`ma_tuyen`),
  ADD KEY `ma_dong_ho` (`ma_dong_ho`);

--
-- Indexes for table `ql_lapdatdhkhoi`
--
ALTER TABLE `ql_lapdatdhkhoi`
  ADD PRIMARY KEY (`ma_lap_dat`),
  ADD KEY `ma_tuyen` (`ma_tuyen`),
  ADD KEY `ma_dong_ho` (`ma_dong_ho`);

--
-- Indexes for table `ql_nhomgia`
--
ALTER TABLE `ql_nhomgia`
  ADD PRIMARY KEY (`ma_nhom_gia`),
  ADD UNIQUE KEY `ma_loai_khach_hang` (`ma_loai_khach_hang`),
  ADD UNIQUE KEY `ten_nhom_gia` (`ten_nhom_gia`) USING HASH;

--
-- Indexes for table `ql_phanquyen`
--
ALTER TABLE `ql_phanquyen`
  ADD PRIMARY KEY (`ma_phan_quyen`),
  ADD UNIQUE KEY `ma_nhan_vien` (`ma_nhan_vien`,`ma_quyen`),
  ADD KEY `ma_quyen` (`ma_quyen`);

--
-- Indexes for table `ql_quanhehopdong`
--
ALTER TABLE `ql_quanhehopdong`
  ADD PRIMARY KEY (`ma_quan_he`),
  ADD KEY `ma_hop_dong` (`ma_hop_dong`),
  ADD KEY `ma_dong_ho` (`ma_dong_ho`);

--
-- Indexes for table `ql_taikhoan`
--
ALTER TABLE `ql_taikhoan`
  ADD PRIMARY KEY (`ma_nhan_vien`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dm_chinhanh`
--
ALTER TABLE `dm_chinhanh`
  MODIFY `ma_chi_nhanh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dm_codongho`
--
ALTER TABLE `dm_codongho`
  MODIFY `ma_co_dong_ho` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dm_loaidongho`
--
ALTER TABLE `dm_loaidongho`
  MODIFY `ma_loai_dong_ho` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dm_loaikhachhang`
--
ALTER TABLE `dm_loaikhachhang`
  MODIFY `ma_loai_khach_hang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dm_nhacungcap`
--
ALTER TABLE `dm_nhacungcap`
  MODIFY `ma_nha_cung_cap` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dm_phuongxa`
--
ALTER TABLE `dm_phuongxa`
  MODIFY `ma_phuong_xa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dm_ptthanhtoan`
--
ALTER TABLE `dm_ptthanhtoan`
  MODIFY `ma_phuong_thuc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dm_quanhuyen`
--
ALTER TABLE `dm_quanhuyen`
  MODIFY `ma_quan_huyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dm_quyen`
--
ALTER TABLE `dm_quyen`
  MODIFY `ma_quyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `dm_toquanly`
--
ALTER TABLE `dm_toquanly`
  MODIFY `ma_to_quan_ly` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dm_tuyendoc`
--
ALTER TABLE `dm_tuyendoc`
  MODIFY `ma_tuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ls_donghokhoi`
--
ALTER TABLE `ls_donghokhoi`
  MODIFY `ma_lich_su` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ql_donghokhach`
--
ALTER TABLE `ql_donghokhach`
  MODIFY `ma_dong_ho` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ql_donghokhoi`
--
ALTER TABLE `ql_donghokhoi`
  MODIFY `ma_dong_ho` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ql_hopdong`
--
ALTER TABLE `ql_hopdong`
  MODIFY `ma_hop_dong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ql_khachhang`
--
ALTER TABLE `ql_khachhang`
  MODIFY `ma_khach_hang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ql_lapdatdhkhach`
--
ALTER TABLE `ql_lapdatdhkhach`
  MODIFY `ma_lap_dat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ql_lapdatdhkhoi`
--
ALTER TABLE `ql_lapdatdhkhoi`
  MODIFY `ma_lap_dat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ql_nhomgia`
--
ALTER TABLE `ql_nhomgia`
  MODIFY `ma_nhom_gia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ql_phanquyen`
--
ALTER TABLE `ql_phanquyen`
  MODIFY `ma_phan_quyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ql_quanhehopdong`
--
ALTER TABLE `ql_quanhehopdong`
  MODIFY `ma_quan_he` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ql_taikhoan`
--
ALTER TABLE `ql_taikhoan`
  MODIFY `ma_nhan_vien` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100004;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dm_phuongxa`
--
ALTER TABLE `dm_phuongxa`
  ADD CONSTRAINT `dm_phuongxa_ibfk_1` FOREIGN KEY (`ma_quan_huyen`) REFERENCES `dm_quanhuyen` (`ma_quan_huyen`) ON UPDATE CASCADE;

--
-- Constraints for table `dm_toquanly`
--
ALTER TABLE `dm_toquanly`
  ADD CONSTRAINT `dm_toquanly_ibfk_1` FOREIGN KEY (`ma_chi_nhanh`) REFERENCES `dm_chinhanh` (`ma_chi_nhanh`) ON UPDATE CASCADE;

--
-- Constraints for table `dm_tuyendoc`
--
ALTER TABLE `dm_tuyendoc`
  ADD CONSTRAINT `dm_tuyendoc_ibfk_1` FOREIGN KEY (`ma_phuong_xa`) REFERENCES `dm_phuongxa` (`ma_phuong_xa`) ON UPDATE CASCADE,
  ADD CONSTRAINT `dm_tuyendoc_ibfk_2` FOREIGN KEY (`ma_to_quan_ly`) REFERENCES `dm_toquanly` (`ma_to_quan_ly`) ON UPDATE CASCADE;

--
-- Constraints for table `ls_donghokhoi`
--
ALTER TABLE `ls_donghokhoi`
  ADD CONSTRAINT `ls_donghokhoi_ibfk_1` FOREIGN KEY (`ma_dong_ho`) REFERENCES `ql_donghokhoi` (`ma_dong_ho`) ON UPDATE CASCADE;

--
-- Constraints for table `ql_donghokhoi`
--
ALTER TABLE `ql_donghokhoi`
  ADD CONSTRAINT `ql_donghokhoi_ibfk_1` FOREIGN KEY (`ma_co_dong_ho`) REFERENCES `dm_codongho` (`ma_co_dong_ho`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ql_donghokhoi_ibfk_2` FOREIGN KEY (`ma_loai_dong_ho`) REFERENCES `dm_loaidongho` (`ma_loai_dong_ho`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ql_donghokhoi_ibfk_3` FOREIGN KEY (`ma_nha_cung_cap`) REFERENCES `dm_nhacungcap` (`ma_nha_cung_cap`) ON UPDATE CASCADE;

--
-- Constraints for table `ql_hopdong`
--
ALTER TABLE `ql_hopdong`
  ADD CONSTRAINT `ql_hopdong_ibfk_1` FOREIGN KEY (`ma_nhom_gia`) REFERENCES `ql_nhomgia` (`ma_nhom_gia`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ql_hopdong_ibfk_2` FOREIGN KEY (`ma_khach_hang`) REFERENCES `ql_khachhang` (`ma_khach_hang`) ON UPDATE CASCADE;

--
-- Constraints for table `ql_lapdatdhkhoi`
--
ALTER TABLE `ql_lapdatdhkhoi`
  ADD CONSTRAINT `ql_lapdatdhkhoi_ibfk_1` FOREIGN KEY (`ma_tuyen`) REFERENCES `dm_tuyendoc` (`ma_tuyen`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ql_lapdatdhkhoi_ibfk_2` FOREIGN KEY (`ma_dong_ho`) REFERENCES `ql_donghokhoi` (`ma_dong_ho`) ON UPDATE CASCADE;

--
-- Constraints for table `ql_nhomgia`
--
ALTER TABLE `ql_nhomgia`
  ADD CONSTRAINT `ql_nhomgia_ibfk_1` FOREIGN KEY (`ma_loai_khach_hang`) REFERENCES `dm_loaikhachhang` (`ma_loai_khach_hang`) ON UPDATE CASCADE;

--
-- Constraints for table `ql_phanquyen`
--
ALTER TABLE `ql_phanquyen`
  ADD CONSTRAINT `ql_phanquyen_ibfk_1` FOREIGN KEY (`ma_quyen`) REFERENCES `dm_quyen` (`ma_quyen`),
  ADD CONSTRAINT `ql_phanquyen_ibfk_2` FOREIGN KEY (`ma_nhan_vien`) REFERENCES `ql_taikhoan` (`ma_nhan_vien`);

--
-- Constraints for table `ql_quanhehopdong`
--
ALTER TABLE `ql_quanhehopdong`
  ADD CONSTRAINT `ql_quanhehopdong_ibfk_1` FOREIGN KEY (`ma_hop_dong`) REFERENCES `ql_hopdong` (`ma_hop_dong`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ql_quanhehopdong_ibfk_2` FOREIGN KEY (`ma_dong_ho`) REFERENCES `ql_donghokhach` (`ma_dong_ho`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
