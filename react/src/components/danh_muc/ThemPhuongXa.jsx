import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import Select from 'react-select'
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../layouts/Sidebar'

export default function ThemPhuongXa() {
  const navigate = useNavigate()

  const [quanHuyens, setQuanHuyens] = useState(null)
  const [phuongXa, setPhuongXa] = useState({
    tenPhuongXa: '',
    quanHuyenOption: {}
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quan_huyen`)
      .then(response => {
        setQuanHuyens(response.data)
      })
  }, [])

  if (!quanHuyens) return null

  const quanHuyenOptions = []
  quanHuyens.forEach(item => {
    quanHuyenOptions.push({
      value: item.ma_quan_huyen,
      label: item.ten_quan_huyen
    })
  })

  const handleInputChange = (e) => {
    setPhuongXa(pre => {
      return {
        ...pre,
        tenPhuongXa: e.target.value
      }
    })
  }

  const handleSelectChange = (option) => {
    setPhuongXa(pre => {
      return {
        ...pre,
        quanHuyenOption: option
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('ten_phuong_xa', phuongXa.tenPhuongXa)
    formData.append('ma_quan_huyen', phuongXa.quanHuyenOption.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/phuong_xa`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/phuong_xa')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Thêm phường xã</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_phuong_xa">Tên phường xã</label>
            <input required type="text" id='ten_phuong_xa' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Tên quận huyện</label>
            <Select
              required
              options={quanHuyenOptions}
              onChange={handleSelectChange}
            />
          </div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp;Thêm phường xã
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}