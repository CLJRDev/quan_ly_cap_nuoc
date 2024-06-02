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


export default function PhuongThucThanhToan() {
  const [phuongThucs, setPhuongThucs] = useState(null)
  const tenPhuongThucRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/pt_thanh_toan`)
      .then(response => {
        setPhuongThucs(response.data)
      })
  }

  if (!phuongThucs) return null

  const phuongThucElements = phuongThucs.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_phuong_thuc}</td>
      <td style={{ textAlign: 'left' }}>{item.ten_phuong_thuc}</td>
      <td>
        <Link className="btn-edit" to={`/phuong_thuc_thanh_toan/sua/${item.ma_phuong_thuc}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoa(item.ma_phuong_thuc)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoa = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phương thức thanh toán này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/pt_thanh_toan/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa phương thức thanh toán này!')
      });
  }

  const them = async () => {
    const formData = new FormData()
    formData.append('ten_phuong_thuc', tenPhuongThucRef.current.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/pt_thanh_toan`, formData)
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
    await them()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý danh mục phương thức thanh toán</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_phuong_thuc">Tên phương thức</label>
            <input required type="text" id='ten_phuong_thuc' ref={tenPhuongThucRef} />
          </div>
          <div></div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp;Thêm phương thức
            </button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách phương thức thanh toán</div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Mã PTTT</th>
                <th style={{ textAlign: 'left' }}>Tên phương thức</th>
                <th style={{ width: '150px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {phuongThucElements}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}