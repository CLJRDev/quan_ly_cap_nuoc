import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import DongHoKhach from "../../select-option/DongHoKhach"
import HopDong from "../../select-option/HopDong"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function ThemLapDatDongHoKhach() {
  const navigate = useNavigate()
  const { ma_hop_dong, ma_dong_ho } = useParams()
  const [lapDat, setLapDat] = useState({
    ma_dong_ho: ma_dong_ho || '',
    ma_hop_dong: ma_hop_dong || '',
    tu_ngay: ''
  })

  const [selectedHopDong, setSelectedHopDong] = useState(null);
  const isDisabledHopDong = ma_hop_dong ? true : false
  const [selectedDongHo, setSelectedDongHo] = useState(null);
  const isDisabledDongHo = ma_dong_ho ? true : false

  useEffect(() => {
    if (ma_hop_dong) {
      axios.get(`http://127.0.0.1:8000/api/hop_dong/${ma_hop_dong}`)
        .then(response => {
          setSelectedHopDong({ value: response.data.ma_hop_dong, label: response.data.ma_hop_dong })
          setLapDat(pre => ({
            ...pre,
            ma_hop_dong: response.data.ma_hop_dong
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
    if (name === 'ma_hop_dong') {
      setSelectedHopDong(option);
    }
    if (name === 'ma_dong_ho') {
      setSelectedDongHo(option);
    }
  }

  console.log(lapDat)

  const them = async () => {
    const formData = new FormData()
    formData.append('ma_dong_ho', lapDat.ma_dong_ho)
    formData.append('ma_hop_dong', lapDat.ma_hop_dong)
    formData.append('tu_ngay', lapDat.tu_ngay)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lap_dat_dh_khach`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/lap_dat_dh_khach')
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
        <h2 className="title">Lắp đặt đồng hồ khách hàng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Mã đồng hồ</label>
            <DongHoKhach
              onChange={handleSelectChange}
              isLapDat={true}
              name='ma_dong_ho'
              require={true}
              value={selectedDongHo && selectedDongHo}
              isDisabled={isDisabledDongHo}
            />
          </div>
          <div>
            <label htmlFor="">Mã hợp đồng</label>
            <HopDong
              onChange={handleSelectChange}
              name='ma_hop_dong'
              value={selectedHopDong && selectedHopDong}
              isLapDat={true}
              require={true}
              isDisabled={isDisabledHopDong}
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