import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'

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
    formData.append('dia_chi', khachHang.dia_chi)
    formData.append('sdt', khachHang.sdt)
    formData.append('email', khachHang.email)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/khach_hang`, formData)
      console.log(response.data.message)
      navigate('/khach_hang')
    } catch (error) {
      console.log(error.message.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await them()
  }

  return (
    <div className="page">
      <h2 className="title">Thêm khách hàng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_khach_hang">Tên khách hàng</label>
          <input type="text" id='ten_khach_hang' name='ten_khach_hang' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="dia_chi">Địa chỉ</label>
          <input type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="sdt">Số điện thoại</label>
          <input type="number" id='sdt' name='sdt' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name='email' onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm khách hàng
          </button>
        </div>
      </form>
    </div>
  )
}