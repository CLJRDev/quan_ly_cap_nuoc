import axios from "axios"
import { useState, useEffect } from "react"
import { MdOutlineEdit } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom"
import SuccessToast from '../notification/SuccessToast'
import ErrorToast from '../notification/ErrorToast'
import WarningToast from '../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../layouts/Sidebar'

export default function SuaNhaCungCap() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nhaCungCap, setNhaCungCap] = useState({
    ten_nha_cung_cap: '',
    dia_chi: '',
    sdt: ''
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/nha_cung_cap/${id}`)
      .then(response => {
        setNhaCungCap(response.data)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNhaCungCap(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const suaNhaCungCap = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten_nha_cung_cap', nhaCungCap.ten_nha_cung_cap)
    formData.append('dia_chi', nhaCungCap.dia_chi)
    formData.append('sdt', nhaCungCap.sdt)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/nha_cung_cap/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/nha_cung_cap')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaNhaCungCap()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa nhà cung cấp đồng hồ</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ten_nha_cung_cap">Tên nhà cung cấp</label>
            <input required type="text" id='ten_nha_cung_cap' name="ten_nha_cung_cap" value={nhaCungCap.ten_nha_cung_cap} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input required type="text" id='dia_chi' name='dia_chi' value={nhaCungCap.dia_chi} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="sdt">Số điện thoại</label>
            <input required type="number" id='sdt' name="sdt" value={nhaCungCap.sdt} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <button className="btn-edit" type="submit">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp;Sửa nhà cung cấp
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}