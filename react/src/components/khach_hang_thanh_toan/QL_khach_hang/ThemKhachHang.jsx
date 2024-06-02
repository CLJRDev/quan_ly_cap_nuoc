import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function ThemKhachHang() {
  const navigate = useNavigate()
  const [khachHang, setKhachHang] = useState(null)

  const handleInputChange = e => {
    const { name, value } = e.target
    setKhachHang(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const them = async () => {
    const formData = new FormData()
    formData.append('ten_khach_hang', khachHang.ten_khach_hang)
    formData.append('can_cuoc', khachHang.can_cuoc)
    formData.append('dia_chi', khachHang.dia_chi)
    formData.append('sdt', khachHang.sdt)
    formData.append('email', khachHang.email)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/khach_hang`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/khach_hang')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await them()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Thêm khách hàng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_khach_hang">Tên khách hàng</label>
            <input required type="text" id='ten_khach_hang' name='ten_khach_hang' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="can_cuoc">Căn cước công dân</label>
            <input required type="number" id='can_cuoc' name='can_cuoc' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input required type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="sdt">Số điện thoại</label>
            <input required type="number" id='sdt' name='sdt' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input required type="email" id='email' name='email' onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm khách hàng
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}