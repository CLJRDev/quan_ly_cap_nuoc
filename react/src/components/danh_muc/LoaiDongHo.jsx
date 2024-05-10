import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"

export default function LoaiDongHo() {
  const [loaiDongHos, setLoaiDongHos] = useState(null)
  const tenLoaiDongHoRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/loai_dong_ho`)
      .then(response => {
        setLoaiDongHos(response.data)
      })
  }

  if (!loaiDongHos) return null

  const loaiDongHoElements = loaiDongHos.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_loai_dong_ho}</td>
      <td style={{ textAlign: 'left' }}>{item.ten_loai_dong_ho}</td>
      <td>
        <Link className="btn-edit" to={`/loai_dong_ho/sua/${item.ma_loai_dong_ho}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaLoaiDongHo(item.ma_loai_dong_ho)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })

  const xoaLoaiDongHo = id => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa loại đồng hồ này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/loai_dong_ho/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchData()
      })
      .catch(error => {
        console.log(error.response.data.error)
      });
  }

  const themLoaiDongHo = async () => {
    const formData = new FormData()
    formData.append('ten_loai_dong_ho', tenLoaiDongHoRef.current.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/loai_dong_ho`, formData)
      console.log(response.data.message)
      fetchData()
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themLoaiDongHo()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý danh mục loại đồng hồ</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ten_loai_dong_ho">Tên loại đồng hồ</label>
          <input type="text" id='ten_loai_dong_ho' ref={tenLoaiDongHoRef} />
        </div>
        <div></div>
        <div>
          <button className="btn-add" type="submit">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm loại đồng hồ
          </button>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách loại đồng hồ</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Mã loại ĐH</th>
              <th style={{ textAlign: 'left' }}>Tên loại đồng hồ</th>
              <th style={{ width: '150px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loaiDongHoElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}