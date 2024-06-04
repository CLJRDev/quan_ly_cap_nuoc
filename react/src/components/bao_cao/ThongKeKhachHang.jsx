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
import PDFfile from "./PDFfile"

export default function ThongKeKhachHang() {

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
    const response = await axios.get(`http://127.0.0.1:8000/api//${queryString}`)
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
          <Link className="btn-edit" to='/xem_thong_ke_khach_hang'>Xem PDF</Link>
        </div>
      </div>
    </>
  )
}
