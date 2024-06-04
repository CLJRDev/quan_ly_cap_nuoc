import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { CgImport } from "react-icons/cg";
import { Link } from 'react-router-dom'
import { OutTable, ExcelRenderer } from 'react-excel-renderer'
import axios from 'axios'
import { useState, useEffect } from "react"
import Select from 'react-select'
import SuccessToast from '../../notification/SuccessToast'
import ErrorToast from '../../notification/ErrorToast'
import WarningToast from '../../notification/WarningToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginate from "../../layouts/Paginate"
import Sidebar from '../../layouts/Sidebar'

export default function ImportExcelKhachHang() {
  const [table, setTable] = useState([])

  const handleFileChange = event => {
    const file = event.target.files[0]
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        setTable(response.rows)
      }
    })
  }

  const khachHangElements = table.slice(1).map((item, index) => {
    return <tr key={index}>
      {item.map((col, icol) => {
        return <td key={icol}>{col}</td>
      })}
    </tr>
  })

  const handleClick = async () => {
    if (table.length == 0) {
      console.log('Chưa có dữ liệu khách hàng')
      return
    }
    const khachHangs = table.slice(1)
    for (let i = 0; i < khachHangs.length; i++) {
      const formData = new FormData()
      formData.append('ten_khach_hang', khachHangs[i][0])
      formData.append('can_cuoc', khachHangs[i][1])
      formData.append('dia_chi', khachHangs[i][2])
      formData.append('sdt', khachHangs[i][3])
      formData.append('email', khachHangs[i][4])

      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/khach_hang`, formData)
        SuccessToast(response.data.message)
      } catch (error) {
        console.log(error)
        const errorsArray = Object.values(error.response.data.error).flat();
        errorsArray.forEach(item => {
          WarningToast(`Khách hàng: ${khachHangs[i][0]} - ${item}`)
        })
      }
    }
  }

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className="title">Import dữ liệu khách hàng</h2>
        <div className="form-container">
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div></div>
          <div>
            <button onClick={() => handleClick()} className="btn-add"><CgImport style={{ transform: 'scale(1.2)' }} />&nbsp; Thêm dữ liệu khách hàng</button>
          </div>
        </div>
        <div className="table-container animated fadeInDown">
          <div className="title" style={{ marginBottom: '5px' }}>Danh sách khách hàng</div>
          <table>
            <thead>
              <tr>
                <th>Tên khách hàng</th>
                <th>Số CCCD</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {khachHangElements}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
