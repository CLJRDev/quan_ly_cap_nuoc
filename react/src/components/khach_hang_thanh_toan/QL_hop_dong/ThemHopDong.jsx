import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'

export default function ThemHopDong() {
  const [nhomGias, setNhomGias] = useState(null)
  const [khachHangs, setKhachHangs] = useState(null)
  const [dongHos, setDongHos] = useState(null)
  const [hopDong, setHopDong] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/nhom_gia`)
      .then(response => {
        setNhomGias(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/khach_hang`)
      .then(response => {
        setKhachHangs(response.data)
      })
  }, [])

  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8000/api/dong_ho_khach`)
  //     .then(response => {
  //       setDongHos(response.data)
  //     })
  // }, [])

  if (!nhomGias) return null
  if (!khachHangs) return null

  const nhomGiaOption = []
  const khachHangOption = []

  nhomGias.forEach(item => {
    nhomGiaOption.push({
      value: item.ma_nhom_gia,
      label: item.ten_nhom_gia
    })
  })

  khachHangs.forEach(item => {
    khachHangOption.push({
      value: item.ma_khach_hang,
      label: item.ma_khach_hang
    })
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setHopDong(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const handleSelectChange = (option, e) => {
    const name = e.name
    setHopDong(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    })
  }

  const them = async () => {
    const formData = new FormData()
    formData.append('ma_khach_hang', hopDong.ma_khach_hang)
    formData.append('ten_nguoi_dai_dien', hopDong.ten_nguoi_dai_dien)
    formData.append('chuc_vu_nguoi_dai_dien', hopDong.chuc_vu_nguoi_dai_dien)
    formData.append('ma_dong_ho', hopDong.ma_dong_ho)
    formData.append('ma_nhom_gia', hopDong.ma_nhom_gia)
    formData.append('dia_chi', hopDong.dia_chi)
    formData.append('ngay_lap', hopDong.ngay_lap)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/hop_dong`, formData)
      console.log(response.data.message)
      navigate('/hop_dong')
    } catch (error) {
      console.log(error.message.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await them()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý hợp đồng</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Mã khách hàng</label>
          <Select
            options={khachHangOption}
            onChange={handleSelectChange}
            name="ma_khach_hang"
          />
        </div>
        <div>
          <label htmlFor="ten_nguoi_dai_dien">Tên người đại diện</label>
          <input type="text" id='ten_nguoi_dai_dien' name='ten_nguoi_dai_dien' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="chuc_vu_nguoi_dai_dien">Chức vụ người đại diện</label>
          <input type="text" id='chuc_vu_nguoi_dai_dien' name='chuc_vu_nguoi_dai_dien' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="">Mã đồng hồ</label>
          <Select
            options={nhomGiaOption}
            onChange={handleSelectChange}
            name="ma_dong_ho"
          />
        </div>
        <div>
          <label htmlFor="">Nhóm giá</label>
          <Select
            options={nhomGiaOption}
            onChange={handleSelectChange}
            name="ma_nhom_gia"
          />
        </div>
        <div>
          <label htmlFor="dia_chi">Địa chỉ</label>
          <input type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="ngay_lap">Ngày lập</label>
          <input type="date" id='ngay_lap' name='ngay_lap' onChange={handleInputChange} />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp; Thêm hợp đồng
          </button>
        </div>
      </form>
    </div>
  )
}