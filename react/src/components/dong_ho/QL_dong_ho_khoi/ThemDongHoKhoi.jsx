import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import LoaiDongHo from "../../select-option/LoaiDongHo"
import CoDongHo from "../../select-option/CoDongHo"
import NhaCungCap from "../../select-option/NhaCungCap"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function ThemDongHoKhoi() {
  const navigate = useNavigate()
  const [dongHo, setDongHo] = useState({
    ten_dong_ho: '',
    ma_loai_dong_ho: '',
    ma_nha_cung_cap: '',
    ma_co_dong_ho: '',
    tinh_trang: '',
    ngay_nhap: '',
    ngay_kiem_dinh: '',
    so_nam_hieu_luc: '',
    so_thang_bao_hanh: ''
  })

  const trangThaiOptions = [
    { value: 1, label: 'Đang lắp đặt' },
    { value: 0, label: 'Trống' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDongHo(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option, e) => {
    const name = e.name
    setDongHo(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    })
  }

  const them = async () => {
    const formData = new FormData()
    formData.append('ten_dong_ho', dongHo.ten_dong_ho)
    formData.append('ma_loai_dong_ho', dongHo.ma_loai_dong_ho)
    formData.append('ma_nha_cung_cap', dongHo.ma_nha_cung_cap)
    formData.append('ma_co_dong_ho', dongHo.ma_co_dong_ho)
    formData.append('tinh_trang', dongHo.tinh_trang)
    formData.append('ngay_nhap', dongHo.ngay_nhap)
    formData.append('ngay_kiem_dinh', dongHo.ngay_kiem_dinh)
    formData.append('so_nam_hieu_luc', dongHo.so_nam_hieu_luc)
    formData.append('so_thang_bao_hanh', dongHo.so_thang_bao_hanh)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/dong_ho_khoi`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/dong_ho_khoi')
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
        <h2 className="title">Thêm đồng hồ khối</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_dong_ho">Tên đồng hồ</label>
            <input type="text" id='ten_dong_ho' name='ten_dong_ho' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Loại đồng hồ</label>
            <LoaiDongHo
              onChange={handleSelectChange}
              name='ma_loai_dong_ho'
            />
          </div>
          <div>
            <label htmlFor="">Nhà cung cấp</label>
            <NhaCungCap
              onChange={handleSelectChange}
              name='ma_nha_cung_cap'
            />
          </div>
          <div>
            <label htmlFor="">Kích cỡ</label>
            <CoDongHo
              onChange={handleSelectChange}
              name='ma_co_dong_ho'
            />
          </div>
          <div>
            <label htmlFor="">Tình trạng</label>
            <Select
              options={trangThaiOptions}
              onChange={handleSelectChange}
              name="tinh_trang"
            />
          </div>
          <div>
            <label htmlFor="ngay_nhap">Ngày nhập</label>
            <input type="date" id='ngay_nhap' name='ngay_nhap' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ngay_kiem_dinh">Ngày kiểm định</label>
            <input type="date" id='ngay_kiem_dinh' name='ngay_kiem_dinh' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="so_nam_hieu_luc">Số năm hiệu lực</label>
            <input type="number" id='so_nam_hieu_luc' name='so_nam_hieu_luc' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="so_thang_bao_hanh">Số tháng bảo hành</label>
            <input type="number" id='so_thang_bao_hanh' name='so_thang_bao_hanh' onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm đồng hồ
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}