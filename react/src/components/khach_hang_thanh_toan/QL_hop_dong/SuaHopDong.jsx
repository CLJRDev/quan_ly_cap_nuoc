import { MdOutlineEdit } from "react-icons/md";
import { IoMdSearch } from "react-icons/io"
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

export default function SuaHopDong() {
  const { id, ma_dong_ho, ma_hoa_don } = useParams()
  const navigate = useNavigate()
  const [hopDong, setHopDong] = useState({
    ten_nguoi_dai_dien: '',
    chuc_vu_nguoi_dai_dien: '',
    dia_chi_hop_dong: '',
    ngay_lap: '',
    can_cuoc: ''
  })
  const [khachHangInfo, setKhachHangInfo] = useState('Khách hàng không tồn tại!')
  const [isExist, setIsExist] = useState(true)
  const [selectedOptions, setSelectedOptions] = useState({
    nhom_gia: {},
    tuyen_doc: {}
  })

  useEffect(() => {
    if (ma_dong_ho) {
      axios.get(`http://127.0.0.1:8000/api/lookup_dh_hop_dong?ma_dong_ho=${ma_dong_ho}`)
        .then(response => {
          setHopDong(response.data)
          setSelectedOptions({
            nhom_gia: { value: response.data.ma_nhom_gia, label: response.data.ten_nhom_gia },
            tuyen_doc: { value: response.data.ma_tuyen, label: response.data.ten_tuyen }
          })
        })
    } else {
      axios.get(`http://127.0.0.1:8000/api/hop_dong/${id}`)
        .then(response => {
          setHopDong(response.data)
          setSelectedOptions({
            nhom_gia: { value: response.data.ma_nhom_gia, label: response.data.ten_nhom_gia },
            tuyen_doc: { value: response.data.ma_tuyen, label: response.data.ten_tuyen }
          })
        })
    }
  }, [])

  useEffect(() => {
    if (hopDong.can_cuoc) {
      axios.get(`http://127.0.0.1:8000/api/lookup_khach_hang?can_cuoc=${hopDong.can_cuoc}`)
        .then(response => {
          setKhachHangInfo(response.data)
          setIsExist(true)
        })
        .catch(error => {
          setKhachHangInfo(error.response.data.error)
          setIsExist(false)
        })
    }
  })

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
    setSelectedOptions(pre => {
      return {
        ...pre,
        [name]: option
      }
    })
  }

  const sua = async () => {
    if (!isExist) {
      WarningToast('Không tìm thấy khách hàng!')
      return
    }

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ma_khach_hang', khachHangInfo.ma_khach_hang)
    formData.append('ten_nguoi_dai_dien', hopDong.ten_nguoi_dai_dien)
    formData.append('chuc_vu_nguoi_dai_dien', hopDong.chuc_vu_nguoi_dai_dien)
    formData.append('ma_tuyen', selectedOptions.tuyen_doc.value)
    formData.append('ma_nhom_gia', selectedOptions.nhom_gia.value)
    formData.append('dia_chi', hopDong.dia_chi_hop_dong)
    formData.append('ngay_lap', hopDong.ngay_lap)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/hop_dong/${id}`, formData)
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
    await sua()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Sửa hợp đồng</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="can_cuoc">Căn cước công dân</label>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr', columnGap: '10px' }}>
              <input required type="text" id="can_cuoc" name='can_cuoc' value={hopDong.can_cuoc} onChange={handleInputChange} />
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
            <input value={hopDong.ten_nguoi_dai_dien} required type="text" id='ten_nguoi_dai_dien' name='ten_nguoi_dai_dien' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="chuc_vu_nguoi_dai_dien">Chức vụ người đại diện</label>
            <input value={hopDong.chuc_vu_nguoi_dai_dien} required type="text" id='chuc_vu_nguoi_dai_dien' name='chuc_vu_nguoi_dai_dien' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Tuyến đọc</label>
            <TuyenDoc
              require={true}
              onChange={handleSelectChange}
              name="tuyen_doc"
              value={selectedOptions.tuyen_doc}
            />
          </div>
          <div>
            <label htmlFor="">Nhóm giá</label>
            <NhomGia
              require={true}
              onChange={handleSelectChange}
              name="nhom_gia"
              value={selectedOptions.nhom_gia}
            />
          </div>
          <div>
            <label htmlFor="dia_chi_hop_dong">Địa chỉ</label>
            <input value={hopDong.dia_chi_hop_dong} required type="text" id='dia_chi_hop_dong' name='dia_chi_hop_dong' onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="ngay_lap">Ngày lập</label>
            <input value={hopDong.ngay_lap} required type="date" id='ngay_lap' name='ngay_lap' onChange={handleInputChange} />
          </div>
          <div></div>
          <div>
            <button type="submit" className="btn-add">
              <MdOutlineEdit style={{ transform: 'scale(1.2)' }} />
              &nbsp; Sửa hợp đồng
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}