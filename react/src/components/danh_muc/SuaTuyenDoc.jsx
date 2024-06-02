import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";
import PhuongXa from '../select-option/PhuongXa'
import ToQuanLy from '../select-option/ToQuanLy'
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../layouts/Sidebar'

export default function SuaTuyenDoc() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tuyenDoc, setTuyenDoc] = useState([])
  const [toQuanLyOption, setToQuanLyOption] = useState({})
  const [phuongXaOption, setPhuongXaOption] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tuyen_doc/${id}`)
      .then(response => {
        setTuyenDoc(response.data.ten_tuyen)
        setToQuanLyOption({ value: response.data.ma_to_quan_ly, label: response.data.ten_to_quan_ly })
        setPhuongXaOption({ value: response.data.ma_phuong_xa, label: response.data.ten_phuong_xa })
      })
  }, [])

  const handleInputChange = (e) => {
    setTuyenDoc(e.target.value)
  }

  const handleToQuanLyChange = (selectedOption) => {
    setToQuanLyOption(selectedOption)
  }

  const handlePhuongXaChange = (selectedOption) => {
    setPhuongXaOption(selectedOption)
  }

  const suaTuyenDoc = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_tuyen', tuyenDoc)
    formData.append('ma_phuong_xa', phuongXaOption.value)
    formData.append('ma_to_quan_ly', toQuanLyOption.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tuyen_doc/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/tuyen_doc')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaTuyenDoc()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa tuyến đọc</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_tuyen">Tên tuyến đọc</label>
            <input required type="text" id="ten_tuyen" name='ten_tuyen' onChange={handleInputChange} value={tuyenDoc} />
          </div>
          <div>
            <label htmlFor="">Tổ quản lý</label>
            <ToQuanLy
              require={true}
              onChange={handleToQuanLyChange}
              value={toQuanLyOption}
            />
          </div>
          <div>
            <label htmlFor="">Phường xã</label>
            <PhuongXa
              require={true}
              onChange={handlePhuongXaChange}
              value={phuongXaOption}
            />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa tuyến đọc
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}