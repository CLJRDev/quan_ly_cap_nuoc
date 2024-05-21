import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import DongHoKhach from "../../select-option/DongHoKhach"
import HopDong from "../../select-option/HopDong"

export default function ThemLapDatDongHoKhach() {
  const navigate = useNavigate()
  const [dongHo, setDongHo] = useState({
    ma_dong_ho: '',
    ma_hop_dong: '',
    tu_ngay: ''
  })

  const handleInputChange = e => {
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

  console.log(dongHo)

  const them = async () => {
    const formData = new FormData()
    formData.append('ma_dong_ho', dongHo.ma_dong_ho)
    formData.append('ma_hop_dong', dongHo.ma_hop_dong)
    formData.append('tu_ngay', dongHo.tu_ngay)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lap_dat_dh_khach`, formData)
      console.log(response.data.message)
      navigate('/lap_dat_dh_khach')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await them()
  }

  return (
    <div className="page">
      <h2 className="title">Lắp đặt đồng hồ khách hàng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Mã đồng hồ</label>
          <DongHoKhach
            onChange={handleSelectChange}
            name='ma_dong_ho'
          />
        </div>
        <div>
          <label htmlFor="">Mã hợp đồng</label>
          <HopDong
            onChange={handleSelectChange}
            name='ma_hop_dong'
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
    </div>
  )
}