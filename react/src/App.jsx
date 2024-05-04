import Sidebar from './components/layouts/Sidebar'
import QuanLyNguoiDung from './components/he_thong/QuanLyNguoiDung'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path='/nguoi_dung' element={<QuanLyNguoiDung />}/>
      </Routes>
    </>
  )
}

export default App
