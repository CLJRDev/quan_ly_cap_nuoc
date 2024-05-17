import TuyenDoc from "../../select-option/TuyenDoc"
import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'


export default function QuanLyLapDatDongHoKhoi() {
  const [lichSus, setLichSus] = useState([])
  const [searchData, setSearchData] = useState({
    ma_dong_ho: '',
    ten_dong_ho: '',
    tinh_trang: '',
    ma_tuyen: ''
  })

  // const trangThaiOptions = [
  //   { value: '', label: 'Tất cả' },
  //   { value: '1', label: 'Đang lắp đặt' },
  //   { value: '0', label: 'Trống' },
  // ]

  // const xoa = id => {
  //   if (!window.confirm('Bạn có chắc chắn muốn xóa lịch sử lắp đặt này?'))
  //     return
  //   axios.delete(`http://127.0.0.1:8000/api/lap_dat_dh_khoi/${id}`)
  //     .then(response => {
  //       console.log(response.data.message);
  //       fetchData()
  //     })
  //     .catch(error => {
  //       console.log(error.response.data.error)
  //     });
  // }

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
      <td>{item.ten_tuyen}</td>
      <td>{item.tu_ngay}</td>
      <td>{item.den_ngay}</td>
      <td>{item.chi_so_dau}</td>
      <td>{item.chi_so_cuoi}</td>
      <td>{item.so_tieu_thu}</td>
      <td>
        {/* <Link className="btn-edit" to={`/lap_dat_dh_khoi/sua/${item.ma_lap_dat}`}>Sửa</Link>
        &nbsp; */}
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

  const handleSelectChange = (option, e) => {
    const name = e.name
    setSearchData(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    })
  }

  const timKiem = async () => {
    const { ma_dong_ho, ten_dong_ho, tinh_trang, ma_tuyen } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
    }
    if (ten_dong_ho != '') {
      queryString += `ten_dong_ho=${ten_dong_ho}&`
    }
    if (tinh_trang != '') {
      queryString += `tinh_trang=${tinh_trang}&`
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
    <div className="page">
      <h2 className="title">Quản lý lắp đặt đồng hồ khối</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
          <input required type="number" id='ma_dong_ho' name='ma_dong_ho' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="ten_dong_ho">Tên đồng hồ</label>
          <input type="text" id='ten_dong_ho' name='ten_dong_ho' onChange={handleInputChange} />
        </div>
        {/* <div>
          <label htmlFor="">Tình trạng</label>
          <Select
            options={trangThaiOptions}
            onChange={handleSelectChange}
            name="tinh_trang"
          />
        </div> */}
        <div>
          <label htmlFor="ma_tuyen">Tuyến đọc</label>
          <TuyenDoc
            onChange={handleSelectChange}
            isSearch={true}
            name='ma_tuyen'
          />
        </div>
        <div></div>
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