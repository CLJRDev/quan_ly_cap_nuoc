import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import Sidebar from '../../layouts/Sidebar'

export default function QuanLyGiaNuoc() {
  const [loaiKhachHangs, setLoaiKhachHangs] = useState(null)
  const [gias, setGias] = useState([])
  const [searchData, setSearchData] = useState({
    ten_nhom_gia: '',
    ma_loai_khach_hang: ''
  })
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = gias.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(gias.length / itemsPerPage);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/nhom_gia`)
      .then(response => {
        setGias(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_khach_hang`)
      .then(response => {
        setLoaiKhachHangs(response.data)
      })
  }, [])

  if (!loaiKhachHangs) return null

  const options = [{ value: '', label: 'Tất cả' }]

  loaiKhachHangs.forEach(item => {
    options.push({
      value: item.ma_loai_khach_hang,
      label: item.ten_loai_khach_hang
    })
  })

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nhóm giá này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/nhom_gia/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa nhóm giá này!')
      });
  }

  if (!gias) return null
  const giaElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td style={{ width: '300px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.ten_nhom_gia}</td>
      <td>{item.ten_loai_khach_hang}</td>
      <td>{!item.hs_duoi_10m ? '0' : item.hs_duoi_10m}</td>
      <td>{!item.hs_tu_10m_den_20m ? '0' : item.hs_tu_10m_den_20m}</td>
      <td>{!item.hs_tu_20m_den_30m ? '0' : item.hs_tu_20m_den_30m}</td>
      <td>{!item.hs_tren_30m ? '0' : item.hs_tren_30m}</td>
      <td>{!item.hs_rieng ? '0' : item.hs_rieng}</td>
      <td>{item.hs_thue}</td>
      <td>{item.gia_ban}</td>
      <td>
        <Link className="btn-edit" to={`/gia_nuoc/sua/${item.ma_nhom_gia}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoa(item.ma_nhom_gia)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const handleInputChange = (e) => {
    setSearchData(preData => {
      return {
        ...preData,
        ten_nhom_gia: e.target.value
      }
    })
  }

  const handleSelectChange = (option) => {
    setSearchData(preData => {
      return {
        ...preData,
        ma_loai_khach_hang: option.value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % gias.length;
    setItemOffset(newOffset);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ten_nhom_gia, ma_loai_khach_hang } = searchData;
    let queryString = '?'
    if (ten_nhom_gia != '') {
      queryString += `ten_nhom_gia=${ten_nhom_gia}&`
    }
    if (ma_loai_khach_hang != '') {
      queryString += `ma_loai_khach_hang=${ma_loai_khach_hang}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/nhom_gia_search/${queryString}`)
    setGias(response.data)
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý giá nước</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_nhom_gia">Tên nhóm giá</label>
            <input type="text" id='ten_nhom_gia' name='ten_nhom_gia' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="loai_khach_hang">Loại khách hàng</label>
            <Select
              options={options}
              onChange={handleSelectChange}
            />
          </div>
          <div>
            <button type="submit" className="btn-search">
              <IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm
            </button>
            &nbsp;
            <Link to='/gia_nuoc/them' className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm nhóm giá
            </Link>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách nhóm giá</div>
          <table>
            <thead>
              <tr>
                <th>Tên nhóm giá</th>
                <th>Loại khách hàng</th>
                <th>HS dưới 10m³</th>
                <th>HS 10m³ đến 20m³</th>
                <th>HS 20m³ đến 30m³</th>
                <th>HS trên 30m³</th>
                <th>HS riêng</th>
                <th>HS thuế</th>
                <th>Giá bán</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {giaElements}
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