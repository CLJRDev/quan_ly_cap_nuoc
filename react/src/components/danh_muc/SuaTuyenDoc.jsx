import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";
import Select from 'react-select'

export default function SuaTuyenDoc() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [tuyenDoc, setTuyenDoc] = useState(null)
  const [toQuanLyOption, setToQuanLyOption] = useState(null)
  const [phuongXaOption, setPhuongXaOption] = useState(null)
  const [toQuanLys, setToQuanLys] = useState(null)
  const [phuongXas, setPhuongXas] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tuyen_doc/${id}`)
      .then(response => {
        setTuyenDoc(response.data.ten_tuyen)
        setToQuanLyOption({ value: response.data.ma_to_quan_ly, label: response.data.ten_to_quan_ly })
        setPhuongXaOption({ value: response.data.ma_phuong_xa, label: response.data.ten_phuong_xa })
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/to_quan_ly`)
      .then(response => {
        setToQuanLys(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/phuong_xa`)
      .then(response => {
        setPhuongXas(response.data)
      })
  }, [])

  if (!tuyenDoc) return null
  if (!toQuanLys) return null
  if (!phuongXas) return null

  const toQuanLyOptions = []
  const phuongXaOptions = []

  toQuanLys.forEach(item => {
    toQuanLyOptions.push({
      value: item.ma_to_quan_ly,
      label: item.ten_to_quan_ly
    })
  })

  phuongXas.forEach(item => {
    phuongXaOptions.push({
      value: item.ma_phuong_xa,
      label: item.ten_phuong_xa
    })
  })

  const handleInputChange = (e) => {
    setTuyenDoc(e.target.value)
  }

  const handleToQuanLyChange = (selectedOption) => {
    setToQuanLyOption(selectedOption)
  }

  const handlePhuongXaChange = (selectedOption) => {
    setPhuongXaOption(selectedOption)
  }

  const suaTuyenDoc = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_tuyen', tuyenDoc)
    formData.append('ma_phuong_xa', phuongXaOption.value)
    formData.append('ma_to_quan_ly', toQuanLyOption.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tuyen_doc/${id}`, formData)
      console.log(response.data.message)
      navigate('/tuyen_doc')
    } catch (error) {
      console.log(error.response.data.error)
    } 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaTuyenDoc()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa tuyến đọc</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_tuyen">Tên tuyến đọc</label>
          <input type="text" id="ten_tuyen" name='ten_tuyen' onChange={handleInputChange} value={tuyenDoc} />
        </div>
        <div>
          <label htmlFor="">Tổ quản lý</label>
          <Select
            onChange={handleToQuanLyChange}
            options={toQuanLyOptions}
            value={toQuanLyOption}
          />
        </div>
        <div>
          <label htmlFor="">Phường xã</label>
          <Select
            onChange={handlePhuongXaChange}
            options={phuongXaOptions}
            value={phuongXaOption}
          />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-add">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp;Sửa tuyến đọc
          </button>
        </div>
      </form>
    </div>
  )
}