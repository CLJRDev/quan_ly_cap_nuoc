import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import HopDong from "../../select-option/HopDong"
import DongHoKhach from "../../select-option/DongHoKhach"
import Sidebar from '../../layouts/Sidebar'
import Paginate from "../../layouts/Paginate"

export default function QuanLyGhiChiSoDongHoKhach() {
  const [lichSus, setLichSus] = useState([])
  const [searchData, setSearchData] = useState({
    ma_hop_dong: '',
    ma_dong_ho: ''
  })
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = lichSus.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(lichSus.length / itemsPerPage);

  useEffect(() => {
    timKiem()
  }, [])

  // let first = true
  const lichSuElements = currentItems.map((item, index) => {
    // const actions = first === true ?
    //   <td style={{ display: 'flex', justifyContent: 'center' }}>
    //     <Link className="btn-edit" to={`/ghi_chi_so_dh_khach/sua/${item.ma_hoa_don}`}>Sửa</Link>
    //     &nbsp;
    //     <button onClick={() => xoa(item.ma_hoa_don)} className="btn-delete">Xóa</button>
    //   </td>
    //   :
    //   <td style={{ display: 'flex', justifyContent: 'center' }}>
    //     <button style={{ background: '#ccc' }} className="btn-edit">Sửa</button>
    //     &nbsp;
    //     <button style={{ background: '#ccc' }} className="btn-delete">Xóa</button>
    //   </td>

    // first = false;
    return <tr key={index}>
      <td>{item.ma_dong_ho}</td>
      <td>{item.ky_hoa_don}</td>
      <td>{item.tu_ngay}</td>
      <td>{item.den_ngay}</td>
      <td>{item.chi_so_cu}</td>
      <td>{item.chi_so_moi}</td>
      <td>{item.so_tieu_thu}</td>
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ background: '#ccc' }} className="btn-edit">Sửa</button>
        &nbsp;
        <button style={{ background: '#ccc' }} className="btn-delete">Xóa</button>
      </td>
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

  const timKiem = async (e) => {
    const { ma_hop_dong, ma_dong_ho } = searchData;
    let queryString = '?'
    if (ma_hop_dong != '') {
      queryString += `ma_hop_dong=${ma_hop_dong}&`
    }
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/hoa_don_search/${queryString}`)
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
        <h2 className="title">Quản lý ghi chỉ số đồng hồ KHÁCH HÀng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Mã hợp đồng</label>
            <HopDong
              onChange={handleSelectChange}
              name='ma_hop_dong'
            />
          </div>
          <div>
            <label htmlFor="">Mã đồng hồ</label>
            <DongHoKhach
              onChange={handleSelectChange}
              name='ma_dong_ho'
            />
          </div>
          <div>
            <button type="submit" className="btn-search">
              <IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm
            </button>
            &nbsp;
            <Link to='/ghi_chi_so_dh_khach/thoi_gian' className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Ghi chỉ số
            </Link>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Lịch sử ghi chỉ số đồng hồ khách hàng</div>
          <table>
            <thead>
              <tr>
                <th>Mã đồng hồ</th>
                <th>Kỳ hóa đơn</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
                <th>Chỉ số cũ</th>
                <th>Chỉ số mới</th>
                <th>Số tiêu thụ</th>
                <th>Hành động</th>
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
    </>
  )
}