import axios from "axios"
import { useState, useEffect } from "react"
import { MdOutlineEdit } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom"

export default function SuaNhaCungCap() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenNhaCungCap, setTenNhaCungCap] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/nha_cung_cap/${id}`)
      .then(response => {
        setTenNhaCungCap(response.data.ten_nha_cung_cap)
      })
  }, [])

  const handleChange = (e) => {
    setTenNhaCungCap(e.target.value)
  }

  const suaNhaCungCap = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_nha_cung_cap', tenNhaCungCap)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/nha_cung_cap/${id}`, formData)
      console.log(response.data.message)
      navigate('/nha_cung_cap')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaNhaCungCap()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa nhà cung cấp đồng hồ</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_nha_cung_cap">Tên nhà cung cấp</label>
          <input type="text" id='ten_nha_cung_cap' value={tenNhaCungCap} onChange={handleChange} />
        </div>
        <div></div>
        <div>
          <button className="btn-edit" type="submit">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp;Sửa nhà cung cấp
          </button>
        </div>
      </form>
    </div>
  )
}