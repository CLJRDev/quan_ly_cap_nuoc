import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"

export default function QuanHuyen() {
  const [quanHuyens, setQuanHuyens] = useState(null)
  const tenQuanHuyenRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/quan_huyen`)
      .then(response => {
        setQuanHuyens(response.data)
      })
  }

  if (!quanHuyens) return null

  const quanHuyenElements = quanHuyens.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_quan_huyen}</td>
      <td style={{textAlign: 'left'}}>{item.ten_quan_huyen}</td>
      <td>
        <Link className="btn-edit" to={`/quan_huyen/sua/${item.ma_quan_huyen}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaQuanHuyen(item.ma_quan_huyen)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoaQuanHuyen = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa quận huyện này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/quan_huyen/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchData()
      })
      .catch(error => {
        console.log(error.response.data.error)
      });
  }

  const themQuanHuyen = async () => {
    const formData = new FormData()
    formData.append('ten_quan_huyen', tenQuanHuyenRef.current.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/quan_huyen`, formData)
      console.log(response.data.message)
      fetchData()
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themQuanHuyen()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý danh mục quận huyện</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_quan_huyen">Tên quận huyện</label>
          <input type="text" id='ten_quan_huyen' ref={tenQuanHuyenRef} />
        </div>
        <div></div>
        <div>
          <button className="btn-add" type="submit">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm quận huyện
          </button>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách quận huyện</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Mã quận huyện</th>
              <th style={{textAlign: 'left'}}>Tên quận huyện</th>
              <th style={{ width: '150px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {quanHuyenElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}