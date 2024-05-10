import axios from "axios"
import { useState, useEffect } from "react"
import { MdOutlineEdit } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom"

export default function SuaLoaiKhachHang() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenLoaiKhachHang, setTenLoaiKhachHang] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_khach_hang/${id}`)
      .then(response => {
        setTenLoaiKhachHang(response.data.ten_loai_khach_hang)
      })
  }, [])

  const handleChange = (e) => {
    setTenLoaiKhachHang(e.target.value)
  }

  const suaLoaiKhachHang = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_loai_khach_hang', tenLoaiKhachHang)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/loai_khach_hang/${id}`, formData)
      console.log(response.data.message)
      navigate('/loai_khach_hang')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaLoaiKhachHang()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa loại khách hàng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_loai_khach_hang">Tên loại khách hàng</label>
          <input onChange={handleChange} type="text" id='ten_loai_khach_hang' name="ten_loai_khach_hang" value={tenLoaiKhachHang} />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-edit">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp;Sửa loại khách hàng
          </button>
        </div>
      </form>
    </div>
  )
}