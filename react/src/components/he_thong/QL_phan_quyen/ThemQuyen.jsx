import axios from "axios"
import { useEffect, useState } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ThemQuyen() {
  const [quyens, setQuyens] = useState(null)
  const [quyen, setQuyen] = useState({
    ten_quyen: '',
    trang_thai: '1'
  })

  const fetchData = async() => {
    await axios.get(`http://127.0.0.1:8000/api/quyen`)
            .then(response => {
              setQuyens(response.data)
            })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!quyens) return null

  const xoaQuyen = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa quyền này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/quyen/${id}`)
      .then(response => {
        console.log(response.data.message);
        setQuyens(quyens.filter(quyen => {
          return quyen.ma_quyen != id;
        }));
      })
      .catch(error => {

      });
  }

  const quyenElements = quyens.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_quyen}</td>
      <td>{item.ten_quyen}</td>
      <td>{item.trang_thai == 1 ? 'Kích hoạt' : 'Khóa'}</td>
      <td>
        <Link className="btn-edit" to={`/quyen/sua/${item.ma_quyen}`}>Sửa</Link>
        &nbsp;
        <button onClick={() => xoaQuyen(item.ma_quyen)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setQuyen(preQuyen => {
      return {
        ...preQuyen,
        [name]: value
      }
    })
  }

  const themQuyen = async () => {
    const formData = new FormData()
    formData.append('ten_quyen', quyen.ten_quyen)
    formData.append('trang_thai', quyen.trang_thai)

    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/quyen`, formData)
      console.log(response.data.message)
      fetchData()
    }catch(error){
      console.log(error.response.data.error)
    }    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themQuyen()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý quyền</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_quyen">Tên quyền</label>
          <input type="text" id='ten_quyen' name='ten_quyen' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="trang_thai">Trạng thái</label>
          <select name="trang_thai" id="trang_thai" onChange={handleChange} value={quyen.trang_thai}>
            <option value="1">Kích hoạt</option>
            <option value="0">Khóa</option>
          </select>
        </div>
        <div>
          <button className="btn-add" type="submit">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm quyền
          </button>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách quyền</div>
        <table>
          <thead>
            <tr>
              <th>Mã quyền</th>
              <th>Tên quyền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {quyenElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}