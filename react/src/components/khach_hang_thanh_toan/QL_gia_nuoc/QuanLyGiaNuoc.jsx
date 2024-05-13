import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'


export default function QuanLyGiaNuoc() {
  const [loaiKhachHangs, setLoaiKhachHangs] = useState(null)
  const [gias, setGias] = useState(null)
  const [searchData, setSearchData] = useState({
    ten_nhom_gia: '',
    ma_loai_khach_hang: ''
  })

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/nhom_gia`)
      .then(response => {
        setGias(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_khach_hang`)
      .then(response => {
        setLoaiKhachHangs(response.data)
      })
  }, [])

  if (!loaiKhachHangs) return null

  const options = [{ value: '', label: 'Tất cả' }]

  loaiKhachHangs.forEach(item => {
    options.push({
      value: item.ma_loai_khach_hang,
      label: item.ten_loai_khach_hang
    })
  })

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nhóm giá này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/nhom_gia/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchData()
      })
      .catch(error => {
        console.log(error.response.data.error)
      });
  }

  if (!gias) return null
  const giaElements = gias.map((item, index) => {
    return <tr key={index}>
      <td>{item.ten_nhom_gia}</td>
      <td>{item.ten_loai_khach_hang}</td>
      <td>{!item.hs_duoi_10m ? '0' : item.hs_duoi_10m}</td>
      <td>{!item.hs_tu_10m_den_20m ? '0' : item.hs_tu_10m_den_20m}</td>
      <td>{!item.hs_tu_20m_den_30m ? '0' : item.hs_tu_20m_den_30m}</td>
      <td>{!item.hs_tren_30m ? '0' : item.hs_tren_30m}</td>
      <td>{!item.hs_rieng ? '0' : item.hs_rieng}</td>
      <td>{item.gia_ban}</td>
      <td>
        <Link className="btn-edit" to={`/gia_nuoc/sua/${item.ma_nhom_gia}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoa(item.ma_nhom_gia)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })


  const handleInputChange = (e) => {
    setSearchData(preData => {
      return {
        ...preData,
        ten_nhom_gia: e.target.value
      }
    })
  }

  const handleSelectChange = (option) => {
    setSearchData(preData => {
      return {
        ...preData,
        ma_loai_khach_hang: option.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ten_nhom_gia, ma_loai_khach_hang } = searchData;
    let queryString = '?'
    if (ten_nhom_gia != '') {
      queryString += `ten_nhom_gia=${ten_nhom_gia}&`
    }
    if (ma_loai_khach_hang != '') {
      queryString += `ma_loai_khach_hang=${ma_loai_khach_hang}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/nhom_gia_search/${queryString}`)
    setGias(response.data)
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý giá nước</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_nhom_gia">Tên nhóm giá</label>
          <input type="text" id='ten_nhom_gia' name='ten_nhom_gia' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="loai_khach_hang">Loại khách hàng</label>
          <Select
            options={options}
            onChange={handleSelectChange}
          />
        </div>
        <div>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm
          </button>
          &nbsp;
          <Link to='/gia_nuoc/them' className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm nhóm giá
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách nhóm giá</div>
        <table>
          <thead>
            <tr>
              <th>Tên nhóm giá</th>
              <th>Loại khách hàng</th>
              <th>HS dưới 10m³</th>
              <th>HS 10m³ đến 20m³</th>
              <th>HS 20m³ đến 30m³</th>
              <th>HS trên 30m³</th>
              <th>HS riêng</th>
              <th>Giá bán</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {giaElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}