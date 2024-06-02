import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../layouts/Sidebar'

export default function SuaQuanHuyen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenQuanHuyen, setTenQuyenHuyen] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quan_huyen/${id}`)
      .then(response => {
        setTenQuyenHuyen(response.data.ten_quan_huyen)
      })
  }, [])

  const handleChange = (e) => {
    setTenQuyenHuyen(e.target.value)
  }

  const suaQuanHuyen = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_quan_huyen', tenQuanHuyen)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/quan_huyen/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/quan_huyen')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaQuanHuyen()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa quận huyện</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_quan_huyen">Tên quận huyện</label>
            <input required onChange={handleChange} type="text" id='ten_quan_huyen' name="ten_quan_huyen" value={tenQuanHuyen} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-edit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa quận huyện
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>

  )
}