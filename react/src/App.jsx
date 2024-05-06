import Sidebar from './components/layouts/Sidebar'
import QuanLyNguoiDung from './components/he_thong/QL_nguoi_dung/QuanLyNguoiDung'
import ThemNguoiDung from './components/he_thong/QL_nguoi_dung/ThemNguoiDung'
import SuaNguoiDung from './components/he_thong/QL_nguoi_dung/SuaNguoiDung'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path='/nguoi_dung' element={<QuanLyNguoiDung />}/>
        <Route path='/nguoi_dung/them' element={<ThemNguoiDung />}/>
        <Route path='/nguoi_dung/sua/:id' element={<SuaNguoiDung />}/>
      </Routes>
    </>
  )
}

export default App
