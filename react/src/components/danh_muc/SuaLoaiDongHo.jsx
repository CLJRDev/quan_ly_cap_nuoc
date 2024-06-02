import axios from "axios"
import { useState, useEffect } from "react"
import { MdOutlineEdit } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom"
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../layouts/Sidebar'

export default function SuaLoaiDongHo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenLoaiDongHo, setTenLoaiDongHo] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_dong_ho/${id}`)
      .then(response => {
        setTenLoaiDongHo(response.data.ten_loai_dong_ho)
      })
  }, [])

  const handleChange = (e) => {
    setTenLoaiDongHo(e.target.value)
  }

  const suaLoaiDongHo = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_loai_dong_ho', tenLoaiDongHo)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/loai_dong_ho/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/loai_dong_ho')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaLoaiDongHo()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa loại đồng hồ</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_loai_dong_ho">Tên loại đồng hồ</label>
            <input required onChange={handleChange} type="text" id='ten_loai_dong_ho' name="ten_loai_dong_ho" value={tenLoaiDongHo} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-edit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa loại đồng hồ
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}