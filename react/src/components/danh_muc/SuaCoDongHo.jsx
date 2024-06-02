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

export default function SuaCoDongHo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenCoDongHo, setTenCoDongHo] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/co_dong_ho/${id}`)
      .then(response => {
        setTenCoDongHo(response.data.ten_co_dong_ho)
      })
  }, [])

  const handleChange = (e) => {
    setTenCoDongHo(e.target.value)
  }

  const suaCoDongHo = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_co_dong_ho', tenCoDongHo)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/co_dong_ho/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/co_dong_ho')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaCoDongHo()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa cỡ đồng hồ</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_co_dong_ho">Tên cỡ đồng hồ</label>
            <input required type="text" id='ten_co_dong_ho' value={tenCoDongHo} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <button className="btn-edit" type="submit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa cỡ đồng hồ
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}