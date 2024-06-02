import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { MdOutlineEdit } from "react-icons/md"
import TuyenDoc from "../../select-option/TuyenDoc"
import Sidebar from '../../layouts/Sidebar'

export default function SuaLapDatDongHoKhoi() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dongHo, setDongHo] = useState({
    ma_dong_ho: '',
    tu_ngay: ''
  })
  const [tuyenDocOption, setTuyenDocOption] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/lap_dat_dh_khoi/${id}`)
      .then(response => {
        setDongHo({ ma_dong_ho: response.data.ma_dong_ho, tu_ngay: response.data.tu_ngay })
        setTuyenDocOption({ value: response.data.ma_tuyen, label: response.data.ten_tuyen })
      })
  }, [])

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
    setTuyenDocOption(option)
  }

  const sua = async () => {
    console.log(tuyenDocOption.value)
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('tu_ngay', dongHo.tu_ngay)
    formData.append('ma_tuyen', tuyenDocOption.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lap_dat_dh_khoi/${id}`, formData)
      console.log(response.data.message)
      navigate('/lap_dat_dh_khoi')
    } catch (error) {
      console.log(error.response.data.error)
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
        <h2 className="title">Sửa lắp đặt đồng hồ khối</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ma_dong_ho">Mã đồng hồ</label>
            <input readOnly type="number" id='ma_dong_ho' name="ma_dong_ho" value={dongHo.ma_dong_ho} />
          </div>
          <div>
            <label htmlFor="">Tuyến đọc</label>
            <TuyenDoc
              onChange={handleSelectChange}
              value={tuyenDocOption}
            />
          </div>
          <div>
            <label htmlFor="tu_ngay">Ngày lắp</label>
            <input type="date" id='tu_ngay' name="tu_ngay" onChange={handleInputChange} value={dongHo.tu_ngay} />
          </div>
          <div></div>
          <div>
            <button className="btn-edit" type="submit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp; Sửa lắp đặt
            </button>
          </div>
        </form>
      </div>
    </>
  )
}