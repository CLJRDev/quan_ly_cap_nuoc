import logo from '../../../assets/logo.png'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import { format, isValid } from 'date-fns'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../layouts/Sidebar'

export default function XemHoaDon() {
  const { id } = useParams()
  const [hoaDon, setHoaDon] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/hoa_don/${id}`)
      .then(response => {
        setHoaDon(response.data)
      })
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, 'dd-MM-yyyy') : 'Invalid date';
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Chi tiết hóa đơn</h2>
        <div className="invoice-container">
          <div className="invoice-wrapper">
            <div className="invoice-header">
              <img src={logo} className='logo-invoice' />
              <div style={{ padding: '0 2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '5px' }}>
                  <h3 className='company-name'>Công ty cổ phần cấp nước hải phòng</h3>
                  <h4 className='company-name'>Hai phong water joint stock company</h4>
                </div>
                <div>
                  <p style={{ textWrap: 'nowrap' }}>
                    Địa chỉ: Số 54 Đinh Tiên Hoàng - Phường Hoàng Văn Thụ, Quận Hồng Bàng, TP Hải Phòng <br />
                    Mã số thuế: <strong>0200171274</strong> <br />
                    Số tài khoản: 1120 0000 9342 Ngân hàng TMCP Công thương Việt Nam - CN Hải Phòng <br />
                    Website: www.capnuochaiphong.com.vn &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E-mail: cnhp@vnn.vn <br />
                    Trung tâm hỗ trợ khách hàng - Call Center &nbsp;&nbsp;&nbsp;<strong>Tel 0225 3 51 58 58</strong> - Fax: 0225 3 823 748
                  </p>
                </div>
              </div>
            </div>
            <div className="invoice-content">
              <div className='invoice-info'>
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 150px' }}>
                  <div></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 className='company-name' style={{ color: 'red' }}>Hóa đơn giá trị gia tăng tiền nước</h3>
                    <p style={{ fontStyle: 'italic' }}>{`Ngày 20 tháng 10 năm 2024`}</p>
                  </div>
                  <div>
                    Số HĐ: 0000{hoaDon.ma_hop_dong}
                  </div>
                </div>
                <div>
                  <p style={{ lineHeight: '25px' }}>
                    Tên khách hàng: {hoaDon.ten_khach_hang}<br />
                    Địa chỉ: {hoaDon.dia_chi}<br />
                    Địa chỉ điểm dùng nước: {hoaDon.dia_chi}<br />
                    Số điện thoại: {hoaDon.sdt}<br />
                    Mã khách hàng: 0000{hoaDon.ma_khach_hang}
                  </p>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
                    <tbody>
                      <tr>
                        <td className='column-invoice-info'>Kỳ hóa đơn: {hoaDon.ky_hoa_don}</td>
                        <td className='column-invoice-info'>Từ ngày: {formatDate(hoaDon.tu_ngay)}</td>
                        <td className='column-invoice-info'>Chỉ số cũ: {hoaDon.chi_so_cu}</td>
                        <td className='column-invoice-info'>Tuyến: 0000{hoaDon.ma_tuyen}</td>
                      </tr>
                      <tr>
                        <td className='column-invoice-info'>Mã hóa đơn: {hoaDon.ma_hoa_don}</td>
                        <td className='column-invoice-info'>Đến ngày: {formatDate(hoaDon.den_ngay)}</td>
                        <td className='column-invoice-info'>Chỉ số mới: {hoaDon.chi_so_moi}</td>
                        <td className='column-invoice-info'>Số m³ tiêu thụ: {hoaDon.so_tieu_thu}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='invoice-table'>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <tbody>
                    <tr>
                      <td className='column-invoice-table' style={{ width: '50px' }}>STT</td>
                      <td className='column-invoice-table' style={{ width: '200px' }}>Tên hàng hóa, dịch vụ</td>
                      <td className='column-invoice-table' style={{ width: '80px' }}>Số lượng (m³)</td>
                      <td className='column-invoice-table' style={{ width: '100px' }}>Đơn giá (đ/m³)</td>
                      <td className='column-invoice-table' style={{ width: '120px' }}>Thành tiền chưa có thuế GTGT (đ)</td>
                      <td className='column-invoice-table' style={{ width: '80px' }}>Thuế suất GTGT (%)</td>
                      <td className='column-invoice-table' style={{ width: '100px' }}>Tiền thuế GTGT (đ)</td>
                      <td className='column-invoice-table' style={{ width: '100px' }}>Thành tiền có thuế GTGT(đ)</td>
                    </tr>
                    <tr>
                      <td className='column-invoice-table'>1</td>
                      <td className='column-invoice-table'>Nước tiêu thụ</td>
                      <td className='column-invoice-table'>{hoaDon.so_tieu_thu}</td>
                      <td className='column-invoice-table'>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(hoaDon.gia_ban)}</td>
                      <td className='column-invoice-table'>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(hoaDon.tong_tien_truoc_thue)}</td>
                      <td className='column-invoice-table'>{hoaDon.hs_thue * 100}</td>
                      <td className='column-invoice-table'>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(hoaDon.tong_tien_thue)}</td>
                      <td className='column-invoice-table'>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(hoaDon.tong_cong)}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left', borderRight: 'none' }} colSpan="7" className='column-invoice-table'>Tổng tiền chưa có thuế GTGT:</td>
                      <td style={{ textAlign: 'right', borderLeft: 'none' }} colSpan="1" className='column-invoice-table'>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(hoaDon.tong_tien_truoc_thue)}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left', borderRight: 'none' }} colSpan="7" className='column-invoice-table'>Tổng tiền thuế GTGT:</td>
                      <td style={{ textAlign: 'right', borderLeft: 'none' }} colSpan="1" className='column-invoice-table'>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(hoaDon.tong_tien_thue)}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left', borderRight: 'none', color: 'red' }} colSpan="7" className='column-invoice-table'><strong>Tổng cộng:</strong></td>
                      <td style={{ textAlign: 'right', borderLeft: 'none' }} colSpan="1" className='column-invoice-table'><strong>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(hoaDon.tong_cong)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <p><strong>Ký bởi: Công ty cổ phần cấp nước Hải Phòng</strong></p>
              <p><strong>Ký ngày: </strong></p>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
