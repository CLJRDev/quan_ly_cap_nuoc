import TuyenDoc from "../select-option/TuyenDoc"
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

export default function BaoCaoThuTien() {
  const [baoCao, setBaoCao] = useState([])
  const [searchData, setSearchData] = useState({
    thang: '',
    nam: '',
    ma_tuyen: ''
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
    axios.get(`http://127.0.0.1:8000/api/bc_thu_tien`)
      .then(response => {
        setBaoCao(response.data)
      })
  }

  const baoCaoElements = currentItems.map((item, index) => {
    return <tr key={index}>
      <td>{item.ky_hoa_don}</td>
      <td>{item.ten_tuyen}</td>
      <td>{new Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(item.tong_cong)}</td>
      <td>
        <button className="btn-edit">...</button>&nbsp;
        <button className="btn-edit">...</button>
      </td>
    </tr>
  })

  const baoCaoCloneElements = baoCao.map((item, index) => {
    return <tr key={index}>
      <td>{item.ky_hoa_don}</td>
      <td>{item.ten_tuyen}</td>
      <td>{item.tong_cong}</td>
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
    const { thang, nam, ma_tuyen } = searchData;
    let queryString = '?'
    if (thang != '' && nam != '') {
      queryString += `ky_hoa_don=T${thang} - ${nam}&`
    }
    if (ma_tuyen != '') {
      queryString += `ma_tuyen=${ma_tuyen}`
    }
    console.log(queryString)
    const response = await axios.get(`http://127.0.0.1:8000/api/bc_thu_tien/${queryString}`)
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
        <h2 className="title">Báo cáo thống kê quản lý thu tiền</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Kỳ hóa đơn</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
              <Thang
                onChange={handleSelectChange}
                name='thang'
                isSearch={true}
              />
              <Nam
                onChange={handleSelectChange}
                name='nam'
                isSearch={true}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Tuyến đọc</label>
            <TuyenDoc
              isSearch={true}
              name='ma_tuyen'
              onChange={handleSelectChange}
            />
          </div>
          <div>
            <button className="btn-search"><IoMdSearch style={{ transform: 'scale(1.2)' }} />
              &nbsp; Tìm kiếm</button>
          </div>
        </form>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách thống kê thất thoát nước</div>
          <table>
            <thead>
              <tr>
                <th>Kỳ hóa đơn</th>
                <th>Tuyến đọc</th>
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
                <th>Kỳ hóa đơn</th>
                <th>Tuyến đọc</th>
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
              filename="bao_cao_thu_tien"
              sheet="Báo cáo thu tiền"
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
