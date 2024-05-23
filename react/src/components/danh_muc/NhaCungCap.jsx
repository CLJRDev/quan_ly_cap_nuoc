import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function NhaCungCap() {
  const [nhaCungCaps, setNhaCungCaps] = useState(null)
  const tenNhaCungCapRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/nha_cung_cap`)
      .then(response => {
        setNhaCungCaps(response.data)
      })
  }

  if (!nhaCungCaps) return null

  const nhaCungCapElements = nhaCungCaps.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_nha_cung_cap}</td>
      <td style={{ textAlign: 'left' }}>{item.ten_nha_cung_cap}</td>
      <td>
        <Link className="btn-edit" to={`/nha_cung_cap/sua/${item.ma_nha_cung_cap}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaNhaCungCap(item.ma_nha_cung_cap)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoaNhaCungCap = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/nha_cung_cap/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa nhà cung cấp này!')
      });
  }

  const themNhaCungCap = async () => {
    const formData = new FormData()
    formData.append('ten_nha_cung_cap', tenNhaCungCapRef.current.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/nha_cung_cap`, formData)
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
    await themNhaCungCap()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý danh mục nhà cung cấp đồng hồ</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_nha_cung_cap">Tên nhà cung cấp</label>
          <input required type="text" id='ten_nha_cung_cap' ref={tenNhaCungCapRef} />
        </div>
        <div></div>
        <div>
          <button className="btn-add" type="submit">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm nhà cung cấp
          </button>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách nhà cung cấp đồng hồ</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Mã NCC</th>
              <th style={{ textAlign: 'left' }}>Tên nhà cung cấp</th>
              <th style={{ width: '150px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {nhaCungCapElements}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}