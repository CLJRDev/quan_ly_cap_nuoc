import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrangThai from '../../select-option/TrangThai'
import Sidebar from '../../layouts/Sidebar'

export default function SuaQuyen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [quyen, setQuyen] = useState({
    ten_quyen: ''
  })
  const [selectedOptions, setSelectedOptions] = useState({ trang_thai: {} })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quyen/${id}`)
      .then(response => {
        setQuyen(response.data)
        setSelectedOptions({ trang_thai: { value: response.data.trang_thai, label: response.data.trang_thai === 1 ? 'Kích hoạt' : 'Khóa' } })
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setQuyen(preQuyen => {
      return {
        ...preQuyen,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option, e) => {
    setSelectedOptions({ trang_thai: { value: option.value, label: option.label } })
  }

  const suaQuyen = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_quyen', quyen.ten_quyen)
    formData.append('trang_thai', selectedOptions.trang_thai.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/quyen/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/quyen')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaQuyen()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa quyền</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_quyen">Tên quyền</label>
            <input type="text" id='ten_quyen' name='ten_quyen' value={quyen.ten_quyen} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="trang_thai">Trạng thái</label>
            <TrangThai
              name='trang_thai'
              onChange={handleSelectChange}
              value={selectedOptions.trang_thai}
            />
          </div>
          <div>
            <button type="submit" className="btn-edit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa quyền
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}