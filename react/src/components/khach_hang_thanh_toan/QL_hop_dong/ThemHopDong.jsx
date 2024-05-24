import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import NhomGia from "../../select-option/NhomGia"
import KhachHang from "../../select-option/KhachHang"
import TuyenDoc from "../../select-option/TuyenDoc"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ThemHopDong() {
  const navigate = useNavigate()
  const [hopDong, setHopDong] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setHopDong(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option, e) => {
    const name = e.name
    setHopDong(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    })
  }

  console.log(hopDong)

  const them = async () => {
    const formData = new FormData()
    formData.append('ma_khach_hang', hopDong.ma_khach_hang)
    formData.append('ten_nguoi_dai_dien', hopDong.ten_nguoi_dai_dien)
    formData.append('chuc_vu_nguoi_dai_dien', hopDong.chuc_vu_nguoi_dai_dien)
    formData.append('ma_tuyen', hopDong.ma_tuyen)
    formData.append('ma_nhom_gia', hopDong.ma_nhom_gia)
    formData.append('dia_chi', hopDong.dia_chi)
    formData.append('ngay_lap', hopDong.ngay_lap)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/hop_dong`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/hop_dong')
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
    <div className="page">
      <h2 className="title">Thêm hợp đồng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Mã khách hàng</label>
          <KhachHang
            require={true}
            onChange={handleSelectChange}
            name="ma_khach_hang"
          />
        </div>
        <div>
          <label htmlFor="ten_nguoi_dai_dien">Tên người đại diện</label>
          <input required type="text" id='ten_nguoi_dai_dien' name='ten_nguoi_dai_dien' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="chuc_vu_nguoi_dai_dien">Chức vụ người đại diện</label>
          <input required type="text" id='chuc_vu_nguoi_dai_dien' name='chuc_vu_nguoi_dai_dien' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="">Tuyến đọc</label>
          <TuyenDoc
            require={true}
            onChange={handleSelectChange}
            name="ma_tuyen"
          />
        </div>
        <div>
          <label htmlFor="">Nhóm giá</label>
          <NhomGia
            require={true}
            onChange={handleSelectChange}
            name="ma_nhom_gia"
          />
        </div>
        <div>
          <label htmlFor="dia_chi">Địa chỉ</label>
          <input required type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="ngay_lap">Ngày lập</label>
          <input required type="date" id='ngay_lap' name='ngay_lap' onChange={handleInputChange} />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm hợp đồng
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}