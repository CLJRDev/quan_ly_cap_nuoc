import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";
import Select from 'react-select'
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuaToQuanLy() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [chiNhanhs, setChiNhanhs] = useState(null)
  const [tenToQuanLy, setTenToQuanLy] = useState('')
  const [selectedChiNhanh, setSelectedChiNhanh] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/chi_nhanh`)
      .then(response => {
        setChiNhanhs(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/to_quan_ly/${id}`)
      .then(response => {
        setTenToQuanLy(response.data.ten_to_quan_ly)
        setSelectedChiNhanh({ value: response.data.ma_chi_nhanh, label: response.data.ten_chi_nhanh })
      })
  }, [])

  if (!chiNhanhs) return null

  const options = []
  chiNhanhs.forEach(item => {
    options.push({
      value: item.ma_chi_nhanh,
      label: item.ten_chi_nhanh
    })
  })

  const handleChange = (selectedOption) => {
    setSelectedChiNhanh(selectedOption)
  }

  const toQuanLyChange = (e) => {
    setTenToQuanLy(e.target.value)
  }

  const suaToQuanLy = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_to_quan_ly', tenToQuanLy)
    formData.append('ma_chi_nhanh', selectedChiNhanh.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/to_quan_ly/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/to_quan_ly')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaToQuanLy()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa tổ quản lý</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_to_quan_ly">Tên tổ quản lý</label>
          <input type="text" id="ten_to_quan_ly" required name="ten_to_quan_ly" value={tenToQuanLy} onChange={toQuanLyChange} />
        </div>
        <div>
          <label htmlFor="chi_nhanh">Chi nhánh</label>
          <Select
            required
            onChange={handleChange}
            options={options}
            value={selectedChiNhanh}
          />
        </div>
        <div>
          <button type="submit" className="btn-add">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp;Sửa tổ quản lý
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}