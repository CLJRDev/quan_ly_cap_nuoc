import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import { format } from 'date-fns'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import TrangThai from '../../select-option/TrangThai'
import Sidebar from '../../layouts/Sidebar';
import { MdBackup } from "react-icons/md";

export default function QuanLyNguoiDung() {
  const [users, setUsers] = useState([])
  const [searchData, setSearchData] = useState({
    ma_nhan_vien: '',
    ho_ten: '',
    chuc_vu: '',
    sdt: '',
    email: '',
    trang_thai: ''
  })
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/tai_khoan`)
      .then(response => {
        setUsers(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const xoaNguoiDung = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/tai_khoan/${id}`)
      .then(response => {
        SuccessToast(response.data.message)
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa người dùng này!')
      })
  }

  const userElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_nhan_vien}</td>
      <td>{item.ho_ten}</td>
      <td>{item.chuc_vu}</td>
      <td>{format(new Date(item.ngay_sinh), 'dd-MM-yyyy')}</td>
      <td>{item.sdt != 0 ? `${item.sdt}` : 'Đang trống'}</td>
      <td>{item.email}</td>
      <td>
        {item.trang_thai == 1 ?
          <div className="badge-success">Kích hoạt</div> :
          <div className="badge-fail">Khóa</div>}
      </td>
      <td>
        <Link className="btn-edit" to={`/nguoi_dung/sua/${item.ma_nhan_vien}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoaNguoiDung(item.ma_nhan_vien)} className="btn-delete">Xóa</button>
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

  const handleSelectChange = (option, e) => {
    setSearchData(pre => {
      return {
        ...pre,
        trang_thai: option.value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ma_nhan_vien, ho_ten, chuc_vu, sdt, email, trang_thai } = searchData;
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
    if (sdt != '') {
      queryString += `&sdt=${sdt}`
    }
    if (email != '') {
      queryString += `&email=${email}`
    }
    if (trang_thai != '') {
      queryString += `&trang_thai=${trang_thai}`
    }
    const response = await axios.get(`http://127.0.0.1:8000/api/tai_khoan_search/${queryString}`)
    setUsers(response.data)
  }

  const backupDatabase = () => {
    axios.get(`http://127.0.0.1:8000/api/backup`)
      .then(response => {
        SuccessToast(response.data.message)
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  return (
    <>
      <Sidebar />
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
            <TrangThai
              isSearch={true}
              name='trang_thai'
              onChange={handleSelectChange}
            />
          </div>
          <div>
            <label htmlFor="sdt">Số điện thoại</label>
            <input type="number" id='sdt' name='sdt' onChange={handleChange} />
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
            </Link>&nbsp;
            <button className="btn-edit" type="button" onClick={() => backupDatabase()}><MdBackup style={{ transform: 'scale(1.2)' }} />
              &nbsp; Backup Database</button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách người dùng</div>
          <table>
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
          <Paginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        </div>
        <ToastContainer />
      </div>
    </>

  )
}