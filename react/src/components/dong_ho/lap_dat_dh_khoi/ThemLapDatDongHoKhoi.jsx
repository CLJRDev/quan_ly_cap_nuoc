import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import DongHoKhoi from "../../select-option/DongHoKhoi"
import TuyenDoc from "../../select-option/TuyenDoc"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function ThemLapDatDongHoKhoi() {
  const navigate = useNavigate()
  const { ma_tuyen, ma_dong_ho } = useParams()
  const [lapDat, setLapDat] = useState({
    ma_dong_ho: ma_dong_ho || '',
    ma_tuyen: ma_tuyen || '',
    tu_ngay: ''
  })
  const [selectedTuyen, setSelectedTuyen] = useState(null);
  const isDisabledTuyen = ma_tuyen ? true : false
  const [selectedDongHo, setSelectedDongHo] = useState(null);
  const isDisabledDongHo = ma_dong_ho ? true : false

  useEffect(() => {
    if (ma_tuyen) {
      axios.get(`http://127.0.0.1:8000/api/tuyen_doc/${ma_tuyen}`)
        .then(response => {
          setSelectedTuyen({ value: response.data.ma_tuyen, label: response.data.ten_tuyen })
          setLapDat(pre => ({
            ...pre,
            ma_tuyen: response.data.ma_tuyen
          }))
        })
    }
  }, []);

  useEffect(() => {
    if (ma_dong_ho) {
      axios.get(`http://127.0.0.1:8000/api/dong_ho_khoi/${ma_dong_ho}`)
        .then(response => {
          setSelectedDongHo({ value: response.data.ma_dong_ho, label: response.data.ma_dong_ho })
          setLapDat(pre => ({
            ...pre,
            ma_dong_ho: response.data.ma_dong_ho
          }))
        })
    }
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target
    setLapDat(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option, { name }) => {
    setLapDat(pre => ({
      ...pre,
      [name]: option.value
    }));
    if (name === 'ma_tuyen') {
      setSelectedTuyen(option);
    }
    if (name === 'ma_dong_ho') {
      setSelectedDongHo(option);
    }
  }

  const them = async () => {
    const formData = new FormData()
    formData.append('ma_dong_ho', lapDat.ma_dong_ho)
    formData.append('ma_tuyen', lapDat.ma_tuyen)
    formData.append('tu_ngay', lapDat.tu_ngay)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lap_dat_dh_khoi`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/lap_dat_dh_khoi')
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
    await them()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Lắp đặt đồng hồ khối</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Mã đồng hồ</label>
            <DongHoKhoi
              onChange={handleSelectChange}
              isLapDat={true}
              name='ma_dong_ho'
              require={true}
              value={selectedDongHo && selectedDongHo}
              isDisabled={isDisabledDongHo}
            />
          </div>
          <div>
            <label htmlFor="">Tuyến đọc</label>
            <TuyenDoc
              onChange={handleSelectChange}
              isLapDat={true}
              name='ma_tuyen'
              value={selectedTuyen && selectedTuyen}
              isDisabled={isDisabledTuyen}
              require={true}
            />
          </div>
          <div>
            <label htmlFor="tu_ngay">Ngày lắp</label>
            <input type="date" id='tu_ngay' name="tu_ngay" onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button className="btn-add" type="submit">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Lắp đặt
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}