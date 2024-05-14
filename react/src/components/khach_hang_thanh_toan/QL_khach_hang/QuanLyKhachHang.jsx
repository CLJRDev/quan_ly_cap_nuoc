import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'

export default function QuanLyKhachHang() {
  const [khachHangs, setKhachHangs] = useState(null)
  const [searchData, setSearchData] = useState({
    ten_khach_hang: '',
    dia_chi: '',
    sdt: '',
    email: ''
  })

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/khach_hang`)
      .then(response => {
        setKhachHangs(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/khach_hang/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchData()
      })
      .catch(error => {
        console.log(error.response.data.error)
      });
  }

  if (!khachHangs) return null

  const khachHangElements = khachHangs.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_khach_hang}</td>
      <td>{item.ten_khach_hang}</td>
      <td>{item.dia_chi}</td>
      <td>0{item.sdt}</td>
      <td>{item.email}</td>
      <td>
        <Link className="btn-edit" to={`/hop_dong/khach_hang/${item.ma_khach_hang}`}>Hợp đồng</Link>
        &nbsp;
        <Link className="btn-edit" to={`/khach_hang/sua/${item.ma_khach_hang}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoa(item.ma_khach_hang)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setSearchData(preData => {
      return {
        ...preData,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ten_khach_hang, dia_chi, sdt, email } = searchData;
    let queryString = '?'
    if (ten_khach_hang != '') {
      queryString += `ten_khach_hang=${ten_khach_hang}`
    }
    if (dia_chi != '') {
      queryString += `&dia_chi=${dia_chi}`
    }
    if (sdt != '') {
      queryString += `&sdt=${sdt}`
    }
    if (email != '') {
      queryString += `&email=${email}`
    }
    const response = await axios.get(`http://127.0.0.1:8000/api/khach_hang_search/${queryString}`)
    setKhachHangs(response.data)
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý khách hàng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_khach_hang">Tên khách hàng</label>
          <input type="text" id='ten_khach_hang' name='ten_khach_hang' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="dia_chi">Địa chỉ</label>
          <input type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="sdt">Số điện thoại</label>
          <input type="number" id='sdt' name='sdt' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id='email' name='email' onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm
          </button>
          &nbsp;
          <Link to='/khach_hang/them' className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm khách hàng
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách khách hàng</div>
        <table>
          <thead>
            <tr>
              <th>Mã KH</th>
              <th>Tên khách hàng</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {khachHangElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}