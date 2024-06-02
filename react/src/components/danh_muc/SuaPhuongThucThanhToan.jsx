import axios from "axios"
import { useState, useEffect } from "react"
import { MdOutlineEdit } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom"
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../layouts/Sidebar'

export default function SuaPhuongThucThanhToan() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenPhuongThuc, setTenPhuongThuc] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/pt_thanh_toan/${id}`)
      .then(response => {
        setTenPhuongThuc(response.data.ten_phuong_thuc)
      })
  }, [])

  const handleChange = (e) => {
    setTenPhuongThuc(e.target.value)
  }

  const sua = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_phuong_thuc', tenPhuongThuc)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/pt_thanh_toan/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/phuong_thuc_thanh_toan')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sua()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa phương thức thanh toán</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_phuong_thuc">Tên phương thức</label>
            <input required type="text" id='ten_phuong_thuc' value={tenPhuongThuc} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <button className="btn-add" type="submit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa phương thức
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}