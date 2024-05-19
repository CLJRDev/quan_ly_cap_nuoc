import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { VscDebugContinue } from "react-icons/vsc"


export default function ChonThoiGianDongHoKhoi() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ky_chi_so: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/ghi_chi_so_dh_khoi/thoi_gian/ghi', { state: formData });
  }

  return (
    <div className="page">
      <h2 className="title">Chọn thời gian</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Kỳ chỉ số</label>
          <input required type="text" name='ky_chi_so' onChange={handleInputChange} />
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
  )
}
