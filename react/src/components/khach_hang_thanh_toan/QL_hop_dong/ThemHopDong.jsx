import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import NhomGia from "../../select-option/NhomGia"
import KhachHang from "../../select-option/KhachHang"
import TuyenDoc from "../../select-option/TuyenDoc"
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Sidebar from '../../layouts/Sidebar'

export default function ThemHopDong() {
  const { can_cuoc } = useParams()
  const navigate = useNavigate()
  const [hopDong, setHopDong] = useState({
    can_cuoc: can_cuoc || '',
    ten_nguoi_dai_dien: '',
    chuc_vu_nguoi_dai_dien: '',
    ma_tuyen: '',
    ma_nhom_gia: '',
    dia_chi: '',
    ngay_lap: ''
  })
  const [khachHangInfo, setKhachHangInfo] = useState('Khách hàng không tồn tại!')
  const [isExist, setIsExist] = useState(false)

  useEffect(() => {
    if (can_cuoc) {
      axios.get(`http://127.0.0.1:8000/api/lookup_khach_hang?can_cuoc=${can_cuoc}`)
        .then(response => {
          setKhachHangInfo(response.data)
          setIsExist(true)
        })
        .catch(error => {
          setKhachHangInfo(error.response.data.error)
          setIsExist(false)
        })
    }
  }, [])

  const handleInputChange = async (e) => {
    const { name, value } = e.target

    if (name === 'can_cuoc') {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lookup_khach_hang?can_cuoc=${value}`)
        setKhachHangInfo(response.data)
        setIsExist(true)
      } catch (error) {
        setKhachHangInfo(error.response.data.error)
        setIsExist(false)
      }
    }

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
    if (!isExist) {
      WarningToast('Không tìm thấy khách hàng!')
      return
    }

    const formData = new FormData()
    formData.append('ma_khach_hang', khachHangInfo.ma_khach_hang)
    formData.append('ten_nguoi_dai_dien', hopDong.ten_nguoi_dai_dien)
    formData.append('chuc_vu_nguoi_dai_dien', hopDong.chuc_vu_nguoi_dai_dien)
    formData.append('ma_tuyen', hopDong.ma_tuyen)
    formData.append('ma_nhom_gia', hopDong.ma_nhom_gia)
    formData.append('dia_chi', hopDong.dia_chi)
    formData.append('ngay_lap', hopDong.ngay_lap)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/hop_dong`, formData)
      setTimeout(() => {
        SuccessToast(response.data.message)
      }, 500)
      navigate('/hop_dong')
    } catch (error) {
      const errorsArray = Object.values(error.response.data.error).flat();
      errorsArray.forEach(item => {
        WarningToast(item)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await them()
  }

  console.log(can_cuoc)

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Thêm hợp đồng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="can_cuoc">Căn cước công dân</label>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr', columnGap: '10px' }}>
              <input required type="text" id="can_cuoc" name='can_cuoc' onChange={handleInputChange} value={hopDong.can_cuoc} />
              <Popup
                trigger={<button className="btn-search" type="button"> <IoMdSearch style={{ transform: 'scale(1.2)' }} /> Kiểm tra</button>}
                position="right center"
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header"> Thông tin khách hàng </div>
                    <div className="content">
                      {isExist ? (
                        <>
                          Mã khách hàng: {khachHangInfo.ma_khach_hang} <br />
                          Tên khách hàng: {khachHangInfo.ten_khach_hang} <br />
                          Số điện thoại: {khachHangInfo.sdt} <br />
                          Email: {khachHangInfo.email} <br />
                        </>
                      ) : (
                        <>{khachHangInfo}</>
                      )}
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
          <div>
            <label htmlFor="ten_nguoi_dai_dien">Tên người đại diện</label>
            <input required type="text" id='ten_nguoi_dai_dien' name='ten_nguoi_dai_dien' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="chuc_vu_nguoi_dai_dien">Chức vụ người đại diện</label>
            <input required type="text" id='chuc_vu_nguoi_dai_dien' name='chuc_vu_nguoi_dai_dien' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Tuyến đọc</label>
            <TuyenDoc
              require={true}
              onChange={handleSelectChange}
              name="ma_tuyen"
            />
          </div>
          <div>
            <label htmlFor="">Nhóm giá</label>
            <NhomGia
              require={true}
              onChange={handleSelectChange}
              name="ma_nhom_gia"
            />
          </div>
          <div>
            <label htmlFor="dia_chi">Địa chỉ</label>
            <input required type="text" id='dia_chi' name='dia_chi' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ngay_lap">Ngày lập</label>
            <input required type="date" id='ngay_lap' name='ngay_lap' onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
              &nbsp; Thêm hợp đồng
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}