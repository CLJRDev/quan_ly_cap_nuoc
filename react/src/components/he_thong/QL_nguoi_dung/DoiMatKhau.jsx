import Sidebar from '../../layouts/Sidebar'
import axios from "axios"
import { useState, useEffect } from "react"
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DoiMatKhau() {
  const [doiMatKhau, setDoiMatKhau] = useState({})



  const handleChange = (e) => {
    setDoiMatKhau(pre => {
      return {
        ...pre,
        [e.target.name]: e.target.value
      }
    })
  }

  const resetPassword = async () => {
    const formData = new FormData()
    formData.append('email', doiMatKhau.email)
    formData.append('mat_khau', doiMatKhau.mat_khau)
    formData.append('xac_nhan_mat_khau', doiMatKhau.xac_nhan_mat_khau)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/reset_password`, formData)
      SuccessToast(response.data.message)
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
    await resetPassword()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Đổi mật khẩu</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input required type="email" name="email" id="email" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="mat_khau">Mật khẩu mới</label>
            <input required type="password" name="mat_khau" id="mat_khau" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="xac_nhan_mat_khau">Xác nhận mật khẩu</label>
            <input required type="password" name="xac_nhan_mat_khau" id="xac_nhan_mat_khau" onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <RiLockPasswordLine style={{ transform: 'scale(1.2)' }} />
              &nbsp;Đổi mật khẩu
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}