import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TbSubtask } from "react-icons/tb";
import Select from 'react-select'

export default function PhanQuyenTaiKhoan() {
  const navigate = useNavigate()
  const [quyens, setQuyens] = useState(null)
  const [nhanViens, setNhanViens] = useState(null)
  const [phanQuyenData, setPhanQuyenData] = useState({
    ma_nhan_vien: {},
    quyens: []
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quyen`)
      .then(response => {
        setQuyens(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tai_khoan`)
      .then(response => {
        setNhanViens(response.data)
      })
  }, [])

  if (!quyens) return null
  if (!nhanViens) return null

  const quyenOptions = []
  const nhanVienOptions = []

  quyens.forEach(item => {
    if(item.trang_thai == 1){
      quyenOptions.push({
        value: item.ma_quyen,
        label: item.ten_quyen   
      })
    }
  })

  nhanViens.forEach(item => {
    if(item.trang_thai == 1){
      nhanVienOptions.push({
        value: item.ma_nhan_vien,
        label: item.ma_nhan_vien   
      })
    }
  })

  const handleChange = (selectedOptions, event) => {
    const name = event.name
    setPhanQuyenData(preQuyen => {
      return {
        ...preQuyen,
        [name]: selectedOptions
      }
    })
  }

  const themPhanQuyen = async () => {
    const formData = new FormData()
    formData.append('ma_nhan_vien', phanQuyenData.ma_nhan_vien.value)

    phanQuyenData.quyens.forEach((maQuyen) => {
      formData.append('ma_quyen[]', maQuyen.value);
    });

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/phan_quyen`, formData)
      console.log(response.data.message)
      navigate('/quan_ly_phan_quyen')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themPhanQuyen()
  }

  return (
    <div className="page">
      <h2 className="title">Phân quyền tài khoản</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="">Mã nhân viên</label>
          <Select             
            options={nhanVienOptions}
            name='ma_nhan_vien'
            onChange={handleChange}
          />          
        </div>
        <div>
          <label htmlFor="">Tên quyền</label>
          <Select  
            isMulti
            name='quyens'
            options={quyenOptions}            
            onChange={handleChange}         
          />
        </div>
        <div>
          <button type="submit" className="btn-add">
            <TbSubtask style={{ transform: 'scale(1.2)' }} />&nbsp;
            Phân quyền
          </button>
        </div>
      </form>
    </div>
  )
}