import React, { useEffect, useState } from 'react'
import Sidebar from '../../layouts/Sidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function CapNhapGiaNuoc() {
  const [lichSu, setLichSu] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/index_ls_nhom_gia`)
      .then(response => {
        setLichSu(response.data)
      })
  }, [])

  const giaElements = lichSu.map((item, index) => {
    return <tr key={index}>
      <td style={{ width: '300px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.ten_nhom_gia}</td>
      <td>{item.ten_loai_khach_hang}</td>
      <td>{!item.hs_duoi_10m ? '0' : item.hs_duoi_10m}</td>
      <td>{!item.hs_tu_10m_den_20m ? '0' : item.hs_tu_10m_den_20m}</td>
      <td>{!item.hs_tu_20m_den_30m ? '0' : item.hs_tu_20m_den_30m}</td>
      <td>{!item.hs_tren_30m ? '0' : item.hs_tren_30m}</td>
      <td>{!item.hs_rieng ? '0' : item.hs_rieng}</td>
      <td>{item.hs_thue}</td>
      <td>{item.gia_ban}</td>
      <td>{item.tu_ngay}</td>
      <td>{item.den_ngay}</td>
    </tr>
  })

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Cập nhập nhóm giá</h2>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Lịch sử nhóm giá: {id}</div>
          <table>
            <thead>
              <tr>
                <th>Tên nhóm giá</th>
                <th>Loại khách hàng</th>
                <th>HS dưới 10m³</th>
                <th>HS 10m³ đến 20m³</th>
                <th>HS 20m³ đến 30m³</th>
                <th>HS trên 30m³</th>
                <th>HS riêng</th>
                <th>HS thuế</th>
                <th>Giá bán</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
              </tr>
            </thead>
            <tbody>
              {giaElements}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
