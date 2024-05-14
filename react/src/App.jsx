import Sidebar from './components/layouts/Sidebar'
import QuanLyNguoiDung from './components/he_thong/QL_nguoi_dung/QuanLyNguoiDung'
import ThemNguoiDung from './components/he_thong/QL_nguoi_dung/ThemNguoiDung'
import SuaNguoiDung from './components/he_thong/QL_nguoi_dung/SuaNguoiDung'
import Login from './components/he_thong/QL_nguoi_dung/Login'
import QuanLyPhanQuyen from './components/he_thong/QL_phan_quyen/QuanLyPhanQuyen'
import ThemQuyen from './components/he_thong/QL_quyen/ThemQuyen'
import SuaQuyen from './components/he_thong/QL_quyen/SuaQuyen'
import PhanQuyenTaiKhoan from './components/he_thong/QL_phan_quyen/PhanQuyenTaiKhoan'
import SuaPhanQuyen from './components/he_thong/QL_phan_quyen/SuaPhanQuyen'
import ChiNhanh from './components/danh_muc/ChiNhanh'
import SuaChiNhanh from './components/danh_muc/SuaChiNhanh'
import ToQuanLy from './components/danh_muc/ToQuanLy'
import SuaToQuanLy from './components/danh_muc/SuaToQuanLy'
import TuyenDoc from './components/danh_muc/TuyenDoc'
import SuaTuyenDoc from './components/danh_muc/SuaTuyenDoc'
import QuanHuyen from './components/danh_muc/QuanHuyen'
import SuaQuanHuyen from './components/danh_muc/SuaQuanHuyen'
import PhuongXa from './components/danh_muc/PhuongXa'
import ThemPhuongXa from './components/danh_muc/ThemPhuongXa'
import SuaPhuongXa from './components/danh_muc/SuaPhuongXa'
import LoaiKhachHang from './components/danh_muc/LoaiKhachHang'
import SuaLoaiKhachHang from './components/danh_muc/SuaLoaiKhachHang'
import LoaiDongHo from './components/danh_muc/LoaiDongHo'
import SuaLoaiDongHo from './components/danh_muc/SuaLoaiDongHo'
import NhaCungCap from './components/danh_muc/NhaCungCap'
import SuaNhaCungCap from './components/danh_muc/SuaNhaCungCap'
import CoDongHo from './components/danh_muc/CoDongHo'
import SuaCoDongHo from './components/danh_muc/SuaCoDongHo'
import PhuongThucThanhToan from './components/danh_muc/PhuongThucThanhToan'
import SuaPhuongThucThanhToan from './components/danh_muc/SuaPhuongThucThanhToan'
import QuanLyGiaNuoc from './components/khach_hang_thanh_toan/QL_gia_nuoc/QuanLyGiaNuoc'
import ThemGia from './components/khach_hang_thanh_toan/QL_gia_nuoc/ThemGia'
import SuaGia from './components/khach_hang_thanh_toan/QL_gia_nuoc/SuaGia'
import QuanLyDongHoKhoi from './components/dong_ho/QL_dong_ho_khoi/QuanLyDongHoKhoi'
import ThemDongHoKhoi from './components/dong_ho/QL_dong_ho_khoi/ThemDongHoKhoi'
import SuaDongHoKhoi from './components/dong_ho/QL_dong_ho_khoi/SuaDongHoKhoi'
import QuanLyKhachHang from './components/khach_hang_thanh_toan/QL_khach_hang/QuanLyKhachHang'
import ThemKhachHang from './components/khach_hang_thanh_toan/QL_khach_hang/ThemKhachHang'
import SuaKhachHang from './components/khach_hang_thanh_toan/QL_khach_hang/SuaKhachHang'
import QuanLyDongHoKhach from './components/dong_ho/QL_dong_ho_khach/QuanLyDongHoKhach'
import ThemDongHoKhach from './components/dong_ho/QL_dong_ho_khach/ThemDongHoKhach'
import SuaDongHoKhach from './components/dong_ho/QL_dong_ho_khach/SuaDongHoKhach'


import { Routes, Route, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const sidebarShow = !location.pathname.startsWith('/login');
  return (
    <>
      {sidebarShow && <Sidebar />}
      <Routes>
        <Route path='/nguoi_dung' element={<QuanLyNguoiDung />} />
        <Route path='/nguoi_dung/them' element={<ThemNguoiDung />} />
        <Route path='/nguoi_dung/sua/:id' element={<SuaNguoiDung />} />
        <Route path='/quan_ly_phan_quyen' element={<QuanLyPhanQuyen />} />
        <Route path='/quyen' element={<ThemQuyen />} />
        <Route path='/quyen/sua/:id' element={<SuaQuyen />} />
        <Route path='/quan_ly_phan_quyen/them' element={<PhanQuyenTaiKhoan />} />
        <Route path='/quan_ly_phan_quyen/sua/:id' element={<SuaPhanQuyen />} />
        <Route path='/chi_nhanh' element={<ChiNhanh />} />
        <Route path='/chi_nhanh/sua/:id' element={<SuaChiNhanh />} />
        <Route path='/to_quan_ly' element={<ToQuanLy />} />
        <Route path='/to_quan_ly/sua/:id' element={<SuaToQuanLy />} />
        <Route path='/tuyen_doc' element={<TuyenDoc />} />
        <Route path='/tuyen_doc/sua/:id' element={<SuaTuyenDoc />} />
        <Route path='/quan_huyen' element={<QuanHuyen />} />
        <Route path='/quan_huyen/sua/:id' element={<SuaQuanHuyen />} />
        <Route path='/phuong_xa' element={<PhuongXa />} />
        <Route path='/phuong_xa/them' element={<ThemPhuongXa />} />
        <Route path='/phuong_xa/sua/:id' element={<SuaPhuongXa />} />
        <Route path='/loai_khach_hang' element={<LoaiKhachHang />} />
        <Route path='/loai_khach_hang/sua/:id' element={<SuaLoaiKhachHang />} />
        <Route path='/loai_dong_ho' element={<LoaiDongHo />} />
        <Route path='/loai_dong_ho/sua/:id' element={<SuaLoaiDongHo />} />
        <Route path='/nha_cung_cap' element={<NhaCungCap />} />
        <Route path='/nha_cung_cap/sua/:id' element={<SuaNhaCungCap />} />
        <Route path='/co_dong_ho' element={<CoDongHo />} />
        <Route path='/co_dong_ho/sua/:id' element={<SuaCoDongHo />} />
        <Route path='/phuong_thuc_thanh_toan' element={<PhuongThucThanhToan />} />
        <Route path='/phuong_thuc_thanh_toan/sua/:id' element={<SuaPhuongThucThanhToan />} />
        <Route path='/gia_nuoc' element={<QuanLyGiaNuoc />} />
        <Route path='/gia_nuoc/them' element={<ThemGia />} />
        <Route path='/gia_nuoc/sua/:id' element={<SuaGia />} />
        <Route path='/dong_ho_khoi' element={<QuanLyDongHoKhoi />} />
        <Route path='/dong_ho_khoi/them' element={<ThemDongHoKhoi />} />
        <Route path='/dong_ho_khoi/sua/:id' element={<SuaDongHoKhoi />} />
        <Route path='/khach_hang' element={<QuanLyKhachHang />} />
        <Route path='/khach_hang/them' element={<ThemKhachHang />} />
        <Route path='/khach_hang/sua/:id' element={<SuaKhachHang />} />
        <Route path='/dong_ho_khach' element={<QuanLyDongHoKhach />} />
        <Route path='/dong_ho_khach/them' element={<ThemDongHoKhach />} />
        <Route path='/dong_ho_khach/sua/:id' element={<SuaDongHoKhach />} />


        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
