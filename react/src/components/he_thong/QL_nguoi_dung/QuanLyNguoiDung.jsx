// import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"

export default function QuanLyNguoiDung() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/tai_khoan`)
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
      <td>{item.ngay_sinh}</td>
      <td>{item.so_dien_thoai}</td>
      <td>{item.email}</td>
      <td>{item.trang_thai}</td>
      <td>
        <Link className="btn-edit" to={`/nguoi_dung/sua/${item.ma_nhan_vien}`}>Sửa</Link>
        &nbsp;
        <button className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  return (
    <div className="page">
      <h2 className="title">Quản lý người dùng</h2>
      <form className="form-container">
        <div>
          <label htmlFor="">Mã nhân viên</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Chức vụ</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Trạng thái</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Số điện thoại</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Họ tên</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" />
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
      <div className="table-container">
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
            {/* <tr>
              <td>100000</td>
              <td>Nguyễn Văn A</td>
              <td>Nhân viên</td>
              <td>05/05/1999</td>
              <td>0865089888</td>
              <td>example@gmail.com</td>
              <td>Kích hoạt</td>
              <td>
                <button className="btn-edit">Sửa</button>
                &nbsp;
                <button className="btn-delete">Xóa</button>
              </td>
            </tr> */}
            {userElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}