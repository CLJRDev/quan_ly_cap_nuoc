import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { CgImport } from "react-icons/cg";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, useRef } from "react"
import Select from 'react-select'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import Sidebar from '../../layouts/Sidebar'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { TbTableExport } from "react-icons/tb";

export default function QuanLyKhachHang() {
  const tableRef = useRef(null)
  const [khachHangs, setKhachHangs] = useState([])
  const [searchData, setSearchData] = useState({
    ten_khach_hang: '',
    can_cuoc: '',
    dia_chi: '',
    sdt: '',
    email: ''
  })
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = khachHangs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(khachHangs.length / itemsPerPage);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/khach_hang`)
      .then(response => {
        setKhachHangs(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/khach_hang/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa khách hàng này!')
      });
  }

  const khachHangElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_khach_hang}</td>
      <td>{item.ten_khach_hang}</td>
      <td>{item.can_cuoc}</td>
      <td>{item.dia_chi}</td>
      <td>{item.sdt}</td>
      <td>{item.email}</td>
      <td>
        <Link className="btn-edit" to={`/xem_hop_dong_from_khach_hang/${item.ma_khach_hang}`}>Hợp đồng</Link>&nbsp;
        <Link className="btn-edit" to={`/them_hop_dong_from_khach_hang/${item.can_cuoc}`}>Tạo hợp đồng</Link>&nbsp;
        <Link className="btn-edit" to={`/khach_hang/sua/${item.ma_khach_hang}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoa(item.ma_khach_hang)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const khachHangCloneElements = khachHangs.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_khach_hang}</td>
      <td>{item.ten_khach_hang}</td>
      <td>{item.can_cuoc}</td>
      <td>{item.dia_chi}</td>
      <td>{item.sdt}</td>
      <td>{item.email}</td>
    </tr>
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setSearchData(preData => {
      return {
        ...preData,
        [name]: value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % khachHangs.length;
    setItemOffset(newOffset);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ten_khach_hang, can_cuoc, dia_chi, sdt, email } = searchData;
    let queryString = '?'
    if (ten_khach_hang != '') {
      queryString += `ten_khach_hang=${ten_khach_hang}`
    }
    if (can_cuoc != '') {
      queryString += `&can_cuoc=${can_cuoc}`
    }
    if (dia_chi != '') {
      queryString += `&dia_chi=${dia_chi}`
    }
    if (sdt != '') {
      queryString += `&sdt=${sdt}`
    }
    if (email != '') {
      queryString += `&email=${email}`
    }
    const response = await axios.get(`http://127.0.0.1:8000/api/khach_hang_search/${queryString}`)
    setKhachHangs(response.data)
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý khách hàng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_khach_hang">Tên khách hàng</label>
            <input type="text" id='ten_khach_hang' name='ten_khach_hang' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="can_cuoc">Căn cước công dân</label>
            <input type="number" id='can_cuoc' name='can_cuoc' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="sdt">Số điện thoại</label>
            <input type="number" id='sdt' name='sdt' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id='email' name='email' onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-search">
              <IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm
            </button>
            &nbsp;
            <Link to='/khach_hang/them' className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm khách hàng
            </Link>
            &nbsp;
            <Link to='/khach_hang/import_excel' className="btn-add">
              <CgImport style={{ transform: 'scale(1.2)' }} />
              &nbsp; Import Excel
            </Link>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách khách hàng</div>
          <table>
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Tên khách hàng</th>
                <th>Số CCCD</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {khachHangElements}
            </tbody>
          </table>
          <table style={{ display: 'none' }} ref={tableRef}>
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Tên khách hàng</th>
                <th>Số CCCD</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {khachHangCloneElements}
            </tbody>
          </table>
          <Paginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <DownloadTableExcel
              filename="danh_sach_khach_hang"
              sheet="Danh sách khách hàng"
              currentTableRef={tableRef.current}
            >
              <button type="button" className="btn-export">
                <TbTableExport style={{ transform: 'scale(1.2)' }} />&nbsp; Xuất file Excel
              </button>
            </DownloadTableExcel>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}