import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import axios from 'axios';
import Select from 'react-select'
import Nam from '../../select-option/Nam'
import Thang from '../../select-option/Thang'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../../layouts/Sidebar'

export default function ChonThoiGianDongHoKhoi() {
  const navigate = useNavigate();
  const [dongHos, setDongHos] = useState([])
  const [ghiChiSo, setGhiChiSo] = useState({
    thang: '',
    nam: '',
    tu_ngay: '',
    den_ngay: '',
    ma_lap_dat: '',
    chi_so_moi: ''
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/lookup_dh_khoi`)
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setGhiChiSo(pre => {
      return {
        ...pre,
        [name]: value
      }
    });
  }

  const handleSelectChange = (option, e) => {
    const name = e.name
    setGhiChiSo(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    });
  }

  // const resetInput = () => {
  //   setGhiChiSo({
  //     thang: '',
  //     nam: '',
  //     tu_ngay: '',
  //     den_ngay: '',
  //     ma_lap_dat: '',
  //     chi_so_moi: ''
  //   })
  // }

  const ghi = async (e) => {
    const formData = new FormData()
    formData.append('ky_chi_so', `T${ghiChiSo.thang} - ${ghiChiSo.nam}`)
    formData.append('tu_ngay', ghiChiSo.tu_ngay)
    formData.append('den_ngay', ghiChiSo.den_ngay)
    formData.append('chi_so_moi', ghiChiSo.chi_so_moi)
    formData.append('ma_lap_dat', ghiChiSo.ma_lap_dat)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lich_su_dh_khoi`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/ghi_chi_so_dh_khoi')
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
        <h2 className="title">Ghi chỉ số đồng hồ khối</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Kỳ chỉ số</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
              <Thang
                onChange={handleSelectChange}
                name='thang'
                require={true}
                value={ghiChiSo.thang}
              />
              <Nam
                onChange={handleSelectChange}
                name='nam'
                require={true}
                value={ghiChiSo.nam}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Từ ngày</label>
            <input required type="date" name='tu_ngay' onChange={handleInputChange} value={ghiChiSo.tu_ngay} />
          </div>
          <div>
            <label htmlFor="">Đến ngày</label>
            <input required type="date" name='den_ngay' onChange={handleInputChange} value={ghiChiSo.den_ngay} />
          </div>
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
          <div></div>
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
