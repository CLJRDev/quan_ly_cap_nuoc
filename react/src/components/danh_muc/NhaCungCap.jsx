import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../layouts/Sidebar'


export default function NhaCungCap() {
  const [nhaCungCaps, setNhaCungCaps] = useState([])
  const tenNhaCungCapRef = useRef()
  const diaChiRef = useRef()
  const sdtRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/nha_cung_cap`)
      .then(response => {
        setNhaCungCaps(response.data)
      })
  }

  const nhaCungCapElements = nhaCungCaps.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_nha_cung_cap}</td>
      <td style={{ textAlign: 'left' }}>{item.ten_nha_cung_cap}</td>
      <td style={{ textAlign: 'left' }}>{item.dia_chi}</td>
      <td style={{ textAlign: 'left' }}>{item.sdt}</td>
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
    formData.append('dia_chi', diaChiRef.current.value)
    formData.append('sdt', sdtRef.current.value)

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
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý danh mục nhà cung cấp đồng hồ</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_nha_cung_cap">Tên nhà cung cấp</label>
            <input required type="text" id='ten_nha_cung_cap' ref={tenNhaCungCapRef} />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input required type="text" id='dia_chi' ref={diaChiRef} />
          </div>
          <div>
            <label htmlFor="sdt">Số điện thoại</label>
            <input required type="number" id='sdt' ref={sdtRef} />
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
                <th style={{ width: '150px', maxWidth: '150px' }}>Mã NCC</th>
                <th style={{ textAlign: 'left', width: '300px', maxWidth: '300px' }}>Tên nhà cung cấp</th>
                <th style={{ textAlign: 'left' }}>Địa chỉ</th>
                <th style={{ textAlign: 'left', width: '250px', maxWidth: '250px' }}>Số điện thoại</th>
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
    </>
  )
}