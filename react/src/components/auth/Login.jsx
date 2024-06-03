import { Link, useNavigate } from "react-router-dom"
import { useRef, useState, useContext } from 'react'
import axios from "axios"
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate()
  const maNhanVienRef = useRef()
  const matKhauRef = useRef()

  const login = async () => {
    const formData = new FormData()
    formData.append('ma_nhan_vien', maNhanVienRef.current.value)
    formData.append('mat_khau', matKhauRef.current.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/login`, formData)
      setTimeout(() => {
        SuccessToast('Đăng nhập thành công!')
      }, 500)
      const quyens = JSON.stringify(response.data.quyen)
      localStorage.setItem('quyens', quyens)
      localStorage.setItem('user', maNhanVienRef.current.value)
      navigate('/home')
    } catch (error) {
      if (typeof error.response.data.error === 'object') {
        const errorsArray = Object.values(error.response.data.error).flat();
        errorsArray.forEach(item => {
          WarningToast(item)
        })
      } else {
        WarningToast(error.response.data.error)
      }
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login()
  }

  return (
    <div className="login-form animated fadeInDown">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Đăng nhập</h2>
          <input required ref={maNhanVienRef} type="text" placeholder="Mã nhân viên" />
          <input required style={{ marginTop: '10px' }} ref={matKhauRef} type="password" placeholder="Mật khẩu" />
          <button style={{ marginTop: '10px' }} className="btn btn-block">Đăng nhập</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}