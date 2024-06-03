import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import NhomGia from "../../select-option/NhomGia"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import Sidebar from '../../layouts/Sidebar'

export default function QuanLyHopDong() {
  const { ma_khach_hang } = useParams()
  const [hopDongs, setHopDongs] = useState([])
  const [searchData, setSearchData] = useState({
    ma_hop_dong: '',
    ten_nguoi_dai_dien: '',
    chuc_vu_nguoi_dai_dien: '',
    dia_chi: '',
    ngay_lap: '',
    ma_khach_hang: '',
    ten_khach_hang: '',
    ma_dong_ho: '',
    ma_nhom_gia: '',
  })
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = hopDongs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(hopDongs.length / itemsPerPage);

  const fetchData = () => {
    if (!ma_khach_hang) {
      axios.get(`http://127.0.0.1:8000/api/hop_dong`)
        .then(response => {
          setHopDongs(response.data)
        })
    } else {
      axios.get(`http://127.0.0.1:8000/api/hop_dong_search?ma_khach_hang=${ma_khach_hang}`)
        .then(response => {
          setHopDongs(response.data)
        })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/hop_dong/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa hợp đồng này!')
      });
  }

  const goLapDat = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn gỡ lắp đặt hợp đồng này?'))
      return
    const formData = new FormData()
    formData.append('ma_hop_dong', id)

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

  const hopDongElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_hop_dong}</td>
      <td>{item.ten_khach_hang}</td>
      <td>{item.ngay_lap}</td>
      <td>{item.ten_nguoi_dai_dien}</td>
      <td>{item.ten_tuyen}</td>
      <td>{item.dia_chi_hop_dong}</td>
      <td>{item.ten_nhom_gia}</td>
      <td>
        {item.trang_thai == 1 ?
          <div className="badge-success">Đang lắp đặt</div> :
          <div className="badge-fail">Trống</div>}
      </td>
      <td>
        {item.trang_thai == 1 ?
          <button onClick={() => goLapDat(item.ma_hop_dong)} className="btn-edit">Gỡ ĐH</button> :
          <Link className="btn-edit" to={`/lap_dat_dh_khach_from_hop_dong/${item.ma_hop_dong}`}>Lắp đặt</Link>
        }&nbsp;
        {item.trang_thai == 1 && <Link className="btn-edit" to={`/xem_dong_ho_khach_from_hop_dong/${item.ma_hop_dong}`}>Đồng hồ</Link>}&nbsp;
        <Link className="btn-edit" to={`/hop_dong/sua/${item.ma_hop_dong}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoa(item.ma_hop_dong)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchData(preData => {
      return {
        ...preData,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option) => {
    setSearchData(preData => {
      return {
        ...preData,
        ma_nhom_gia: option.value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hopDongs.length;
    setItemOffset(newOffset);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ma_hop_dong, ten_nguoi_dai_dien, ma_khach_hang, ten_khach_hang, ma_dong_ho, ma_nhom_gia, dia_chi, ngay_lap } = searchData;
    let queryString = '?'
    if (ma_hop_dong != '') {
      queryString += `ma_hop_dong=${ma_hop_dong}&`
    }
    if (ten_nguoi_dai_dien != '') {
      queryString += `ten_nguoi_dai_dien=${ten_nguoi_dai_dien}&`
    }
    if (ma_khach_hang != '') {
      queryString += `ma_khach_hang=${ma_khach_hang}&`
    }
    if (ten_khach_hang != '') {
      queryString += `ten_khach_hang=${ten_khach_hang}&`
    }
    if (ma_dong_ho != '') {
      queryString += `ma_dong_ho=${ma_dong_ho}&`
    }
    if (ma_nhom_gia != '') {
      queryString += `ma_nhom_gia=${ma_nhom_gia}&`
    }
    if (dia_chi != '') {
      queryString += `dia_chi=${dia_chi}&`
    }
    if (ngay_lap != '') {
      queryString += `ngay_lap=${ngay_lap}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/hop_dong_search/${queryString}`)
    setHopDongs(response.data)
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý hợp đồng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ma_hop_dong">Mã hợp đồng</label>
            <input type="number" id='ma_hop_dong' name='ma_hop_dong' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ten_nguoi_dai_dien">Tên người đại diện</label>
            <input type="text" id='ten_nguoi_dai_dien' name='ten_nguoi_dai_dien' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ma_khach_hang">Mã khách hàng</label>
            <input type="number" id='ma_khach_hang' name='ma_khach_hang' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ten_khach_hang">Tên khách hàng</label>
            <input type="text" id='ten_khach_hang' name='ten_khach_hang' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
            <input type="number" id='ma_dong_ho' name='ma_dong_ho' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Nhóm giá</label>
            <NhomGia
              onChange={handleSelectChange}
              isSearch={true}
              name='ma_nhom_gia'
            />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ngay_lap">Ngày lập</label>
            <input type="date" id='ngay_lap' name='ngay_lap' onChange={handleInputChange} />
          </div>
          <div>
            <button type="submit" className="btn-search">
              <IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm
            </button>
            &nbsp;
            <Link to='/hop_dong/them' className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm hợp đồng
            </Link>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách hợp đồng</div>
          <table>
            <thead>
              <tr>
                <th>Mã HĐ</th>
                <th>Tên khách hàng</th>
                <th>Ngày lập</th>
                <th>Người đại diện</th>
                <th>Tuyến đọc</th>
                <th>Địa chỉ</th>
                <th>Nhóm giá</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {hopDongElements}
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