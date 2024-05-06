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
    so_dien_thoai: '',
    email: '',
    trang_thai: ''
  })

  function handleChange(e) {
    const [name, value] = e.target;
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
    formData.append('so_dien_thoai', user.so_dien_thoai)
    formData.append('trang_thai', user.trang_thai)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tai_khoan`, formData)
      console.log(response.data.message)
      navigate('/nguoi_dung')
    } catch (er) {
      console.log(er.response.data.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDeafault()
    await themNguoiDung()
  }

  return (
    <div className="page">
      <h2 className="title">Thêm người dùng</h2>
      <form className="form-container">
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
          <label htmlFor="so_dien_thoai">Số điện thoại</label>
          <input type="number" id='so_dien_thoai' name='so_dien_thoai' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="mat_khau">Mật khẩu</label>
          <input type="text" id='mat_khau' name='mat_khau' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="xac_nhan_mat_khau">Xác nhận mật khẩu</label>
          <input type="text" id='xac_nhan_mat_khau' name='xac_nhan_mat_khau' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ngay_sinh">Ngày sinh</label>
          <input type="date" id='ngay_sinh' name='ngay_sinh' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="trang_thai">Trạng thái</label>
          <select name="trang_thai" id="trang_thai" onChange={handleChange}>
            <option value="1">Kích hoạt</option>
            <option value="0">Khóa</option>
          </select>
        </div>
        <div>
          <button type='submit' onSubmit={handleSubmit} className='btn-add'>
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm người dùng
          </button>
        </div>
      </form>
    </div>
  )
}