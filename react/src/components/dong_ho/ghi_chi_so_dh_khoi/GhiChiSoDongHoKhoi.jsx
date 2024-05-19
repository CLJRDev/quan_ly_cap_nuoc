import { useLocation } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io"
import DongHoKhoi from "../../select-option/DongHoKhoi"
import { useState } from 'react';
import axios from 'axios';

export default function GhiChiSoDongHoKhoi() {
  const location = useLocation();
  const { ky_chi_so, tu_ngay, den_ngay } = location.state || {};
  const [ghiChiSo, setGhiChiSo] = useState({
    ma_dong_ho: '',
    chi_so_moi: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setGhiChiSo(pre => {
      return {
        ...pre,
        [name]: value
      }
    });
  }

  const handleSelectChange = (option, e) => {
    const name = e.name
    setGhiChiSo(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    });
  }

  const resetInput = () => {
    setGhiChiSo({
      ma_dong_ho: '',
      chi_so_moi: ''
    })
  }

  const ghi = async (e) => {
    const formData = new FormData()
    formData.append('ky_chi_so', ky_chi_so)
    formData.append('tu_ngay', tu_ngay)
    formData.append('den_ngay', den_ngay)
    formData.append('chi_so_moi', ghiChiSo.chi_so_moi)
    formData.append('ma_dong_ho', ghiChiSo.ma_dong_ho)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/lich_su_dh_khoi`, formData)
      console.log(response.data.message)
      resetInput()
    } catch (error) {
      console.log(error.message.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await ghi()
  }

  return (
    <div className='page'>
      <h2 className="title">GHI CHỈ SỐ ĐỒNG HỒ KHỐI</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Mã đồng hồ</label>
          <DongHoKhoi
            onChange={handleSelectChange}
            name='ma_dong_ho'            
          />
        </div>
        <div>
          <label htmlFor="">Chỉ số mới</label>
          <input required type="number" name='chi_so_moi' onChange={handleInputChange} value={ghiChiSo.chi_so_moi} />
        </div>
        <div>
          <button type="submit" className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Ghi chỉ số
          </button>
        </div>
      </form>
    </div>
  );
}