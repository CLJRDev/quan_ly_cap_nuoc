import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import { MdOutlineEdit } from "react-icons/md";

export default function SuaGia() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loaiKhachHangs, setLoaiKhachHangs] = useState(null)
  const [gia, setGia] = useState({
    ten_nhom_gia: '',
    hs_duoi_10m: '',
    hs_tu_10m_den_20m: '',
    hs_tu_20m_den_30m: '',
    hs_tren_30m: '',
    hs_rieng: '',
    hs_thue: '',
    gia_ban: ''
  })
  const [selectedOption, setSelectedOption] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_khach_hang`)
      .then(response => {
        setLoaiKhachHangs(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/nhom_gia/${id}`)
      .then(response => {
        setGia(response.data)
        setSelectedOption({value: response.data.ma_loai_khach_hang, label: response.data.ten_loai_khach_hang})
      })
  }, [])

  if (!loaiKhachHangs) return null
  const options = []
  loaiKhachHangs.forEach(item => {
    options.push({
      value: item.ma_loai_khach_hang,
      label: item.ten_loai_khach_hang
    })
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setGia(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option) => {
    setSelectedOption(option)
  }

  const sua = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_nhom_gia', gia.ten_nhom_gia)
    if(gia.hs_rieng === null) {
      formData.append('hs_duoi_10m', gia.hs_duoi_10m)
      formData.append('hs_tu_10m_den_20m', gia.hs_tu_10m_den_20m)
      formData.append('hs_tu_20m_den_30m', gia.hs_tu_20m_den_30m)
      formData.append('hs_tren_30m', gia.hs_tren_30m)
    }else{
      formData.append('hs_rieng', gia.hs_rieng)
    }
    formData.append('hs_thue', gia.hs_thue)
    formData.append('gia_ban', gia.gia_ban)
    formData.append('ma_loai_khach_hang', selectedOption.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/nhom_gia/${id}`, formData)
      console.log(response.data.message)
      navigate('/gia_nuoc')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sua()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa giá nước</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_nhom_gia">Tên nhóm giá</label>
          <input type="text" id='ten_nhom_gia' name='ten_nhom_gia' onChange={handleInputChange} value={gia.ten_nhom_gia} />
        </div>
        <div>
          <label htmlFor="loai_khach_hang">Loại khách hàng</label>
          <Select
            options={options}
            onChange={handleSelectChange}
            value={selectedOption}
          />
        </div>
        <div>
          <label htmlFor="hs_duoi_10m">Hệ số dưới 10m³</label>
          <input type="number" id='hs_duoi_10m' step='0.01' name='hs_duoi_10m' onChange={handleInputChange} value={!gia.hs_duoi_10m ? '' : gia.hs_duoi_10m} />
        </div>
        <div>
          <label htmlFor="hs_tu_10m_den_20m">Hệ số từ 10m³ đến 20m³</label>
          <input type="number" id='hs_tu_10m_den_20m' step='0.01' name='hs_tu_10m_den_20m' onChange={handleInputChange} value={!gia.hs_tu_10m_den_20m ? '' : gia.hs_tu_10m_den_20m} />
        </div>
        <div>
          <label htmlFor="hs_tu_20m_den_30m">Hệ số từ 20m³ đến 30m³</label>
          <input type="number" id='hs_tu_20m_den_30m' step='0.01' name='hs_tu_20m_den_30m' onChange={handleInputChange} value={!gia.hs_tu_20m_den_30m ? '' : gia.hs_tu_20m_den_30m} />
        </div>
        <div>
          <label htmlFor="hs_tren_30m">Hệ số trên 30m³</label>
          <input type="number" id='hs_tren_30m' step='0.01' name='hs_tren_30m' onChange={handleInputChange} value={!gia.hs_tren_30m ? '' : gia.hs_tren_30m} />
        </div>
        <div>
          <label htmlFor="hs_rieng">Hệ số riêng</label>
          <input type="number" id='hs_rieng' step='0.01' name='hs_rieng' onChange={handleInputChange} value={!gia.hs_rieng ? '' : gia.hs_rieng} />
        </div>
        <div>
          <label htmlFor="hs_thue">Hệ số thuế</label>
          <input type="number" id='hs_thue' step='0.01' name='hs_thue' onChange={handleInputChange} value={gia.hs_thue} />
        </div>
        <div>
          <label htmlFor="gia_ban">Giá bán</label>
          <input type="number" id='gia_ban' step='0.01' name='gia_ban' onChange={handleInputChange} value={gia.gia_ban} />
        </div>
        <div></div>
        <div>
          <button className="btn-add">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp; Sửa nhóm giá
          </button>
        </div>
      </form>
    </div>
  )
}