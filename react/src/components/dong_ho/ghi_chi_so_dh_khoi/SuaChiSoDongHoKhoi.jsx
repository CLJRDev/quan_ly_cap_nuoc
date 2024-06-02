import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { MdOutlineEdit } from "react-icons/md"
import TuyenDoc from "../../select-option/TuyenDoc"
import Sidebar from '../../layouts/Sidebar'

export default function SuaChiSoDongHoKhoi() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ghiChiSo, setGhiChiSo] = useState({
    tu_ngay: '',
    den_ngay: '',
    chi_so_moi: ''
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/lich_su_dh_khoi/${id}`)
      .then(response => {
        setGhiChiSo(response.data)
      })
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setGhiChiSo(pre => {
      return {
        ...pre,
        [name]: value
      }
    });
  }

  const sua = async (e) => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ma_lich_su', id)
    //formData.append('ky_chi_so', ky_chi_so)
    formData.append('tu_ngay', ghiChiSo.tu_ngay)
    formData.append('den_ngay', ghiChiSo.den_ngay)
    formData.append('chi_so_moi', ghiChiSo.chi_so_moi)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lich_su_dh_khoi/${id}`, formData)
      console.log(response.data.message)
      navigate('/ghi_chi_so_dh_khoi')
    } catch (error) {
      console.log(error.response.data.message)
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
        <h2 className="title">Sửa chỉ số đồng hồ khối</h2>
        <form className='form-container' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Từ ngày</label>
            <input required type="date" name='tu_ngay' onChange={handleInputChange} value={ghiChiSo.tu_ngay} />
          </div>
          <div>
            <label htmlFor="">Đến ngày</label>
            <input required type="date" name='den_ngay' onChange={handleInputChange} value={ghiChiSo.den_ngay} />
          </div>
          <div>
            <label htmlFor="">Chỉ số mới</label>
            <input required type="number" name='chi_so_moi' onChange={handleInputChange} value={ghiChiSo.chi_so_moi} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-edit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp; Sửa chỉ số
            </button>
          </div>
        </form>
      </div>
    </>
  )
}