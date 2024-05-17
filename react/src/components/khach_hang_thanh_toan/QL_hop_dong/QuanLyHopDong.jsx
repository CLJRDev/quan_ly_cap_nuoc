import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import NhomGia from "../../select-option/NhomGia"

export default function QuanLyHopDong() {
  const [hopDongs, setHopDongs] = useState(null)
  const [searchData, setSearchData] = useState({
    ma_hop_dong: '',
    ten_nguoi_dai_dien: '',
    ma_khach_hang: '',
    ten_khach_hang: '',
    ma_dong_ho: '',
    ma_nhom_gia: '',
    dia_chi: '',
    ngay_lap: ''
  })

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/hop_dong`)
      .then(response => {
        setHopDongs(response.data)
      })
  }

  useEffect(() => {
    //fetchData()
  }, [])

  // const xoa = id => {
  //   if (!window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?'))
  //     return
  //   axios.delete(`http://127.0.0.1:8000/api/hop_dong/${id}`)
  //     .then(response => {
  //       console.log(response.data.message);
  //       fetchData()
  //     })
  //     .catch(error => {
  //       console.log(error.response.data.error)
  //     });
  // }

  // if (!hopDongs) return null
  // const hopDongElements = hopDongs.map((item, index) => {
  //   return <tr key={index}>
  //     <td>{item.ma_hop_dong}</td>
  //     <td>{item.ten_khach_hang}</td>
  //     <td>{item.ngay_lap}</td>
  //     <td>{item.ten_nguoi_dai_dien}</td>
  //     <td>{item.ma_dong_ho}</td>
  //     <td>{item.dia_chi}</td>
  //     <td>{item.nhom_gia}</td>
  //     <td>
  //       <Link className="btn-edit" to={`/hop_dong/sua/${item.ma_hop_dong}`}>Sửa</Link>
  //       &nbsp;
  //       <button onClick={() => xoa(item.ma_hop_dong)} className="btn-delete">Xóa</button>
  //     </td>
  //   </tr>
  // })


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

  console.log(searchData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ma_hop_dong, ten_nguoi_dai_dien, ma_khach_hang, ten_khach_hang, ma_dong_ho, ma_nhom_gia, dia_chi, ngay_lap } = searchData;
    let queryString = '?'
    if (ma_hop_dong != '') {
      queryString += `&ma_hop_dong=${ma_hop_dong}`
    }
    if (ten_nguoi_dai_dien != '') {
      queryString += `&ten_nguoi_dai_dien=${ten_nguoi_dai_dien}`
    }
    if (ma_khach_hang != '') {
      queryString += `&ma_khach_hang=${ma_khach_hang}`
    }
    if (ten_khach_hang != '') {
      queryString += `&ten_khach_hang=${ten_khach_hang}`
    }
    if (ma_dong_ho != '') {
      queryString += `&ma_dong_ho=${ma_dong_ho}`
    }
    if (ma_nhom_gia != '') {
      queryString += `&ma_nhom_gia=${ma_nhom_gia}`
    }
    if (dia_chi != '') {
      queryString += `&dia_chi=${dia_chi}`
    }
    if (ngay_lap != '') {
      queryString += `&ngay_lap=${ngay_lap}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/hop_dong_search/${queryString}`)
    setHopDongs(response.data)
  }

  return (
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
              <th>Mã hợp đồng</th>
              <th>Tên khách hàng</th>
              <th>Ngày lập</th>
              <th>Người đại diện</th>
              <th>Mã đồng hồ</th>
              <th>Địa chỉ</th>
              <th>Nhóm giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            { }
          </tbody>
        </table>
      </div>
    </div>
  )
}