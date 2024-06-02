import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdOutlineEdit } from "react-icons/md"
import { format } from 'date-fns'
import DateRangeComp from "../../react-components/DateRangeComp"
import SliderCom from "../../react-components/SliderCom"
import LoaiDongHo from "../../select-option/LoaiDongHo"
import CoDongHo from "../../select-option/CoDongHo"
import NhaCungCap from "../../select-option/NhaCungCap"
import TrangThai from "../../select-option/TrangThai"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import Sidebar from '../../layouts/Sidebar'

export default function QuanLyDongHoKhoi() {
  const [dongHoKhois, setDongHoKhois] = useState([])
  const [searchData, setSearchData] = useState({
    ma_dong_ho: '',
    ten_dong_ho: '',
    ma_loai_dong_ho: '',
    ma_nha_cung_cap: '',
    ma_co_dong_ho: '',
    tinh_trang: '',
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

  //Paginate
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dongHoKhois.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dongHoKhois.length / itemsPerPage);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/dong_ho_khoi`)
      .then(response => {
        setDongHoKhois(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  const goLapDat = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn gỡ lắp đặt đồng hồ này này?'))
      return
    const formData = new FormData()
    formData.append('ma_dong_ho', id)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lap_dat_dh_khoi_go`, formData)
      SuccessToast(response.data.message)
      fetchData()
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const dongHoKhoiElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_dong_ho}</td>
      <td>{item.ten_dong_ho}</td>
      <td>{item.ten_loai_dong_ho}</td>
      <td>{item.ten_nha_cung_cap}</td>
      <td>{item.ten_co_dong_ho}</td>
      <td>
        {item.tinh_trang == 1 ?
          <div className="badge-success">Đang lắp đặt</div> :
          <div className="badge-fail">Trống</div>}
      </td>
      <td>{format(new Date(item.ngay_nhap), 'dd-MM-yyyy')}</td>
      <td>{format(new Date(item.ngay_kiem_dinh), 'dd-MM-yyyy')}</td>
      <td>{item.so_nam_hieu_luc}</td>
      <td>{item.so_thang_bao_hanh}</td>
      <td>
        {item.tinh_trang == 0 ?
          <Link className="btn-edit" to={`/lap_dat_dh_khoi_from_dong_ho/${item.ma_dong_ho}`}>Lắp đặt</Link> :
          <button className="btn-edit" onClick={() => goLapDat(item.ma_dong_ho)}>Gỡ</button>
        }&nbsp;
        <Link className="btn-edit" to={`/dong_ho_khoi/sua/${item.ma_dong_ho}`}><MdOutlineEdit style={{ transform: 'scale(1.2)' }} /></Link>&nbsp;
        <button onClick={() => xoa(item.ma_dong_ho)} className="btn-delete"><FaRegTrashAlt style={{ transform: 'scale(1.2)' }} /></button>
      </td>
    </tr>
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

  const handleSelectChange = (option, event) => {
    const name = event.name
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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dongHoKhois.length;
    setItemOffset(newOffset);
  };

  const timKiem = async (e) => {
    const { ma_dong_ho, ten_dong_ho, ma_loai_dong_ho, ma_nha_cung_cap, ma_co_dong_ho, tinh_trang, so_nam_hieu_luc_tu, so_nam_hieu_luc_den, so_thang_bao_hanh_tu, so_thang_bao_hanh_den } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
    }
    if (ten_dong_ho != '') {
      queryString += `ten_dong_ho=${ten_dong_ho}&`
    }
    if (ma_loai_dong_ho != '') {
      queryString += `ma_loai_dong_ho=${ma_loai_dong_ho}&`
    }
    if (ma_co_dong_ho != '') {
      queryString += `ma_co_dong_ho=${ma_co_dong_ho}&`
    }
    if (ma_nha_cung_cap != '') {
      queryString += `ma_nha_cung_cap=${ma_nha_cung_cap}&`
    }
    if (tinh_trang != '') {
      queryString += `tinh_trang=${tinh_trang}&`
    }
    if (ngayNhapRange[0].startDate) {
      queryString += `ngay_nhap_tu=${format(new Date(ngayNhapRange[0].startDate), 'yyyy-MM-dd')}&ngay_nhap_den=${format(new Date(ngayNhapRange[0].endDate), 'yyyy-MM-dd')}&`
    }
    if (ngayKiemDinhRange[0].startDate) {
      queryString += `ngay_kiem_dinh_tu=${format(new Date(ngayKiemDinhRange[0].startDate), 'yyyy-MM-dd')}&ngay_kiem_dinh_den=${format(new Date(ngayKiemDinhRange[0].endDate), 'yyyy-MM-dd')}&`
    }
    if (so_nam_hieu_luc_tu != '') {
      queryString += `so_nam_hieu_luc_tu=${so_nam_hieu_luc_tu}&`
    }
    if (so_nam_hieu_luc_den != '') {
      queryString += `so_nam_hieu_luc_den=${so_nam_hieu_luc_den}&`
    }
    if (so_thang_bao_hanh_tu != '') {
      queryString += `so_thang_bao_hanh_tu=${so_thang_bao_hanh_tu}&`
    }
    if (so_thang_bao_hanh_den != '') {
      queryString += `so_thang_bao_hanh_den=${so_thang_bao_hanh_den}&`
    }
    const response = await axios.get(`http://127.0.0.1:8000/api/dong_ho_khoi_search/${queryString}`)
    setDongHoKhois(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý đồng hồ khối</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
            <input type="text" id='ma_dong_ho' name='ma_dong_ho' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ten_dong_ho">Tên đồng hồ</label>
            <input type="text" id='ten_dong_ho' name='ten_dong_ho' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Loại đồng hồ</label>
            <LoaiDongHo
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_loai_dong_ho'
            />
          </div>
          <div>
            <label htmlFor="">Nhà cung cấp</label>
            <NhaCungCap
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_nha_cung_cap'
            />
          </div>
          <div>
            <label htmlFor="">Kích cỡ</label>
            <CoDongHo
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_co_dong_ho'
            />
          </div>
          <div>
            <label htmlFor="">Tình trạng</label>
            <TrangThai
              isSearch={true}
              isDongHo={true}
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
            <Link to='/dong_ho_khoi/them' className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm đồng hồ
            </Link>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách đồng hồ khối</div>
          <table>
            <thead>
              <tr>
                <th>Mã đồng hồ</th>
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