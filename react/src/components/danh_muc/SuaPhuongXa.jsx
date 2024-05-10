import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";
import Select from 'react-select'

export default function SuaPhuongXa() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [quanHuyens, setQuanHuyens] = useState(null)
  const [tenPhuongXa, setTenPhuongXa] = useState('')
  const [quanHuyenOption, setQuanHuyenOption] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quan_huyen`)
      .then(response => {
        setQuanHuyens(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/phuong_xa/${id}`)
      .then(response => {
        setTenPhuongXa(response.data.ten_phuong_xa)
        setQuanHuyenOption({ value: response.data.ma_quan_huyen, label: response.data.ten_quan_huyen })
      })
  }, [])

  if (!quanHuyens) return null

  const quanHuyenOptions = []
  quanHuyens.forEach(item => {
    quanHuyenOptions.push({
      value: item.ma_quan_huyen,
      label: item.ten_quan_huyen
    })
  })

  const handleInputChange = (e) => {
    setTenPhuongXa(e.target.value)
  }

  const handleSelectChange = (option) => {
    setQuanHuyenOption(option)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_phuong_xa', tenPhuongXa)
    formData.append('ma_quan_huyen', quanHuyenOption.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/phuong_xa/${id}`, formData)
      console.log(response.data.message)
      navigate('/phuong_xa')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className="page">
      <h2 className="title">Sửa phường xã</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_phuong_xa">Tên phường xã</label>
          <input type="text" id='ten_phuong_xa' onChange={handleInputChange} value={tenPhuongXa} />
        </div>
        <div>
          <label htmlFor="">Tên quận huyện</label>
          <Select
            options={quanHuyenOptions}
            onChange={handleSelectChange}
            value={quanHuyenOption}
          />
        </div>
        <div>
          <button className="btn-add" type="submit">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp;Sửa phường xã
          </button>
        </div>
      </form>
    </div>
  )
}