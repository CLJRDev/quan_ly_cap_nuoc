import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { MdOutlineEdit } from "react-icons/md";
import SuccessToast from '../../notification/SuccessToast';
import WarningToast from '../../notification/WarningToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrangThai from '../../select-option/TrangThai'
import Sidebar from '../../layouts/Sidebar'


export default function SuaNguoiDung() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [user, setUser] = useState({
    ho_ten: '',
    chuc_vu: '',
    ngay_sinh: '',
    sdt: '',
    email: ''
  })
  const [selectedOptions, setSelectedOptions] = useState({ trang_thai: {} })
  const matKhauRef = useRef()
  const xacNhanMatKhauRef = useRef()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tai_khoan/${id}`)
      .then(response => {
        setUser(response.data)
        setSelectedOptions({ trang_thai: { value: response.data.trang_thai, label: response.data.trang_thai === 1 ? 'Kích hoạt' : 'Khóa' } })
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(preUser => {
      return {
        ...preUser,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option, e) => {
    setSelectedOptions({ trang_thai: { value: option.value, label: option.label } })
  }

  const suaNguoiDung = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ho_ten', user.ho_ten)
    formData.append('chuc_vu', user.chuc_vu)
    formData.append('ngay_sinh', user.ngay_sinh)
    formData.append('sdt', user.sdt)
    formData.append('email', user.email)
    formData.append('trang_thai', selectedOptions.trang_thai.value)
    if (matKhauRef.current.value != '') {
      formData.append('mat_khau', matKhauRef.current.value)
      formData.append('xac_nhan_mat_khau', xacNhanMatKhauRef.current.value)
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tai_khoan/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/nguoi_dung')
    } catch (er) {
      const errorsArray = Object.values(er.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaNguoiDung()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa người dùng</h2>
        <form className="form-container" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="ho_ten">Họ tên</label>
            <input type="text" id='ho_ten' name='ho_ten' required onChange={handleChange} value={user.ho_ten} />
          </div>
          <div>
            <label htmlFor="chuc_vu">Chức vụ</label>
            <input type="text" id='chuc_vu' name='chuc_vu' required onChange={handleChange} value={user.chuc_vu} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' required onChange={handleChange} value={user.email} />
          </div>
          <div>
            <label htmlFor="sdt">Số điện thoại</label>
            <input type="number" id='sdt' name='sdt' required onChange={handleChange} value={user.sdt} />
          </div>
          <div>
            <label htmlFor="mat_khau">Mật khẩu</label>
            <input type="password" id='mat_khau' name='mat_khau' ref={matKhauRef} />
          </div>
          <div>
            <label htmlFor="xac_nhan_mat_khau">Xác nhận mật khẩu</label>
            <input type="password" id='xac_nhan_mat_khau' name='xac_nhan_mat_khau' ref={xacNhanMatKhauRef} />
          </div>
          <div>
            <label htmlFor="ngay_sinh">Ngày sinh</label>
            <input type="date" id='ngay_sinh' name='ngay_sinh' required onChange={handleChange} value={user.ngay_sinh} />
          </div>
          <div>
            <label htmlFor="trang_thai">Trạng thái</label>
            <TrangThai
              name='trang_thai'
              onChange={handleSelectChange}
              value={selectedOptions.trang_thai}
            />
          </div>
          <div>
            <button type='submit' className='btn-edit'>
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa người dùng
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}