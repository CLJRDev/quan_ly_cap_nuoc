import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { IoMdSearch } from "react-icons/io"
import { Link } from "react-router-dom"
import Select from 'react-select'
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PhuongXa() {
  const [phuongXas, setPhuongXas] = useState(null)
  const [quanHuyens, setQuanHuyens] = useState(null)
  const [searchData, setSearchData] = useState({
    tenPhuongXa: '',
    quanHuyenOption: {
      value: '',
      label: ''
    }
  })

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/phuong_xa`)
      .then(response => {
        setPhuongXas(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quan_huyen`)
      .then(response => {
        setQuanHuyens(response.data)
      })
  }, [])

  if (!phuongXas) return null
  if (!quanHuyens) return null

  const phuongXaElements = phuongXas.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_phuong_xa}</td>
      <td>{item.ten_phuong_xa}</td>
      <td>{item.ten_quan_huyen}</td>
      <td>
        <Link className="btn-edit" to={`/phuong_xa/sua/${item.ma_phuong_xa}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaPhuongXa(item.ma_phuong_xa)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const quanHuyenOptions = []

  quanHuyens.forEach(item => {
    quanHuyenOptions.push({
      value: item.ma_quan_huyen,
      label: item.ten_quan_huyen
    })
  })

  const handleSelectChange = (option) => {
    setSearchData(pre => {
      return {
        ...pre,
        quanHuyenOption: option
      }
    })
  }

  const handleInputChange = (e) => {
    setSearchData(pre => {
      return {
        ...pre,
        tenPhuongXa: e.target.value
      }
    })
  }

  const xoaPhuongXa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phường xã này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/phuong_xa/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa phường xã này!')
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { tenPhuongXa, quanHuyenOption } = searchData;
    let queryString = '?'
    if (tenPhuongXa != '') {
      queryString += `ten_phuong_xa=${tenPhuongXa}`
    }
    if (quanHuyenOption.value != '') {
      queryString += `&ma_quan_huyen=${quanHuyenOption.value}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/phuong_xa_search/${queryString}`)
    setPhuongXas(response.data)
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý danh mục phường xã</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_phuong_xa">Tên phường xã</label>
          <input required type="text" id='ten_phuong_xa' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="">Tên quận huyện</label>
          <Select
            required
            options={quanHuyenOptions}
            onChange={handleSelectChange}
          />
        </div>
        <div>
          <button className="btn-add" type="submit">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp;Tìm kiếm
          </button>
          &nbsp;
          <Link className="btn-add" to='/phuong_xa/them'>
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm phường xã
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách phường xã</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Mã phường xã</th>
              <th>Tên phường xã</th>
              <th>Tên quận huyện</th>
              <th style={{ width: '150px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {phuongXaElements}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}