import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from 'react'
import axios from "axios"

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
      console.log(response.data.message)
      navigate('/nguoi_dung')
    } catch (error) {
      console.log(error)
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
          <h3 className="title">Đăng nhập</h3>
          <input ref={maNhanVienRef} type="text" placeholder="Mã nhân viên" />
          <input ref={matKhauRef} type="password" className="mt-2" placeholder="Mật khẩu" />
          <button className="btn btn-block mt-2">Đăng nhập</button>
        </form>
      </div>
    </div>
  )
}