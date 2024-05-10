import { Link } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from "react"
import { IoMdSearch } from "react-icons/io"
import { IoIosAddCircleOutline } from "react-icons/io"
import { TbSubtask } from "react-icons/tb";

export default function QuanLyPhanQuyen() {
  const [phanQuyens, setPhanQuyens] = useState(null)
  const [searchData, setSearchData] = useState({
    ma_quyen: '',
    ten_quyen: '',
    ma_nhan_vien: '',
    ho_ten: ''
  })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/phan_quyen`)
      .then(response => {
        setPhanQuyens(response.data)
      })
  }, [])

  if (!phanQuyens) return null

  const phanQuyenElements = phanQuyens.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_quyen}</td>
      <td>{item.ten_quyen}</td>
      <td>{item.ma_nhan_vien}</td>
      <td>{item.ho_ten}</td>
      <td>{item.chuc_vu}</td>
      <td>
        <Link className="btn-edit" to={`/quan_ly_phan_quyen/sua/${item.ma_phan_quyen}`}>Sửa</Link>&nbsp;
        <button className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchData(preData => {
      return {
        ...preData,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { ma_quyen, ten_quyen, ma_nhan_vien, ho_ten } = searchData
    let queryString = '?'
    if (ma_quyen != '') {
      queryString += `ma_quyen=${ma_quyen}`
    }
    if (ten_quyen != '') {
      queryString += `&ten_quyen=${ten_quyen}`
    }
    if (ma_nhan_vien != '') {
      queryString += `&ma_nhan_vien=${ma_nhan_vien}`
    }
    if (ho_ten != '') {
      queryString += `&ho_ten=${ho_ten}`
    }
    const response = await axios.get(`http://127.0.0.1:8000/api/phan_quyen_search${queryString}`)
    setPhanQuyens(response.data)
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý phân quyền</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ma_quyen">Mã quyền</label>
          <input type="number" name='ma_quyen' id='ma_quyen' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ten_quyen">Tên quyền</label>
          <input type="text" name='ten_quyen' id='ten_quyen' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ma_nhan_vien">Mã nhân viên</label>
          <input type="number" name='ma_nhan_vien' id='ma_nhan_vien' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ho_ten">Họ tên nhân viên</label>
          <input type="text" name='ho_ten' id='ho_ten' onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className="btn-search">
            <IoMdSearch style={{ transform: 'scale(1.2)' }} />&nbsp;
            Tìm kiếm
          </button>
          &nbsp;
          <Link className="btn-add" to='/quan_ly_phan_quyen/them'>&nbsp;
            <TbSubtask style={{ transform: 'scale(1.2)' }}/>&nbsp;
            Phân quyền
          </Link>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách phân quyền</div>
        <table>
          <thead>
            <tr>
              <th>Mã quyền</th>
              <th>Tên quyền</th>
              <th>Mã nhân viên</th>
              <th>Họ tên nhân viên</th>
              <th>Chức vụ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {phanQuyenElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}