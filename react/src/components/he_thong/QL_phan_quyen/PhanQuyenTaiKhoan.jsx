import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TbSubtask } from "react-icons/tb";
import Select from 'react-select'

export default function PhanQuyenTaiKhoan() {
  const navigate = useNavigate()
  const [quyens, setQuyens] = useState(null)
  const [phanQuyenData, setPhanQuyenData] = useState({
    ma_nhan_vien: '',
    selected_quyens: []
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quyen`)
      .then(response => {
        setQuyens(response.data)
      })
  }, [])

  if (!quyens) return null
  
  const options = []
  quyens.forEach(item => {
    if(item.trang_thai == 1){
      options.push({
        value: item.ma_quyen,
        label: item.ten_quyen   
      })
    }
  })

  const handleNhanVien = (e) => {
    setPhanQuyenData(preQuyen => {
      return {
        ...preQuyen,
        ma_nhan_vien: e.target.value
      }
    })
  }

  const handleQuyen = (selectedOptions) => {
    setPhanQuyenData(preQuyen => {
      return {
        ...preQuyen,
        selected_quyens: selectedOptions
      }
    })
  }

  const themPhanQuyen = async () => {
    const formData = new FormData()
    formData.append('ma_nhan_vien', phanQuyenData.ma_nhan_vien)

    phanQuyenData.selected_quyens.forEach((maQuyen) => {
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
          <label htmlFor="ma_nhan_vien">Mã nhân viên</label>
          <input id='ma_nhan_vien' name='ma_nhan_vien' type="number" onChange={handleNhanVien} />
        </div>
        <div>
          <label htmlFor="quyens">Tên quyền</label>
          <Select  
            isMulti
            id='quyens'
            name="quyens"
            options={options}            
            onChange={handleQuyen}         
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