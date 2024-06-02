import axios from "axios"
import { useState, useEffect } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../layouts/Paginate"
import Sidebar from '../layouts/Sidebar'

export default function ChiNhanh() {
  const [chiNhanhs, setChiNhanhs] = useState([])
  const [chiNhanhData, setChiNhanhData] = useState(null)
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = chiNhanhs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(chiNhanhs.length / itemsPerPage);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/chi_nhanh`)
      .then(response => {
        setChiNhanhs(response.data)
      })
  }

  const chiNhanhElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_chi_nhanh}</td>
      <td>{item.ten_chi_nhanh}</td>
      <td>{item.dia_chi}</td>
      <td>
        <Link className="btn-edit" to={`/chi_nhanh/sua/${item.ma_chi_nhanh}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaChiNhanh(item.ma_chi_nhanh)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoaChiNhanh = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa chi nhánh này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/chi_nhanh/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa chi nhánh này!')
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setChiNhanhData(preChiNhanh => {
      return {
        ...preChiNhanh,
        [name]: value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % chiNhanhs.length;
    setItemOffset(newOffset);
  };

  const themChiNhanh = async () => {
    const formData = new FormData()
    formData.append('ten_chi_nhanh', chiNhanhData.ten_chi_nhanh)
    formData.append('dia_chi', chiNhanhData.dia_chi)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/chi_nhanh`, formData)
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
    await themChiNhanh()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý danh mục chi nhánh</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_chi_nhanh">Tên chi nhánh</label>
            <input required type="text" name="ten_chi_nhanh" id="ten_chi_nhanh" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input required type="text" name="dia_chi" id="dia_chi" onChange={handleChange} />
          </div>
          <div>
            <button type="submit" className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp;Thêm chi nhánh
            </button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách chi nhánh</div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Mã chi nhánh</th>
                <th style={{ width: '200px' }}>Tên chi nhánh</th>
                <th>Địa chỉ</th>
                <th style={{ width: '150px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {chiNhanhElements}
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