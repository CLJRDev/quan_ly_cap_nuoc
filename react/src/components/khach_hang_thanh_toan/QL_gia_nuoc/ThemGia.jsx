import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function ThemGia() {
  const navigate = useNavigate()
  const [loaiKhachHangs, setLoaiKhachHangs] = useState(null)
  const [gia, setGia] = useState({
    ten_nhom_gia: '',
    hs_duoi_10m: '',
    hs_tu_10m_den_20m: '',
    hs_tu_20m_den_30m: '',
    hs_tren_30m: '',
    hs_rieng: '',
    hs_thue: '',
    gia_ban: '',
    loai_khach_hang: {}
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_khach_hang`)
      .then(response => {
        setLoaiKhachHangs(response.data)
      })
  }, [])

  if (!loaiKhachHangs) return null
  const options = []
  loaiKhachHangs.forEach(item => {
    options.push({
      value: item.ma_loai_khach_hang,
      label: item.ten_loai_khach_hang
    })
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setGia(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option) => {
    setGia(pre => {
      return {
        ...pre,
        loai_khach_hang: option
      }
    })
  }

  const them = async () => {
    const formData = new FormData()
    formData.append('ten_nhom_gia', gia.ten_nhom_gia)
    if (gia.hs_rieng === '') {
      formData.append('hs_duoi_10m', gia.hs_duoi_10m)
      formData.append('hs_tu_10m_den_20m', gia.hs_tu_10m_den_20m)
      formData.append('hs_tu_20m_den_30m', gia.hs_tu_20m_den_30m)
      formData.append('hs_tren_30m', gia.hs_tren_30m)
    } else {
      formData.append('hs_rieng', gia.hs_rieng)
    }
    formData.append('hs_thue', gia.hs_thue)
    formData.append('gia_ban', gia.gia_ban)
    formData.append('ma_loai_khach_hang', gia.loai_khach_hang.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/nhom_gia`, formData)
      console.log(response.data.message)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/gia_nuoc')
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
        <h2 className="title">Thêm giá nước</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_nhom_gia">Tên nhóm giá</label>
            <input type="text" id='ten_nhom_gia' name='ten_nhom_gia' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="loai_khach_hang">Loại khách hàng</label>
            <Select
              options={options}
              onChange={handleSelectChange}
            />
          </div>
          <div>
            <label htmlFor="hs_duoi_10m">Hệ số dưới 10m³</label>
            <input type="number" id='hs_duoi_10m' step='0.01' name='hs_duoi_10m' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="hs_tu_10m_den_20m">Hệ số từ 10m³ đến 20m³</label>
            <input type="number" id='hs_tu_10m_den_20m' step='0.01' name='hs_tu_10m_den_20m' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="hs_tu_20m_den_30m">Hệ số từ 20m³ đến 30m³</label>
            <input type="number" id='hs_tu_20m_den_30m' step='0.01' name='hs_tu_20m_den_30m' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="hs_tren_30m">Hệ số trên 30m³</label>
            <input type="number" id='hs_tren_30m' step='0.01' name='hs_tren_30m' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="hs_rieng">Hệ số riêng</label>
            <input type="number" id='hs_rieng' step='0.01' name='hs_rieng' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="hs_thue">Hệ số thuế</label>
            <input type="number" id='hs_thue' step='0.01' name='hs_thue' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="gia_ban">Giá bán</label>
            <input type="number" id='gia_ban' step='0.01' name='gia_ban' onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm nhóm giá
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}