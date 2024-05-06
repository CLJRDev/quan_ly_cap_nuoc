import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { IoIosAddCircleOutline } from "react-icons/io"

export default function ThemNguoiDung() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    ho_ten: '',
    chuc_vu: '',
    mat_khau: '',
    xac_nhan_mat_khau: '',
    ngay_sinh: '',
    sdt: '',
    email: '',
    trang_thai: '1'
  })

  function handleChange(e) {
    const { name, value } = e.target
    setUser(preUser => {
      return {
        ...preUser,
        [name]: value
      }
    })
  }

  const themNguoiDung = async () => {
    const formData = new FormData()
    formData.append('ho_ten', user.ho_ten)
    formData.append('chuc_vu', user.chuc_vu)
    formData.append('mat_khau', user.mat_khau)
    formData.append('xac_nhan_mat_khau', user.xac_nhan_mat_khau)
    formData.append('ngay_sinh', user.ngay_sinh)
    formData.append('sdt', user.sdt)
    formData.append('trang_thai', user.trang_thai)
    formData.append('email', user.email)

    const response = await axios.post(`http://127.0.0.1:8000/api/tai_khoan`, formData)
    // console.log(response.data.message)
    navigate('/nguoi_dung')

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themNguoiDung()
  }

  return (
    <div className="page">
      <h2 className="title">Thêm người dùng</h2>
      <form className="form-container" onSubmit={handleSubmit} >
        <div>
          <label htmlFor="ho_ten">Họ tên</label>
          <input type="text" id='ho_ten' name='ho_ten' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="chuc_vu">Chức vụ</label>
          <input type="text" id='chuc_vu' name='chuc_vu' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id='email' name='email' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="sdt">Số điện thoại</label>
          <input type="number" id='sdt' name='sdt' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="mat_khau">Mật khẩu</label>
          <input type="password" id='mat_khau' name='mat_khau' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="xac_nhan_mat_khau">Xác nhận mật khẩu</label>
          <input type="password" id='xac_nhan_mat_khau' name='xac_nhan_mat_khau' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ngay_sinh">Ngày sinh</label>
          <input type="date" id='ngay_sinh' name='ngay_sinh' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="trang_thai">Trạng thái</label>
          <select name="trang_thai" id="trang_thai" value={user.trang_thai} onChange={handleChange}>
            <option value="1">Kích hoạt</option>
            <option value="0">Khóa</option>
          </select>
        </div>
        <div>
          <button type='submit' className='btn-add'>
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm người dùng
          </button>
        </div>
      </form>
    </div>
  )
}