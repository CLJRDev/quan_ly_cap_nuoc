import Sidebar from './components/layouts/Sidebar'
import QuanLyNguoiDung from './components/he_thong/QL_nguoi_dung/QuanLyNguoiDung'
import ThemNguoiDung from './components/he_thong/QL_nguoi_dung/ThemNguoiDung'
import SuaNguoiDung from './components/he_thong/QL_nguoi_dung/SuaNguoiDung'
import Login from './components/he_thong/QL_nguoi_dung/Login'
import QuanLyPhanQuyen from './components/he_thong/QL_phan_quyen/QuanLyPhanQuyen'
import ThemQuyen from './components/he_thong/QL_phan_quyen/ThemQuyen'
import SuaQuyen from './components/he_thong/QL_phan_quyen/SuaQuyen'
import PhanQuyenTaiKhoan from './components/he_thong/QL_phan_quyen/PhanQuyenTaiKhoan'
import SuaPhanQuyen from './components/he_thong/QL_phan_quyen/SuaPhanQuyen'

import { Routes, Route, useLocation  } from 'react-router-dom'

function App() {
  const location = useLocation();
  const sidebarShow = !location.pathname.startsWith('/login');
  return (
    <>
      {sidebarShow && <Sidebar />}      
      <Routes>
        <Route path='/nguoi_dung' element={<QuanLyNguoiDung />}/>
        <Route path='/nguoi_dung/them' element={<ThemNguoiDung />}/>
        <Route path='/nguoi_dung/sua/:id' element={<SuaNguoiDung />}/>
        <Route path='/quan_ly_phan_quyen' element={<QuanLyPhanQuyen />}/>
        <Route path='/quyen' element={<ThemQuyen />}/>
        <Route path='/quyen/sua/:id' element={<SuaQuyen />}/>
        <Route path='/quan_ly_phan_quyen/them' element={<PhanQuyenTaiKhoan />} />
        <Route path='/quan_ly_phan_quyen/sua/:id' element={<SuaPhanQuyen />} />
        <Route path='/login' element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
