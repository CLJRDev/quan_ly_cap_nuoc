import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import DongHoKhoi from "../../select-option/DongHoKhoi"

export default function QuanLyGhiChiSoDongHoKhoi() {
  const [lichSus, setLichSus] = useState([])
  const [searchData, setSearchData] = useState({
    ma_dong_ho: ''
  })

  let first = true
  const lichSuElements = lichSus.map((item, index) => {
    const actions = first === true ?
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        <Link className="btn-edit" to={`/ghi_chi_so_dh_khoi/sua/${item.ma_lich_su}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoa(item.ma_lich_su)} className="btn-delete">Xóa</button>
      </td>
      :
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ background: '#ccc' }} className="btn-edit">Sửa</button>
        &nbsp;
        <button style={{ background: '#ccc' }} className="btn-delete">Xóa</button>
      </td>

    first = false;
    return <tr key={index}>
      <td>{item.ma_lich_su}</td>
      <td>{item.ky_chi_so}</td>
      <td>{item.tu_ngay}</td>
      <td>{item.den_ngay}</td>
      <td>{item.chi_so_cu}</td>
      <td>{item.chi_so_moi}</td>
      <td>{item.so_tieu_thu}</td>
      <td>{item.ten_tuyen}</td>
      {actions}
    </tr>
  })

  const handleSelectChange = (option, e) => {
    const name = e.name
    setSearchData({ [name]: option.value })
  }

  const timKiem = async () => {
    const { ma_dong_ho } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/lich_su_dh_khoi_search/${queryString}`)
    setLichSus(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý ghi chỉ số đồng hồ khối</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Mã đồng hồ</label>
          <DongHoKhoi
            onChange={handleSelectChange}
            name='ma_dong_ho'
          />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm
          </button>
          &nbsp;
          <Link to='/ghi_chi_so_dh_khoi/thoi_gian' className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Ghi chỉ số
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Lịch sử ghi chỉ số đồng hồ khối</div>
        <table>
          <thead>
            <tr>
              <th>Mã lịch sử</th>
              <th>Kỳ chỉ số</th>
              <th>Từ ngày</th>
              <th>Đến ngày</th>
              <th>Chỉ số cũ</th>
              <th>Chỉ số mới</th>
              <th>Số tiêu thụ</th>
              <th>Tuyến đọc</th>
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