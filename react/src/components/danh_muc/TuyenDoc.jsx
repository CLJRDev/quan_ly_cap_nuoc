import axios from "axios"
import { IoMdSearch } from "react-icons/io"
import { useState, useEffect } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"
import PhuongXa from '../select-option/PhuongXa'
import ToQuanLy from '../select-option/ToQuanLy'
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../layouts/Paginate"

export default function TuyenDoc() {
  const [tuyenDocs, setTuyenDocs] = useState([])
  const [searchData, setSearchData] = useState({
    ten_tuyen: '',
    ma_to_quan_ly: '',
    ma_phuong_xa: ''
  })
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = tuyenDocs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tuyenDocs.length / itemsPerPage);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/tuyen_doc`)
      .then(response => {
        setTuyenDocs(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSelectChange = (selectedOption, event) => {
    setSearchData(pre => {
      return {
        ...pre,
        [event.name]: selectedOption.value
      }
    })
  }

  const handleInputChange = (e) => {
    setSearchData(pre => {
      return {
        ...pre,
        [e.target.name]: e.target.value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tuyenDocs.length;
    setItemOffset(newOffset);
  };

  const xoaTuyenDoc = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tuyến đọc này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/tuyen_doc/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa tuyến đọc này!')
      });
  }

  const tuyenDocElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_tuyen}</td>
      <td>{item.ten_tuyen}</td>
      <td>{item.ten_phuong_xa}</td>
      <td>{item.ten_to_quan_ly}</td>
      <td>
        <Link className="btn-edit" to={`/tuyen_doc/sua/${item.ma_tuyen}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaTuyenDoc(item.ma_tuyen)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const timKiem = async () => {
    const { ten_tuyen, ma_to_quan_ly, ma_phuong_xa } = searchData;
    let queryString = '?'
    if (ten_tuyen != '') {
      queryString += `ten_tuyen=${ten_tuyen}`
    }
    if (ma_to_quan_ly != '') {
      queryString += `&ma_to_quan_ly=${ma_to_quan_ly}`
    }
    if (ma_phuong_xa != '') {
      queryString += `&ma_phuong_xa=${ma_phuong_xa}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/tuyen_doc_search/${queryString}`)
    setTuyenDocs(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }
  
  return (
    <div className="page">
      <h2 className="title">Quản lý danh mục tuyến đọc</h2>
      <form className="form-container animated fadeInDown" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_tuyen">Tên tuyến đọc</label>
          <input type="text" id="ten_tuyen" name='ten_tuyen' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="chi_nhanh">Tổ quản lý</label>
          <ToQuanLy
            isSearch={true}
            onChange={handleSelectChange}
            name="ma_to_quan_ly"
          />
        </div>
        <div>
          <label htmlFor="chi_nhanh">Phường xã</label>
          <PhuongXa
            isSearch={true}
            onChange={handleSelectChange}
            name="ma_phuong_xa"
          />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm
          </button>
          &nbsp;
          <Link to='/tuyen_doc/them' className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm tuyến đọc
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách tuyến đọc</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Mã tuyến đọc</th>
              <th>Tuyến đọc</th>
              <th>Phường xã</th>
              <th>Tổ quản lý</th>
              <th style={{ width: '150px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tuyenDocElements}
          </tbody>
        </table>
        <Paginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
        />
      </div>
      <ToastContainer />
    </div>
  )
}