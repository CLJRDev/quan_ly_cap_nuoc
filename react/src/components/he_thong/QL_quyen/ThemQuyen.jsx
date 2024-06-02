import axios from "axios"
import { useEffect, useState } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import TrangThai from '../../select-option/TrangThai'
import Sidebar from '../../layouts/Sidebar'

export default function ThemQuyen() {
  const [quyens, setQuyens] = useState([])
  const [quyen, setQuyen] = useState({
    ten_quyen: '',
    trang_thai: ''
  })
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = quyens.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(quyens.length / itemsPerPage);


  const fetchData = async () => {
    await axios.get(`http://127.0.0.1:8000/api/quyen`)
      .then(response => {
        setQuyens(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const xoaQuyen = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa quyền này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/quyen/${id}`)
      .then(response => {
        SuccessToast(response.data.message)
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa quyền này!')
      });
  }

  const quyenElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_quyen}</td>
      <td>{item.ten_quyen}</td>
      <td>
        {item.trang_thai == 1 ?
          <div className="badge-success">Kích hoạt</div> :
          <div className="badge-fail">Khóa</div>}
      </td>
      <td>
        <Link className="btn-edit" to={`/quyen/sua/${item.ma_quyen}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoaQuyen(item.ma_quyen)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setQuyen(preQuyen => {
      return {
        ...preQuyen,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option, e) => {
    setQuyen(pre => {
      return {
        ...pre,
        trang_thai: option.value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % quyens.length;
    setItemOffset(newOffset);
  };

  const themQuyen = async () => {
    const formData = new FormData()
    formData.append('ten_quyen', quyen.ten_quyen)
    formData.append('trang_thai', quyen.trang_thai)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/quyen`, formData)
      SuccessToast(response.data.message)
      fetchData()
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themQuyen()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý quyền</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_quyen">Tên quyền</label>
            <input type="text" id='ten_quyen' name='ten_quyen' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="trang_thai">Trạng thái</label>
            <TrangThai
              name='trang_thai'
              onChange={handleSelectChange}
            />
          </div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp;Thêm quyền
            </button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách quyền</div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Mã quyền</th>
                <th>Tên quyền</th>
                <th style={{ width: '100px' }}>Trạng thái</th>
                <th style={{ width: '100px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {quyenElements}
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