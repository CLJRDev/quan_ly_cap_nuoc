import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TbSubtask } from "react-icons/tb";
import Select from 'react-select'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaiKhoan from '../../select-option/TaiKhoan'
import Quyen from '../../select-option/Quyen'
import Sidebar from '../../layouts/Sidebar'

export default function PhanQuyenTaiKhoan() {
  const navigate = useNavigate()
  const [phanQuyenData, setPhanQuyenData] = useState({
    ma_nhan_vien: {},
    quyens: []
  })

  const handleChange = (selectedOptions, event) => {
    const name = event.name
    setPhanQuyenData(pre => {
      return {
        ...pre,
        [name]: selectedOptions
      }
    })
  }

  const themPhanQuyen = async () => {
    const formData = new FormData()
    formData.append('ma_nhan_vien', phanQuyenData.ma_nhan_vien.value)

    phanQuyenData.quyens.forEach((maQuyen) => {
      formData.append('ma_quyen[]', maQuyen.value);
    });

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/phan_quyen`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/quan_ly_phan_quyen')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themPhanQuyen()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Phân quyền tài khoản</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label htmlFor="">Mã nhân viên</label>
            <TaiKhoan
              name='ma_nhan_vien'
              require={true}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Tên quyền</label>
            <Quyen
              isMulti={true}
              name='quyens'
              require={true}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" className="btn-add">
              <TbSubtask style={{ transform: 'scale(1.2)' }} />&nbsp;
              Phân quyền
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}