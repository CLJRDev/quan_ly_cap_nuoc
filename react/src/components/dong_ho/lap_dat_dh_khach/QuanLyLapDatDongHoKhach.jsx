import HopDong from "../../select-option/HopDong"
import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'


export default function QuanLyLapDatDongHoKhach() {
  const [lichSus, setLichSus] = useState([])
  const [searchData, setSearchData] = useState({
    ma_dong_ho: ''
  })

  let first = true
  const lichSuElements = lichSus.map((item, index) => {
    const deleteButton = first === true ?
      <button onClick={() => xoa(item.ma_lap_dat)} className="btn-delete">Xóa</button>
      :
      <button style={{ background: '#ccc' }} className="btn-delete">Xóa</button>
    first = false;
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
      <td>
        {deleteButton}
      </td>
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

  const timKiem = async () => {
    const { ma_dong_ho } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
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
    <div className="page">
      <h2 className="title">Quản lý lắp đặt đồng hồ khách hàng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
          <input required type="number" id='ma_dong_ho' name='ma_dong_ho' onChange={handleInputChange} />
        </div>
        {/* <div>
          <label htmlFor="ten_dong_ho">Tên đồng hồ</label>
          <input type="text" id='ten_dong_ho' name='ten_dong_ho' onChange={handleInputChange} />
        </div> */}
        {/* <div>
          <label htmlFor="ma_tuyen">Hợp đồng</label>
          <HopDong
            onChange={handleSelectChange}
            isSearch={true}
            name='ma_tuyen'
          />
        </div> */}
        <div></div>
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
        <div className="title" style={{ marginBottom: '5px' }}>Lịch sử lắp đặt đồng hồ khối</div>
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
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {lichSuElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}