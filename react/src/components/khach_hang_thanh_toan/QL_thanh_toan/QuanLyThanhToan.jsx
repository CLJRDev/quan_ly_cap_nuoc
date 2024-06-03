import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import { format } from 'date-fns'
import TuyenDoc from '../../select-option/TuyenDoc'
import Nam from '../../select-option/Nam'
import Thang from '../../select-option/Thang'
import DateRangeComp from "../../react-components/DateRangeComp"
import SliderCom from "../../react-components/SliderCom"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import Sidebar from '../../layouts/Sidebar'

export default function QuanLyThanhToan() {
  const [hoaDons, setHoaDons] = useState([])
  const [searchData, setSearchData] = useState({
    ma_hop_dong: '',
    ma_dong_ho: '',
    thang: '',
    nam: '',
    ma_tuyen: ''
  })
  const [ngayGhiRange, setNgayGhiRange] = useState([{
    startDate: null,
    endDate: null,
    key: 'selection'
  }])

  //Paginate
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = hoaDons.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(hoaDons.length / itemsPerPage);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/hoa_don`)
      .then(response => {
        setHoaDons(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const hoaDonElements = currentItems.map((item, index) => {
    if (item.ma_phuong_thuc) {
      return <tr key={index}>
        <td>{item.ma_hoa_don}</td>
        <td>{item.ma_dong_ho}</td>
        <td>{item.ten_khach_hang}</td>
        <td>{item.ky_hoa_don}</td>
        <td>{item.so_tieu_thu}</td>
        <td>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(item.tong_tien_truoc_thue)}</td>
        <td>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(item.tong_tien_thue)}</td>
        <td>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(item.tong_cong)}</td>
        <td>
          {/* <button className="btn-edit">Gửi Email</button> */}
          {/* <Link to={`/hoa_don/xem/${item.ma_hoa_don}`} className="btn-edit">Xem chi tiết</Link>&nbsp;
          <button className="btn-edit">Hợp đồng</button>&nbsp;
          <button className="btn-edit">Gửi email</button> */}
          <div className="badge-success">Đã thanh toán</div>
        </td>
      </tr>
    }
  })

  const handleInputChange = (e) => {
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

  const handleNgayGhiChange = (newRange) => {
    setNgayGhiRange(newRange)
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hoaDons.length;
    setItemOffset(newOffset);
  }

  const timKiem = async () => {
    const { ma_dong_ho, ma_hop_dong, thang, nam, ma_tuyen } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
    }
    if (ma_hop_dong != '') {
      queryString += `ma_hop_dong=${ma_hop_dong}&`
    }
    if (thang != '' && nam != '') {
      queryString += `ky_hoa_don=T${thang} - ${nam}&`
    }
    if (ma_tuyen != '') {
      queryString += `ma_tuyen=${ma_tuyen}&`
    }
    if (ngayGhiRange[0].startDate) {
      queryString += `tu_ngay=${format(new Date(ngayGhiRange[0].startDate), 'yyyy-MM-dd')}&den_ngay=${format(new Date(ngayGhiRange[0].endDate), 'yyyy-MM-dd')}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/hoa_don_search/${queryString}`)
    setHoaDons(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý thanh toán</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ma_hop_dong">Mã hợp đồng</label>
            <input type="number" id='ma_hop_dong' name='ma_hop_dong' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
            <input type="number" id='ma_dong_ho' name='ma_dong_ho' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Kỳ hóa đơn</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
              <Thang
                onChange={handleSelectChange}
                name='thang'
              />
              <Nam
                onChange={handleSelectChange}
                name='nam'
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Ngày ghi</label>
            <DateRangeComp onDateChange={handleNgayGhiChange} />
          </div>
          <div>
            <label htmlFor="">Tuyến đọc</label>
            <TuyenDoc
              isSearch={true}
              name='ma_tuyen'
              onChange={handleSelectChange}
            />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-search">
              <IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm
            </button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách hóa đơn đã thanh toán</div>
          <table>
            <thead>
              <tr>
                <th>Mã HĐ</th>
                <th>Mã ĐH</th>
                <th>Tên KH</th>
                <th>Kỳ hóa đơn</th>
                <th>Số tiêu thụ</th>
                <th>Tiền trước thuế</th>
                <th>Tiền thuế</th>
                <th>Tổng tiền</th>
                <th>Tình trạng</th>
                {/* <th>Hành động</th> */}
              </tr>
            </thead>
            <tbody>
              {hoaDonElements}
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
