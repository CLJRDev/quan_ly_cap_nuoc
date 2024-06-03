import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { MdOutlineEdit } from "react-icons/md";
import LoaiDongHo from "../../select-option/LoaiDongHo"
import CoDongHo from "../../select-option/CoDongHo"
import NhaCungCap from "../../select-option/NhaCungCap"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function SuaDongHoKhach() {
  const { id, ma_hop_dong } = useParams()
  const navigate = useNavigate()
  const [dongHo, setDongHo] = useState({
    ten_dong_ho: '',
    nam_san_xuat: '',
    so_seri: '',
    ngay_nhap: '',
    ngay_kiem_dinh: '',
    so_nam_hieu_luc: '',
    so_thang_bao_hanh: ''
  })
  const [selectedOptions, setSelectedOptions] = useState({
    loai_dong_ho: {},
    nha_cung_cap: {},
    co_dong_ho: {},
  })

  useEffect(() => {
    if (ma_hop_dong) {
      axios.get(`http://127.0.0.1:8000/api/lookup_dh_hop_dong?ma_hop_dong=${ma_hop_dong}`)
        .then(response => {
          setDongHo(response.data)
          setSelectedOptions({
            loai_dong_ho: { value: response.data.ma_loai_dong_ho, label: response.data.ten_loai_dong_ho },
            nha_cung_cap: { value: response.data.ma_nha_cung_cap, label: response.data.ten_nha_cung_cap },
            co_dong_ho: { value: response.data.ma_co_dong_ho, label: response.data.ten_co_dong_ho }
          })
        })
    } else {
      axios.get(`http://127.0.0.1:8000/api/dong_ho_khach/${id}`)
        .then(response => {
          setDongHo(response.data)
          setSelectedOptions({
            loai_dong_ho: { value: response.data.ma_loai_dong_ho, label: response.data.ten_loai_dong_ho },
            nha_cung_cap: { value: response.data.ma_nha_cung_cap, label: response.data.ten_nha_cung_cap },
            co_dong_ho: { value: response.data.ma_co_dong_ho, label: response.data.ten_co_dong_ho }
          })
        })
    }
  }, [])


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
    setSelectedOptions(pre => {
      return {
        ...pre,
        [name]: option
      }
    })
  }

  const sua = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_dong_ho', dongHo.ten_dong_ho)
    formData.append('nam_san_xuat', dongHo.nam_san_xuat)
    formData.append('so_seri', dongHo.so_seri)
    formData.append('ngay_nhap', dongHo.ngay_nhap)
    formData.append('ngay_kiem_dinh', dongHo.ngay_kiem_dinh)
    formData.append('so_nam_hieu_luc', dongHo.so_nam_hieu_luc)
    formData.append('so_thang_bao_hanh', dongHo.so_thang_bao_hanh)
    formData.append('ma_loai_dong_ho', selectedOptions.loai_dong_ho.value)
    formData.append('ma_nha_cung_cap', selectedOptions.nha_cung_cap.value)
    formData.append('ma_co_dong_ho', selectedOptions.co_dong_ho.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/dong_ho_khach/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/dong_ho_khach')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sua()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa đồng hồ khách hàng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_dong_ho">Tên đồng hồ</label>
            <input type="text" id='ten_dong_ho' name='ten_dong_ho' onChange={handleInputChange} value={dongHo.ten_dong_ho} />
          </div>
          <div>
            <label htmlFor="nam_san_xuat">Năm sản xuất</label>
            <input type="text" id='nam_san_xuat' name='nam_san_xuat' onChange={handleInputChange} value={dongHo.nam_san_xuat} />
          </div>
          <div>
            <label htmlFor="so_seri">Số seri</label>
            <input type="text" id='so_seri' name='so_seri' onChange={handleInputChange} value={dongHo.so_seri} />
          </div>
          <div>
            <label htmlFor="">Loại đồng hồ</label>
            <LoaiDongHo
              onChange={handleSelectChange}
              name="loai_dong_ho"
              value={selectedOptions.loai_dong_ho}
            />
          </div>
          <div>
            <label htmlFor="">Nhà cung cấp</label>
            <NhaCungCap
              onChange={handleSelectChange}
              name="nha_cung_cap"
              value={selectedOptions.nha_cung_cap}
            />
          </div>
          <div>
            <label htmlFor="">Kích cỡ</label>
            <CoDongHo
              onChange={handleSelectChange}
              name="co_dong_ho"
              value={selectedOptions.co_dong_ho}
            />
          </div>
          <div>
            <label htmlFor="ngay_nhap">Ngày nhập</label>
            <input type="date" id='ngay_nhap' name='ngay_nhap' onChange={handleInputChange} value={dongHo.ngay_nhap} />
          </div>
          <div>
            <label htmlFor="ngay_kiem_dinh">Ngày kiểm định</label>
            <input type="date" id='ngay_kiem_dinh' name='ngay_kiem_dinh' onChange={handleInputChange} value={dongHo.ngay_kiem_dinh} />
          </div>
          <div>
            <label htmlFor="so_nam_hieu_luc">Số năm hiệu lực</label>
            <input type="number" id='so_nam_hieu_luc' name='so_nam_hieu_luc' onChange={handleInputChange} value={dongHo.so_nam_hieu_luc} />
          </div>
          <div>
            <label htmlFor="so_thang_bao_hanh">Số tháng bảo hành</label>
            <input type="number" id='so_thang_bao_hanh' name='so_thang_bao_hanh' onChange={handleInputChange} value={dongHo.so_thang_bao_hanh} />
          </div>
          <div>
            <button className="btn-edit" type="submit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp; Sửa đồng hồ
            </button>
          </div>
        </form>
      </div>
    </>
  )
}