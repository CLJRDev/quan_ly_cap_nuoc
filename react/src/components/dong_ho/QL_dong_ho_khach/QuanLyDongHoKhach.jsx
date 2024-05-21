import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { format } from 'date-fns'
import LoaiDongHo from "../../select-option/LoaiDongHo"
import CoDongHo from "../../select-option/CoDongHo"
import NhaCungCap from "../../select-option/NhaCungCap"
import DateRangeComp from "../../react-components/DateRangeComp"
import SliderCom from "../../react-components/SliderCom"

export default function QuanLyDongHoKhach() {

  const [dongHoKhachs, setDongHoKhachs] = useState(null)
  const [searchData, setSearchData] = useState({
    ten_dong_ho: '',
    nam_san_xuat: '',
    so_seri: '',
    ma_loai_dong_ho: '',
    ma_nha_cung_cap: '',
    ma_co_dong_ho: '',
    tinh_trang: '',
    // ngay_nhap_tu: '',
    // ngay_nhap_den: '',
    // ngay_kiem_dinh_tu: '',
    // ngay_kiem_dinh_den: '',
    so_nam_hieu_luc_tu: '',
    so_nam_hieu_luc_den: '',
    so_thang_bao_hanh_tu: '',
    so_thang_bao_hanh_den: ''
  })
  const [ngayNhapRange, setNgayNhapRange] = useState([{
    startDate: null,
    endDate: null,
    key: 'selection'
  }])
  const [ngayKiemDinhRange, setNgayKiemDinhRange] = useState([{
    startDate: null,
    endDate: null,
    key: 'selection'
  }])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/dong_ho_khach`)
      .then(response => {
        setDongHoKhachs(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!dongHoKhachs) return null


  const trangThaiOptions = [
    { value: '', label: 'Tất cả' },
    { value: 1, label: 'Kích hoạt' },
    { value: 0, label: 'Khóa' },
  ]

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đồng hồ này này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/dong_ho_khach/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchData()
      })
      .catch(error => {
        console.log(error.response.data.error)
      });
  }

  const goLapDat = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn gỡ lắp đặt đồng hồ này này?'))
      return
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('tinh_trang', '0')

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/dong_ho_khach/${id}`, formData)
      console.log(response.data.message)
      fetchData()
    } catch (error) {
      console.log(error.response)
    }
  }

  const dongHoKhachElements = dongHoKhachs.map((item, index) => {
    return <tr key={index}>
      <td>{item.ten_dong_ho}</td>
      <td>{item.nam_san_xuat}</td>
      <td>{item.so_seri}</td>
      <td>{item.ten_loai_dong_ho}</td>
      <td>{item.ten_nha_cung_cap}</td>
      <td>{item.ten_co_dong_ho}</td>
      <td>{item.tinh_trang == 1 ? 'Đang lắp đặt' : 'Trống'}</td>
      <td>{format(new Date(item.ngay_nhap), 'dd-MM-yyyy')}</td>
      <td>{format(new Date(item.ngay_kiem_dinh), 'dd-MM-yyyy')}</td>
      <td>{item.so_nam_hieu_luc}</td>
      <td>{item.so_thang_bao_hanh}</td>
      <td>
        <Link className="btn-edit" to={`/dong_ho_khach/sua/${item.ma_dong_ho}`}>Sửa</Link>
        &nbsp;
        {item.tinh_trang == 1 && <button onClick={() => goLapDat(item.ma_dong_ho)} className="btn-edit">Gỡ</button>}
        &nbsp;
        <button onClick={() => xoa(item.ma_dong_ho)} className="btn-delete">Xóa</button>
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

  const handleNgayNhapChange = (newRange) => {
    setNgayNhapRange(newRange)
  }

  const handleNgayKiemDinhChange = (newRange) => {
    setNgayKiemDinhRange(newRange)
  }

  const handleNamHieuLucChange = (value) => {
    setSearchData(pre => {
      return {
        ...pre,
        so_nam_hieu_luc_tu: value[0],
        so_nam_hieu_luc_den: value[1]
      }
    })
  }

  const handleThangBaoHanhChange = (value) => {
    setSearchData(pre => {
      return {
        ...pre,
        so_thang_bao_hanh_tu: value[0],
        so_thang_bao_hanh_den: value[1]
      }
    })
  }

  const handleSubmit = async (e) => {

  }

  return (
    <div className="page">
      <h2 className="title">Quản lý đồng hồ khách hàng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_dong_ho">Tên đồng hồ</label>
          <input type="text" id='ten_dong_ho' name='ten_dong_ho' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="so_seri">Số seri</label>
          <input type="number" id='so_seri' name='so_seri' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="">Loại đồng hồ</label>
          <LoaiDongHo
            isSearch={true}
            onChange={handleSelectChange}
            name="ma_loai_dong_ho"
          />
        </div>
        <div>
          <label htmlFor="">Nhà cung cấp</label>
          <NhaCungCap
            isSearch={true}
            onChange={handleSelectChange}
            name="ma_nha_cung_cap"
          />
        </div>
        <div>
          <label htmlFor="">Kích cỡ</label>
          <CoDongHo
            isSearch={true}
            onChange={handleSelectChange}
            name="ma_co_dong_ho"
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
          <label htmlFor="">Ngày nhập</label>
          <DateRangeComp onDateChange={handleNgayNhapChange} />
        </div>
        <div>
          <label htmlFor="">Ngày kiểm định</label>
          <DateRangeComp onDateChange={handleNgayKiemDinhChange} />
        </div>
        <div>
          <label htmlFor="">Số năm hiệu lực</label>
          <SliderCom
            defaultValue={[0, 20]}
            minDistance={1}
            min={1}
            max={20}
            onChange={handleNamHieuLucChange}
          />
        </div>
        <div>
          <label htmlFor="">Số tháng bảo hành</label>
          <SliderCom
            defaultValue={[0, 99]}
            minDistance={5}
            min={1}
            max={99}
            onChange={handleThangBaoHanhChange}
          />
        </div>
        <div style={{ marginTop: '25px' }}>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm
          </button>
          &nbsp;
          <Link to='/dong_ho_khach/them' className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm đồng hồ
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách đồng hồ khách hàng</div>
        <table>
          <thead>
            <tr>
              <th>Tên đồng hồ</th>
              <th>Năm sản xuất</th>
              <th>Số seri</th>
              <th>Loại đồng hồ</th>
              <th>Nhà cung cấp</th>
              <th>Kích cỡ</th>
              <th>Tình trạng</th>
              <th>Ngày nhập</th>
              <th>Ngày kiểm định</th>
              <th>Năm hiệu lực</th>
              <th>Tháng bảo hành</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dongHoKhachElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}