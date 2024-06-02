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
import Sidebar from '../layouts/Sidebar'

export default function LoaiKhachHang() {
  const [loaiKhachHangs, setLoaiKhachHangs] = useState(null)
  const tenLoaiKhachHangRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/loai_khach_hang`)
      .then(response => {
        setLoaiKhachHangs(response.data)
      })
  }

  if (!loaiKhachHangs) return null

  const loaiKhachHangElements = loaiKhachHangs.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_loai_khach_hang}</td>
      <td style={{ textAlign: 'left' }}>{item.ten_loai_khach_hang}</td>
      <td>
        <Link className="btn-edit" to={`/loai_khach_hang/sua/${item.ma_loai_khach_hang}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaLoaiKhachHang(item.ma_loai_khach_hang)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoaLoaiKhachHang = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa loại khách hàng này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/loai_khach_hang/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa loại khách hàng này!')
      });
  }

  const themLoaiKhachHang = async () => {
    const formData = new FormData()
    formData.append('ten_loai_khach_hang', tenLoaiKhachHangRef.current.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/loai_khach_hang`, formData)
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
    await themLoaiKhachHang()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý danh mục loại khách hàng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_loai_khach_hang">Tên loại khách hàng</label>
            <input required type="text" id='ten_loai_khach_hang' ref={tenLoaiKhachHangRef} />
          </div>
          <div></div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp;Thêm loại khách hàng
            </button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách loại khách hàng</div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Mã loại KH</th>
                <th style={{ textAlign: 'left' }}>Tên loại khách hàng</th>
                <th style={{ width: '150px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loaiKhachHangElements}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}