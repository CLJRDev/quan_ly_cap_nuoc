import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { VscDebugContinue } from "react-icons/vsc"
import Nam from '../../select-option/Nam'
import Thang from '../../select-option/Thang'
import Sidebar from '../../layouts/Sidebar'

export default function ChonThoiGianDongHoKhoi() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    thang: '',
    nam: '',
    tu_ngay: '',
    den_ngay: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(pre => {
      return {
        ...pre,
        [name]: value
      }
    });
  }

  const handleSelectChange = (option, e) => {
    const name = e.name
    setFormData(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    });
  }

  console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/ghi_chi_so_dh_khach/thoi_gian/ghi', { state: formData });
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Chọn thời gian</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Kỳ hóa đơn</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
              <Thang
                onChange={handleSelectChange}
                name='thang'
                require={true}
                value={formData.thang}
              />
              <Nam
                onChange={handleSelectChange}
                name='nam'
                require={true}
                value={formData.nam}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Từ ngày</label>
            <input required type="date" name='tu_ngay' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Đến ngày</label>
            <input required type="date" name='den_ngay' onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <VscDebugContinue style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
