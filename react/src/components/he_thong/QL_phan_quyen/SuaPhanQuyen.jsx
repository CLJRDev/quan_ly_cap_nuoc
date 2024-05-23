import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { MdOutlineEdit } from "react-icons/md";
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SuaPhanQuyen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [phanQuyen, setPhanQuyen] = useState(null)
  const [quyens, setQuyens] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/phan_quyen/${id}`)
      .then(response => {
        setPhanQuyen(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quyen`)
      .then(response => {
        setQuyens(response.data)
      })
  }, [])

  if (!phanQuyen) return null
  if (!quyens) return null

  const quyenOptions = quyens.map((item, index) => {
    return item.trang_thai == 1 && <option value={item.ma_quyen} key={index}>{item.ten_quyen}</option>
  })

  const handleChange = (e) => {
    setPhanQuyen(prePhanQuyen => {
      return {
        ...prePhanQuyen,
        ma_quyen: e.target.value
      }
    })
  }

  const suaPhanQuyen = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ma_nhan_vien', phanQuyen.ma_nhan_vien)
    formData.append('ma_quyen', phanQuyen.ma_quyen)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/phan_quyen/${id}`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/quan_ly_phan_quyen')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await suaPhanQuyen()
  }

  return (
    <div className="page">
      <h2 className="title">Sửa phân quyền: {phanQuyen.ho_ten}</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="ma_nhan_vien">Mã nhân viên</label>
          <input id='ma_nhan_vien' type="number" value={phanQuyen.ma_nhan_vien} readOnly />
        </div>
        <div>
          <label htmlFor="ma_quyen">Tên quyền</label>
          <select name="ma_quyen" id="ma_quyen" onChange={handleChange} value={phanQuyen.ma_quyen}>
            {quyenOptions}
          </select>
        </div>
        <div>
          <button type="submit" className="btn-add">
            <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />&nbsp;
            Sửa phân quyền
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}