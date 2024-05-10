import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";

export default function SuaQuanHuyen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenQuanHuyen, setTenQuyenHuyen] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quan_huyen/${id}`)
      .then(response => {
        setTenQuyenHuyen(response.data.ten_quan_huyen)
      })
  }, [])

  const handleChange = (e) => {
    setTenQuyenHuyen(e.target.value)
  }

  const suaQuanHuyen = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_quan_huyen', tenQuanHuyen)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/quan_huyen/${id}`, formData)
      console.log(response.data.message)
      navigate('/quan_huyen')
    } catch (error) {
      console.log(error.response.data.error)
    } 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaQuanHuyen()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa quận huyện</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_quan_huyen">Tên quận huyện</label>
          <input onChange={handleChange} type="text" id='ten_quan_huyen' name="ten_quan_huyen" value={tenQuanHuyen} />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-edit">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
            &nbsp;Sửa quận huyện
          </button>
        </div>
      </form>
    </div>
  )
}