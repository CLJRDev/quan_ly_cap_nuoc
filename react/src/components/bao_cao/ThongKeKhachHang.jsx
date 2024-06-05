import TuyenDoc from "../select-option/TuyenDoc"
import Thang from "../select-option/Thang"
import Quy from "../select-option/Quy"
import Nam from "../select-option/Nam"
import { IoMdSearch } from "react-icons/io"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { TbTableExport } from "react-icons/tb";
import Paginate from "../layouts/Paginate"
import Sidebar from '../layouts/Sidebar'
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';

export default function ThongKeKhachHang() {
  const [baoCao, setBaoCao] = useState([])
  const [searchData, setSearchData] = useState({
    ma_tuyen: '',
    thang: '',
    nam_of_thang: '',
    quy: '',
    nam_of_quy: '',
    nam: ''
  })
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current
  })

  const baoCaoElements = baoCao.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_khach_hang}</td>
      <td>{item.ten_khach_hang}</td>
      <td>{item.can_cuoc}</td>
      <td>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(item.tong_cong)}</td>
    </tr>
  })

  const handleSelectChange = (option, e) => {
    const name = e.name
    setSearchData(pre => {
      return {
        ...pre,
        [name]: option.value
      }
    })
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % baoCao.length;
    setItemOffset(newOffset)
  }

  const layTuNgayCuaThang = (month, year) => {
    const date = new Date(year, month - 1, 1)
    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0')
    const formattedDay = date.getDate().toString().padStart(2, '0')
    return `${formattedYear}-${formattedMonth}-${formattedDay}`
  }

  const layDenNgayCuaThang = (month, year) => {
    const date = new Date(year, month, 0);
    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const layTuNgayCuaQuy = (quarter, year) => {
    const startMonth = (quarter - 1) * 3;
    const date = new Date(year, startMonth, 1);
    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const layDenNgayCuaQuy = (quarter, year) => {
    const endMonth = quarter * 3;
    const date = new Date(year, endMonth, 0);
    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const layTuNgayCuaNam = (year) => {
    const date = new Date(year, 0, 1);
    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const layDenNgayCuaNam = (year) => {
    const date = new Date(year, 11, 31);
    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const timKiem = async (e) => {
    const { thang, nam_of_thang, quy, nam_of_quy, nam, ma_tuyen } = searchData;
    let queryString = '?'
    if (ma_tuyen != '') {
      queryString += `ma_tuyen=${ma_tuyen}&`
    }
    if (thang != '' && nam_of_thang != '') {
      const tu_ngay = layTuNgayCuaThang(thang, nam_of_thang)
      const den_ngay = layDenNgayCuaThang(thang, nam_of_thang)
      queryString += `tu_ngay=${tu_ngay}&den_ngay=${den_ngay}`
    }
    if (quy !== '' && nam_of_quy !== '') {
      const tu_ngay = layTuNgayCuaQuy(quy, nam_of_quy);
      const den_ngay = layDenNgayCuaQuy(quy, nam_of_quy);
      queryString += `tu_ngay=${tu_ngay}&den_ngay=${den_ngay}`;
    }
    if (nam != '') {
      const tu_ngay = layTuNgayCuaNam(nam);
      const den_ngay = layDenNgayCuaNam(nam);
      queryString += `tu_ngay=${tu_ngay}&den_ngay=${den_ngay}`;
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/bc_kh_khu_vuc/${queryString}`)
    setBaoCao(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await timKiem()
  }

  return (
    <>
      <Sidebar />
      <div className='page'>
        <h2 className="title">Báo cáo thống kê khách hàng trong khu vực</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Tuyến đọc</label>
            <TuyenDoc
              name='ma_tuyen'
              onChange={handleSelectChange}
              isRequire={true}
            />
          </div>
          <div>
            <label htmlFor="">Tháng</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
              <Thang
                onChange={handleSelectChange}
                name='thang'
                isSearch={true}
              />
              <Nam
                onChange={handleSelectChange}
                name='nam_of_thang'
                isSearch={true}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Quý</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
              <Quy
                onChange={handleSelectChange}
                name='quy'
                isSearch={true}
              />
              <Nam
                onChange={handleSelectChange}
                name='nam_of_quy'
                isSearch={true}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Năm</label>
            <Nam
              onChange={handleSelectChange}
              name='nam'
              isSearch={true}
            />
          </div>
          <div>
            <button className="btn-search"><IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm</button>
            {/* <button className="btn-search" type="button" onClick={() => refresh()}><IoIosRefresh style={{ transform: 'scale(1.2)' }} />&nbsp;Làm mới</button> */}
          </div>
        </form>
        {baoCao.length > 0 && <div className="table-container animated fadeInDown" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div ref={printRef} style={{ width: '900px', backgroundColor: '#eee', padding: '10px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000' }}>
              <div>Công ty Cổ phần Cấp nước Hải Phòng</div>
              <div>Báo cáo thống kê khách hàng</div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '18px', margin: '10px 0', fontWeight: 'bold' }}>
              BẢNG BÁO CÁO DOANH THU KHÁCH HÀNG THEO KHU VỰC
            </div>
            <div style={{ margin: '15px 0' }}>
              <table>
                <thead>
                  <tr>
                    <th>Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Căn cước</th>
                    <th>Tổng tiền hóa đơn</th>
                  </tr>
                </thead>
                <tbody>
                  {baoCaoElements}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
              <div>Giám đốc</div>
              <div>Kế toán trưởng</div>
              <div>Người lập</div>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={handlePrint} className="btn-edit"><FaPrint style={{ transform: 'scale(1.2)' }} />&nbsp;Print</button>
          </div>
        </div>}
      </div>
    </>
  )
}
