import HopDong from "../../select-option/HopDong"
import DongHoKhach from "../../select-option/DongHoKhach"
import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'
import Paginate from "../../layouts/Paginate"

export default function QuanLyLapDatDongHoKhach() {
  const [lichSus, setLichSus] = useState([])
  const [searchData, setSearchData] = useState({
    ma_dong_ho: '',
    ma_hop_dong: ''
  })

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = lichSus.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(lichSus.length / itemsPerPage);

  useEffect(() => {
    timKiem()
  }, [])

  const lichSuElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_dong_ho}</td>
      <td>{item.ten_dong_ho}</td>
      <td>{item.ma_hop_dong}</td>
      <td>{item.ten_tuyen}</td>
      <td>{item.tu_ngay}</td>
      <td>{item.den_ngay}</td>
      <td>{item.chi_so_dau}</td>
      <td>{item.chi_so_cuoi}</td>
      <td>{item.so_tieu_thu}</td>
    </tr>
  })

  const handleSelectChange = (option, e) => {
    const name = e.name
    setSearchData(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % lichSus.length;
    setItemOffset(newOffset);
  }

  const timKiem = async () => {
    const { ma_dong_ho, ma_hop_dong } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
    }
    if (ma_hop_dong != '') {
      queryString += `ma_hop_dong=${ma_hop_dong}&`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/lap_dat_dh_khach_search/${queryString}`)
    setLichSus(response.data)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý lắp đặt đồng hồ khách hàng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
            <DongHoKhach
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_dong_ho'
            />
          </div>
          <div>
            <label htmlFor="ma_hop_dong">Mã hợp đồng</label>
            <HopDong
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_hop_dong'
            />
          </div>
          <div>
            <button type="submit" className="btn-search">
              <IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm
            </button>
            &nbsp;
            <Link to='/lap_dat_dh_khach/them' className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Lắp đặt đồng hồ
            </Link>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Lịch sử lắp đặt đồng hồ khách hàng</div>
          <table>
            <thead>
              <tr>
                <th>Mã đồng hồ</th>
                <th>Tên đồng hồ</th>
                <th>Mã hợp đồng</th>
                <th>Tuyến đọc</th>
                <th>Ngày lắp</th>
                <th>Ngày kết thúc</th>
                <th>Chỉ số đầu</th>
                <th>Chỉ số cuối</th>
                <th>Số tiêu thụ</th>
              </tr>
            </thead>
            <tbody>
              {lichSuElements}
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