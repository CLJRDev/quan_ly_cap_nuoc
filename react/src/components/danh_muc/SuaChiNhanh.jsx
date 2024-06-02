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


export default function SuaChiNhanh() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [chiNhanh, setChiNhanh] = useState({
    ma_chi_nhanh: '',
    ten_chi_nhanh: '',
    dia_chi: ''
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/chi_nhanh/${id}`)
      .then(response => {
        setChiNhanh(response.data)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setChiNhanh(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const suaChiNhanh = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_chi_nhanh', chiNhanh.ten_chi_nhanh)
    formData.append('dia_chi', chiNhanh.dia_chi)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/chi_nhanh/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/chi_nhanh')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaChiNhanh()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa chi nhánh</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_chi_nhanh">Tên chi nhánh</label>
            <input required type="text" name="ten_chi_nhanh" id="ten_chi_nhanh" onChange={handleChange} value={chiNhanh.ten_chi_nhanh} />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input required type="text" name="dia_chi" id="dia_chi" onChange={handleChange} value={chiNhanh.dia_chi} />
          </div>
          <div>
            <button type="submit" className="btn-edit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa chi nhánh
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}