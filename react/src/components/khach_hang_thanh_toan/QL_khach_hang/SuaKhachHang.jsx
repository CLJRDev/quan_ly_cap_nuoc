import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { MdOutlineEdit } from "react-icons/md";
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function SuaKhachHang() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [khachHang, setKhachHang] = useState({
    ten_khach_hang: '',
    can_cuoc: '',
    dia_chi: '',
    sdt: '',
    email: ''
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/khach_hang/${id}`)
      .then(response => {
        setKhachHang(response.data)
      })
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target
    setKhachHang(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  console.log(khachHang)

  const sua = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_khach_hang', khachHang.ten_khach_hang)
    formData.append('can_cuoc', khachHang.can_cuoc)
    formData.append('dia_chi', khachHang.dia_chi)
    formData.append('sdt', khachHang.sdt)
    formData.append('email', khachHang.email)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/khach_hang/${id}`, formData)
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
    await sua()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa khách hàng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_khach_hang">Tên khách hàng</label>
            <input required type="text" id='ten_khach_hang' name='ten_khach_hang' onChange={handleInputChange} value={khachHang.ten_khach_hang} />
          </div>
          <div>
            <label htmlFor="can_cuoc">Căn cước công dân</label>
            <input required type="number" id='can_cuoc' name='can_cuoc' onChange={handleInputChange} value={khachHang.can_cuoc} />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input required type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} value={khachHang.dia_chi} />
          </div>
          <div>
            <label htmlFor="sdt">Số điện thoại</label>
            <input required type="number" id='sdt' name='sdt' onChange={handleInputChange} value={khachHang.sdt} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input required type="email" id='email' name='email' onChange={handleInputChange} value={khachHang.email} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp; Sửa khách hàng
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}