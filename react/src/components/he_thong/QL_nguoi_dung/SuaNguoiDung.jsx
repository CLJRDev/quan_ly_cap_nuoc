import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdOutlineEdit } from "react-icons/md";

export default function SuaNguoiDung() {
  const navigate = useNavigate()
  const { id } = useParams()

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

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tai_khoan/${id}`)
      .then(response => {
        setUser(response.data)
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

  const suaNguoiDung = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ho_ten', user.ho_ten)
    formData.append('chuc_vu', user.chuc_vu)
    formData.append('ngay_sinh', user.ngay_sinh)
    formData.append('sdt', user.sdt)
    formData.append('email', user.email)
    formData.append('trang_thai', user.trang_thai)
    if (user.mat_khau != '') {
      formData.append('mat_khau', user.mat_khau)
      formData.append('xac_nhan_mat_khau', user.xac_nhan_mat_khau)
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tai_khoan/${id}`, formData)
      console.log(response.data.message)
      navigate('/nguoi_dung')
    } catch (er) {

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaNguoiDung()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa người dùng: {id}</h2>
      <form className="form-container" onSubmit={handleSubmit} >
        <div>
          <label htmlFor="ho_ten">Họ tên</label>
          <input type="text" id='ho_ten' name='ho_ten' onChange={handleChange} value={user.ho_ten} />
        </div>
        <div>
          <label htmlFor="chuc_vu">Chức vụ</label>
          <input type="text" id='chuc_vu' name='chuc_vu' onChange={handleChange} value={user.chuc_vu} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id='email' name='email' onChange={handleChange} value={user.email} />
        </div>
        <div>
          <label htmlFor="sdt">Số điện thoại</label>
          <input type="number" id='sdt' name='sdt' onChange={handleChange} value={user.sdt} />
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
          <input type="date" id='ngay_sinh' name='ngay_sinh' onChange={handleChange} value={user.ngay_sinh} />
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
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp;Sửa người dùng
          </button>
        </div>
      </form>
    </div>
  )
}