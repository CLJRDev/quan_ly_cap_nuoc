import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { format } from 'date-fns'
import LoaiDongHo from "../../select-option/LoaiDongHo"
import CoDongHo from "../../select-option/CoDongHo"
import NhaCungCap from "../../select-option/NhaCungCap"
import TrangThai from "../../select-option/TrangThai"
import DateRangeComp from "../../react-components/DateRangeComp"
import SliderCom from "../../react-components/SliderCom"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import Sidebar from '../../layouts/Sidebar'

export default function QuanLyDongHoKhach() {
  const [dongHoKhachs, setDongHoKhachs] = useState([])
  const [searchData, setSearchData] = useState({
    ma_dong_ho: '',
    ten_dong_ho: '',
    nam_san_xuat: '',
    so_seri: '',
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
  const currentItems = dongHoKhachs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dongHoKhachs.length / itemsPerPage);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/dong_ho_khach`)
      .then(response => {
        setDongHoKhachs(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đồng hồ này này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/dong_ho_khach/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        const errorsArray = Object.values(error.response.data.error).flat();
        errorsArray.forEach(item => {
          WarningToast(item)
        })
      });
  }

  const goLapDat = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn gỡ lắp đặt đồng hồ này?'))
      return
    const formData = new FormData()
    formData.append('ma_dong_ho', id)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lap_dat_dh_khach_go`, formData)
      SuccessToast(response.data.message)
      fetchData()
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const dongHoKhachElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_dong_ho}</td>
      <td>{item.ten_dong_ho}</td>
      <td>{item.nam_san_xuat}</td>
      <td>{item.so_seri}</td>
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
        {item.tinh_trang == 1 ?
          <button onClick={() => goLapDat(item.ma_dong_ho)} className="btn-edit">Gỡ</button> :
          <Link className="btn-edit" to={`/lap_dat_dh_khach_from_dong_ho/${item.ma_dong_ho}`}>Lắp đặt</Link>
        }&nbsp;
        {item.tinh_trang == 1 && <Link className="btn-edit" to={`/xem_hop_dong_from_dong_ho_khach/${item.ma_dong_ho}`}>Hợp đồng</Link>}&nbsp;
        <Link className="btn-edit" to={`/dong_ho_khach/sua/${item.ma_dong_ho}`}>Sửa</Link>&nbsp;
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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dongHoKhachs.length;
    setItemOffset(newOffset);
  };

  const timKiem = async (e) => {
    const { ma_dong_ho, ten_dong_ho, so_seri, ma_loai_dong_ho, ma_nha_cung_cap, ma_co_dong_ho, tinh_trang, so_nam_hieu_luc_tu, so_nam_hieu_luc_den, so_thang_bao_hanh_tu, so_thang_bao_hanh_den } = searchData;
    let queryString = '?'
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
    }
    if (ten_dong_ho != '') {
      queryString += `ten_dong_ho=${ten_dong_ho}&`
    }
    if (so_seri != '') {
      queryString += `so_seri=${so_seri}&`
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
    const response = await axios.get(`http://127.0.0.1:8000/api/dong_ho_khach_search/${queryString}`)
    setDongHoKhachs(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý đồng hồ khách hàng</h2>
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
          <div></div>
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
                <th>Mã đồng hồ</th>
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