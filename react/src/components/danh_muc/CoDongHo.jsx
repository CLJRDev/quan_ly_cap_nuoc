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


export default function CoDongHo() {
  const [coDongHos, setCoDongHos] = useState(null)
  const tenCoDongHoRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/co_dong_ho`)
      .then(response => {
        setCoDongHos(response.data)
      })
  }

  if (!coDongHos) return null

  const coDongHoElements = coDongHos.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_co_dong_ho}</td>
      <td style={{ textAlign: 'left' }}>{item.ten_co_dong_ho}</td>
      <td>
        <Link className="btn-edit" to={`/co_dong_ho/sua/${item.ma_co_dong_ho}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaCoDongHo(item.ma_co_dong_ho)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoaCoDongHo = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa cỡ đồng hồ này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/co_dong_ho/${id}`)
      .then(response => {
        SuccessToast(response.data.message);
        fetchData()
      })
      .catch(error => {
        ErrorToast('Không thể xóa cỡ đồng hồ này!')
      });
  }

  const themCoDongHo = async () => {
    const formData = new FormData()
    formData.append('ten_co_dong_ho', tenCoDongHoRef.current.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/co_dong_ho`, formData)
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
    await themCoDongHo()
  }


  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Quản lý danh mục cỡ đồng hồ</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_co_dong_ho">Tên cỡ đồng hồ</label>
            <input required type="text" id='ten_co_dong_ho' ref={tenCoDongHoRef} />
          </div>
          <div></div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp;Thêm cỡ đồng hồ
            </button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách cỡ đồng hồ</div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Mã CĐH</th>
                <th style={{ textAlign: 'left' }}>Tên cỡ đồng hồ</th>
                <th style={{ width: '150px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {coDongHoElements}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}