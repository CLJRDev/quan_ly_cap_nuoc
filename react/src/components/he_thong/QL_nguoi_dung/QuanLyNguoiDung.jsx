// import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import { format } from 'date-fns'

export default function QuanLyNguoiDung() {
  const [users, setUsers] = useState(null)
  const [searchData, setSearchData] = useState({
    ma_nhan_vien: '',
    ho_ten: '',
    chuc_vu: '',
    so_dien_thoai: '',
    email: '',
    trang_thai: ''
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tai_khoan`)
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Lỗi lấy dữ liệu người dùng: ', error)
      })
  }, [])

  if (!users) return null

  const userElements = users.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_nhan_vien}</td>
      <td>{item.ho_ten}</td>
      <td>{item.chuc_vu}</td>
      <td>{format(new Date(item.ngay_sinh), 'dd-MM-yyyy')}</td>
      <td>{item.so_dien_thoai}</td>
      <td>{item.email}</td>
      <td>{item.trang_thai == 1 ? 'Kích hoạt' : 'Khóa'}</td>
      <td>
        <Link className="btn-edit" to={`/nguoi_dung/sua/${item.ma_nhan_vien}`}>Sửa</Link>
        &nbsp;
        <button className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  function handleChange(e) {
    const { name, value } = e.target
    setSearchData(preData => {
      return {
        ...preData,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ma_nhan_vien, ho_ten, chuc_vu, so_dien_thoai, email, trang_thai } = searchData;
    let queryString = '?'
    if (ma_nhan_vien != '') {
      queryString += `ma_nhan_vien=${ma_nhan_vien}`
    }
    if (ho_ten != '') {
      queryString += `&ho_ten=${ho_ten}`
    }
    if (chuc_vu != '') {
      queryString += `&chuc_vu=${chuc_vu}`
    }
    if (so_dien_thoai != '') {
      queryString += `&so_dien_thoai=${so_dien_thoai}`
    }
    if (email != '') {
      queryString += `&email=${email}`
    }
    if (trang_thai != '') {
      queryString += `&trang_thai=${trang_thai}`
    }

    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/tai_khoan_search/${queryString}`)
    setUsers(response.data)
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý người dùng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ma_nhan_vien">Mã nhân viên</label>
          <input type="text" id='ma_nhan_vien' name='ma_nhan_vien' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="chuc_vu">Chức vụ</label>
          <input type="text" id='chuc_vu' name='chuc_vu' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="trang_thai">Trạng thái</label>
          <select name="trang_thai" id="trang_thai" onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="1">Kích hoạt</option>
            <option value="0">Khóa</option>
          </select>
        </div>
        <div>
          <label htmlFor="so_dien_thoai">Số điện thoại</label>
          <input type="number" id='so_dien_thoai' name='so_dien_thoai' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ho_ten">Họ tên</label>
          <input type="text" id='ho_ten' name='ho_ten' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name='email' onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm
          </button>
          &nbsp;
          <Link to='/nguoi_dung/them' className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm người dùng
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách người dùng</div>
        <table className='table'>
          <thead>
            <tr>
              <th>Mã nhân viên</th>
              <th>Họ tên</th>
              <th>Chức vụ</th>
              <th>Ngày sinh</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}