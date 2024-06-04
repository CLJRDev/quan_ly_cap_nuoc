import TuyenDoc from "../../select-option/TuyenDoc"
import DongHoKhoi from "../../select-option/DongHoKhoi"
import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Sidebar from '../../layouts/Sidebar'
import Paginate from "../../layouts/Paginate"
import { ToastContainer } from "react-toastify"

export default function QuanLyLapDatDongHoKhoi() {
  const [lichSus, setLichSus] = useState([])
  const [searchData, setSearchData] = useState({
    ma_dong_ho: '',
    ma_tuyen: ''
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
      <td>{item.ten_tuyen}</td>
      <td>{item.tu_ngay}</td>
      <td>{item.den_ngay}</td>
      <td>{item.chi_so_dau}</td>
      <td>{item.chi_so_cuoi}</td>
      <td>{item.so_tieu_thu}</td>
    </tr>
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setSearchData(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

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
    const { ma_dong_ho, ma_tuyen } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
    }
    if (ma_tuyen != '') {
      queryString += `ma_tuyen=${ma_tuyen}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/lap_dat_dh_khoi_search/${queryString}`)
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
        <h2 className="title">Quản lý lắp đặt đồng hồ khối</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
            <DongHoKhoi
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_dong_ho'
            />
          </div>
          <div>
            <label htmlFor="ma_tuyen">Tuyến đọc</label>
            <TuyenDoc
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_tuyen'
            />
          </div>
          <div>
            <button type="submit" className="btn-search">
              <IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm
            </button>
            &nbsp;
            <Link to='/lap_dat_dh_khoi/them' className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Lắp đặt đồng hồ
            </Link>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Lịch sử lắp đặt đồng hồ khối</div>
          <table>
            <thead>
              <tr>
                <th>Mã đồng hồ</th>
                <th>Tên đồng hồ</th>
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
      </div>
      <ToastContainer />
    </>
  )
}