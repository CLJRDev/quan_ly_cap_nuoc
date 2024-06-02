import { useLocation } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function GhiChiSoDongHoKhach() {
  const location = useLocation();
  const { thang, nam, tu_ngay, den_ngay } = location.state || {};
  const [dongHos, setDongHos] = useState([])
  const [ghiChiSo, setGhiChiSo] = useState({
    ma_lap_dat: '',
    chi_so_moi: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setGhiChiSo(pre => {
      return {
        ...pre,
        [name]: value
      }
    });
  }

  const resetInput = () => {
    setGhiChiSo({
      ma_lap_dat: '',
      chi_so_moi: ''
    })
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/lookup_dh_khach`)
      .then(response => {
        setDongHos(response.data)
      })
  }, [])

  const dongHoOptions = []

  dongHos.forEach(item => {
    dongHoOptions.push({
      value: item.ma_lap_dat,
      label: item.ma_dong_ho
    })
  })


  const handleSelectChange = (option, e) => {
    const name = e.name
    setGhiChiSo(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    });
  }

  const ghi = async (e) => {
    const formData = new FormData()
    formData.append('ky_hoa_don', `T${thang} - ${nam}`)
    formData.append('tu_ngay', tu_ngay)
    formData.append('den_ngay', den_ngay)
    formData.append('chi_so_moi', ghiChiSo.chi_so_moi)
    formData.append('ma_lap_dat', ghiChiSo.ma_lap_dat)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/hoa_don`, formData)
      SuccessToast(response.data.message)
      resetInput()
    } catch (error) {
      if (typeof error.response.data.error === 'object') {
        const errorsArray = Object.values(error.response.data.error).flat();
        errorsArray.forEach(item => {
          WarningToast(item)
        })
      } else {
        WarningToast(error.response.data.error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await ghi()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">GHI CHỈ SỐ ĐỒNG HỒ KHÁCH HÀNG</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Mã đồng hồ</label>
            <Select
              options={dongHoOptions}
              onChange={handleSelectChange}
              name='ma_lap_dat'
            />
          </div>
          <div>
            <label htmlFor="">Chỉ số mới</label>
            <input required type="number" name='chi_so_moi' onChange={handleInputChange} value={ghiChiSo.chi_so_moi} />
          </div>
          <div>
            <button type="submit" className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Ghi chỉ số
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}