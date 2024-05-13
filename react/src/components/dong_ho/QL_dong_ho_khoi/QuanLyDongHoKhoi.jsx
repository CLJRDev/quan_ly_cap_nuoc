import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { format } from 'date-fns'


export default function QuanLyDongHoKhoi() {
  const [loaiDongHos, setLoaiDongHos] = useState(null)
  const [coDongHos, setCoDongHos] = useState(null)
  const [nhaCungCaps, setNhaCungCaps] = useState(null)
  const [dongHoKhois, setDongHoKhois] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_dong_ho`)
      .then(response => {
        setLoaiDongHos(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/co_dong_ho`)
      .then(response => {
        setCoDongHos(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/nha_cung_cap`)
      .then(response => {
        setNhaCungCaps(response.data)
      })
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/dong_ho_khoi`)
      .then(response => {
        setDongHoKhois(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  if (!loaiDongHos) return null
  if (!coDongHos) return null
  if (!nhaCungCaps) return null
  if (!dongHoKhois) return null

  const loaiDongHoOptions = []
  const coDongHoOptions = []
  const nhaCungCapOptions = []

  loaiDongHos.forEach(item => {
    loaiDongHoOptions.push({
      value: item.ma_loai_dong_ho,
      label: item.ten_loai_dong_ho
    })
  })

  coDongHos.forEach(item => {
    coDongHoOptions.push({
      value: item.ma_co_dong_ho,
      label: item.ten_co_dong_ho
    })
  })

  nhaCungCaps.forEach(item => {
    nhaCungCapOptions.push({
      value: item.ma_nha_cung_cap,
      label: item.ten_nha_cung_cap
    })
  })

  const trangThaiOptions = [
    { value: '', label: 'Tất cả' },
    { value: 1, label: 'Kích hoạt' },
    { value: 0, label: 'Khóa' },
  ]

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đồng hồ này này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/dong_ho_khoi/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchData()
      })
      .catch(error => {
        console.log(error.response.data.error)
      });
  }

  const dongHoKhoiElements = dongHoKhois.map((item, index) => {
    return <tr key={index}>
      <td>{item.ten_dong_ho}</td>
      <td>{item.ten_loai_dong_ho}</td>
      <td>{item.ten_nha_cung_cap}</td>
      <td>{item.ten_co_dong_ho}</td>
      <td>{item.tinh_trang == 1 ? 'Đang lắp đặt' : 'Trống'}</td>
      <td>{format(new Date(item.ngay_nhap), 'dd-MM-yyyy')}</td>
      <td>{format(new Date(item.ngay_kiem_dinh), 'dd-MM-yyyy')}</td>
      <td>{item.so_nam_hieu_luc}</td>
      <td>{item.so_thang_bao_hanh}</td>
      <td>
        <Link className="btn-edit" to={`/dong_ho_khoi/sua/${item.ma_dong_ho}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoa(item.ma_dong_ho)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const handleInputChange = (e) => {

  }

  const handleSelectChange = (option) => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý đồng hồ khối</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_dong_ho">Tên đồng hồ</label>
          <input type="text" id='ten_dong_ho' name='ten_dong_ho' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="">Loại đồng hồ</label>
          <Select
            options={loaiDongHoOptions}
            onChange={handleSelectChange}
            name="loai_dong_ho"
          />
        </div>
        <div>
          <label htmlFor="">Nhà cung cấp</label>
          <Select
            options={nhaCungCapOptions}
            onChange={handleSelectChange}
            name="nha_cung_cap"
          />
        </div>
        <div>
          <label htmlFor="">Kích cỡ</label>
          <Select
            options={coDongHoOptions}
            onChange={handleSelectChange}
            name="kich_co"
          />
        </div>
        <div>
          <label htmlFor="">Tình trạng</label>
          <Select
            options={trangThaiOptions}
            onChange={handleSelectChange}
            name="tinh_trang"
          />
        </div>
        <div>
          <label htmlFor="ngay_nhap">Ngày nhập</label>
          <input type="date" id='ngay_nhap' name='ngay_nhap' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="ngay_kiem_dinh">Ngày kiểm định</label>
          <input type="date" id='ngay_kiem_dinh' name='ngay_kiem_dinh' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="so_nam_hieu_luc">Số năm hiệu lực</label>
          <input type="number" id='so_nam_hieu_luc' name='so_nam_hieu_luc' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="so_thang_bao_hanh">Số tháng bảo hành</label>
          <input type="number" id='so_thang_bao_hanh' name='so_thang_bao_hanh' onChange={handleInputChange} />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm
          </button>
          &nbsp;
          <Link to='/dong_ho_khoi/them' className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm đồng hồ khối
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách đồng hồ khối</div>
        <table>
          <thead>
            <tr>
              <th>Tên đồng hồ</th>
              <th>Loại đồng hồ</th>
              <th>Nhà cung cấp</th>
              <th>Kích cỡ</th>
              <th>Tình trạng</th>
              <th>Ngày nhập</th>
              <th>Ngày kiểm định</th>
              <th>Số năm hiệu lực</th>
              <th>Số tháng bảo hành</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dongHoKhoiElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}