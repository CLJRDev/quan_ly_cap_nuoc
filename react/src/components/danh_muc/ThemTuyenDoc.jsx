import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io"
import PhuongXa from '../select-option/PhuongXa'
import ToQuanLy from '../select-option/ToQuanLy'
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../layouts/Paginate"
import Sidebar from '../layouts/Sidebar'

export default function ThemTuyenDoc() {
  const navigate = useNavigate()
  const [tuyenDoc, setTuyenDoc] = useState({
    ten_tuyen: '',
    ma_phuong_xa: '',
    ma_to_quan_ly: ''
  })

  const handleSelectChange = (selectedOption, event) => {
    setTuyenDoc(pre => {
      return {
        ...pre,
        [event.name]: selectedOption.value
      }
    })
  }

  console.log(tuyenDoc)

  const handleInputChange = (e) => {
    setTuyenDoc(pre => {
      return {
        ...pre,
        [e.target.name]: e.target.value
      }
    })
  }

  const themTuyenDoc = async () => {
    const formData = new FormData()
    formData.append('ten_tuyen', tuyenDoc.ten_tuyen)
    formData.append('ma_to_quan_ly', tuyenDoc.ma_to_quan_ly)
    formData.append('ma_phuong_xa', tuyenDoc.ma_phuong_xa)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tuyen_doc`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/tuyen_doc')
    } catch (error) {
      console.log(error)
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themTuyenDoc()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Thêm tuyến đọc</h2>
        <form className="form-container animated fadeInDown" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_tuyen">Tên tuyến đọc</label>
            <input required type="text" id="ten_tuyen" name='ten_tuyen' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="chi_nhanh">Tổ quản lý</label>
            <ToQuanLy
              require={true}
              onChange={handleSelectChange}
              name="ma_to_quan_ly"
            />
          </div>
          <div>
            <label htmlFor="chi_nhanh">Phường xã</label>
            <PhuongXa
              require={true}
              onChange={handleSelectChange}
              name="ma_phuong_xa"
            />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp;Thêm tuyến đọc
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}