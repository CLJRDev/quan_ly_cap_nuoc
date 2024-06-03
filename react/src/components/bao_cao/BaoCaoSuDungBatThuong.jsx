import LoaiKhachHang from "../select-option/LoaiKhachHang"
import Thang from "../select-option/Thang"
import Nam from "../select-option/Nam"
import { IoMdSearch } from "react-icons/io"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { TbTableExport } from "react-icons/tb";
import Paginate from "../layouts/Paginate"
import Sidebar from '../layouts/Sidebar'

export default function BaoCaoSuDungBatThuong() {
  const [baoCao, setBaoCao] = useState([])
  const [searchData, setSearchData] = useState({
    thang: '',
    nam: '',
    ma_loai_khach_hang: ''
  })
  const tableRef = useRef(null)

  //Paginate
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = baoCao.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(baoCao.length / itemsPerPage);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/bc_bat_thuong`)
      .then(response => {
        setBaoCao(response.data)
      })
  }

  const baoCaoElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_hop_dong}</td>
      <td>{item.ten_khach_hang}</td>
      <td>{item.ten_loai_khach_hang}</td>
      <td>{item.ky_hoa_don}</td>
      <td>{item.avg_so_tieu_thu}</td>
      <td>{item.so_tieu_thu}</td>
      <td>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(item.tong_cong)}</td>
      <td>
        <Link className="btn-edit" to={`/xem_hop_dong_from_hoa_don/${item.ma_hop_dong}`}>Hợp đồng</Link>&nbsp;
        <Link className="btn-edit" to={`/xem_khach_hang_from_bao_cao/${item.ma_khach_hang}`}>Khách hàng</Link>
      </td>
    </tr>
  })

  const baoCaoCloneElements = baoCao.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_hop_dong}</td>
      <td>{item.ten_khach_hang}</td>
      <td>{item.ten_loai_khach_hang}</td>
      <td>{item.ky_hoa_don}</td>
      <td>{item.avg_so_tieu_thu}</td>
      <td>{item.so_tieu_thu}</td>
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

  const timKiem = async (e) => {
    // const { thang, nam, ma_loai_khach_hang } = searchData;
    // let queryString = '?'
    // if (thang != '' && nam != '') {
    //   queryString += `ky_hoa_don=T${thang} - ${nam}&`
    // }
    // if (ma_loai_khach_hang != '') {
    //   queryString += `ma_loai_khach_hang=${ma_loai_khach_hang}`
    // }
    // const response = await axios.get(`http://127.0.0.1:8000/api/bc_kh_chua_dong/${queryString}`)
    // setBaoCao(response.data)
  }

  const handleSubmit = async (e) => {
    // e.preventDefault()
    // await timKiem()
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Báo cáo thống kê sử dụng bất thường</h2>
        {/* <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <button className="btn-search"><IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm</button>
        </div>
      </form> */}
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách hợp đồng sử dụng bất thường</div>
          <table>
            <thead>
              <tr>
                <th>Mã hợp đồng</th>
                <th>Tên khách hàng</th>
                <th>Loại khách hàng</th>
                <th>Kỳ hóa đơn</th>
                <th>Mức tiêu thụ hàng tháng</th>
                <th>Số tiêu thụ kỳ gần nhất</th>
                <th>Tổng tiền</th>
                <th style={{ width: '150px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {baoCaoElements}
            </tbody>
          </table>
          {/* Table to export excel */}
          <table style={{ display: 'none' }} ref={tableRef}>
            <thead>
              <tr>
                <th>Mã hợp đồng</th>
                <th>Tên khách hàng</th>
                <th>Loại khách hàng</th>
                <th>Kỳ hóa đơn</th>
                <th>Mức tiêu thụ hàng tháng</th>
                <th>Số tiêu thụ kỳ gần nhất</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {baoCaoCloneElements}
            </tbody>
          </table>
          <Paginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <DownloadTableExcel
              filename="bao_cao_su_dung_bat_thuong"
              sheet="Báo cáo sử dụng bất thường"
              currentTableRef={tableRef.current}
            >
              <button type="button" className="btn-export">
                <TbTableExport style={{ transform: 'scale(1.2)' }} />&nbsp; Xuất file Excel
              </button>
            </DownloadTableExcel>
          </div>
        </div>
      </div>
    </>
  )
}
