import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"
import Select from 'react-select'
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ToQuanLy() {
  const [toQuanLys, setToQuanLys] = useState(null)
  const [chiNhanhs, setChiNhanhs] = useState(null)
  const [chiNhanhOption, setChiNhanhOption] = useState([])
  const tenToQuanLyRef = useRef()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/chi_nhanh`)
      .then(response => {
        setChiNhanhs(response.data)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/to_quan_ly`)
      .then(response => {
        setToQuanLys(response.data)
      })
  }

  if (!toQuanLys) return null
  if (!chiNhanhs) return null

  const options = []
  chiNhanhs.forEach(item => {
    options.push({
      value: item.ma_chi_nhanh,
      label: item.ten_chi_nhanh
    })
  })

  const toQuanLyElements = toQuanLys.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_to_quan_ly}</td>
      <td>{item.ten_to_quan_ly}</td>
      <td>{item.ten_chi_nhanh}</td>
      <td>
        <Link className="btn-edit" to={`/to_quan_ly/sua/${item.ma_to_quan_ly}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaToQuanLy(item.ma_to_quan_ly)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoaToQuanLy = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tổ quản lý này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/to_quan_ly/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa tổ quản lý này!')
      });
  }

  const handleChange = (selectedOption) => {
    setChiNhanhOption(selectedOption)
  }

  const themToQuanLy = async () => {
    const formData = new FormData()
    formData.append('ten_to_quan_ly', tenToQuanLyRef.current.value)
    formData.append('ma_chi_nhanh', chiNhanhOption.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/to_quan_ly`, formData)
      SuccessToast(response.data.message)
      fetchData()
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themToQuanLy()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý danh tổ quản lý</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_to_quan_ly">Tên tổ quản lý</label>
          <input required type="text" ref={tenToQuanLyRef} id="ten_to_quan_ly" />
        </div>
        <div>
          <label htmlFor="chi_nhanh">Chi nhánh</label>
          <Select
            required
            onChange={handleChange}
            options={options}
            value={chiNhanhOption}
          />
        </div>
        <div>
          <button type="submit" className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm tổ quản lý
          </button>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách tổ quản lý</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Mã tổ quản lý</th>
              <th>Tên tổ quản lý</th>
              <th>Tên chi nhánh</th>
              <th style={{ width: '150px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {toQuanLyElements}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}