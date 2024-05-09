import axios from "axios"
import { useState, useEffect } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"
import Select from 'react-select'

export default function TuyenDoc() {
  const [tuyenDocs, setTuyenDocs] = useState(null)
  const [toQuanLys, setToQuanLys] = useState(null)
  const [phuongXas, setPhuongXas] = useState(null)
  const [tuyenDocData, setTuyenDocData] = useState({
    tuyen_doc: '',
    to_quan_ly: '',
    phuong_xa: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/api/tuyen_doc`)
      .then(response => {
        setTuyenDocs(response.data)
      })
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/to_quan_ly`)
      .then(response => {
        setToQuanLys(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/phuong_xa`)
      .then(response => {
        setPhuongXas(response.data)
      })
  }, [])

  if (!tuyenDocs) return null
  if (!toQuanLys) return null
  if (!phuongXas) return null

  const toQuanLyOptions = []
  const phuongXaOptions = []

  toQuanLys.forEach(item => {
    toQuanLyOptions.push({
      value: item.ma_to_quan_ly,
      label: item.ten_to_quan_ly
    })
  })

  phuongXas.forEach(item => {
    phuongXaOptions.push({
      value: item.ma_phuong_xa,
      label: item.ten_phuong_xa
    })
  })

  const handleSelectChange = (selectedOption, event) => {
    setTuyenDocData(pre => {
      return {
        ...pre,
        [event.name]: selectedOption
      }
    })
  }

  const handleInputChange = (e) => {
    setTuyenDocData(pre => {
      return {
        ...pre,
        [e.target.name]: e.target.value
      }
    })
  }

  const xoaTuyenDoc = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tuyến đọc này?'))
      return
    axios.delete(`http://127.0.0.1:8000/api/tuyen_doc/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchData()
      })
      .catch(error => {
        console.log(error.response.data.error)
      });
  }

  const tuyenDocElements = tuyenDocs.map((item, index) => {
    return <tr key={index}>
      <td>{item.ma_tuyen}</td>
      <td>{item.ten_tuyen}</td>
      <td>{item.ten_phuong_xa}</td>
      <td>{item.ten_to_quan_ly}</td>
      <td>
        <Link className="btn-edit" to={`/tuyen_doc/sua/${item.ma_tuyen}`}>Sửa</Link>&nbsp;
        <button onClick={() => xoaTuyenDoc(item.ma_tuyen)} className="btn-delete">Xóa</button>
      </td>
    </tr>
  })
  const themTuyenDoc = async () => {
    const formData = new FormData()
    formData.append('ten_tuyen', tuyenDocData.tuyen_doc)
    formData.append('ma_to_quan_ly', tuyenDocData.to_quan_ly.value)
    formData.append('ma_phuong_xa', tuyenDocData.phuong_xa.value)

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tuyen_doc`, formData)
      console.log(response.data.message)
      fetchData()
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await themTuyenDoc()
  }

  return (
    <div className="page">
      <h2 className="title">Quản lý danh mục tuyến đọc</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tuyen_doc">Tên tuyến đọc</label>
          <input type="text" id="tuyen_doc" name='tuyen_doc' onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="chi_nhanh">Tổ quản lý</label>
          <Select
            onChange={handleSelectChange}
            options={toQuanLyOptions}
            name="to_quan_ly"
          />
        </div>
        <div>
          <label htmlFor="chi_nhanh">Phường xã</label>
          <Select
            onChange={handleSelectChange}
            options={phuongXaOptions}
            name="phuong_xa"
          />
        </div>
        <div></div>
        <div>
          <button type="submit" className="btn-add">
            <IoIosAddCircleOutline style={{ transform: 'scale(1.2)' }} />
            &nbsp;Thêm tuyến đọc
          </button>
        </div>
      </form>
      <div className="table-container animated fadeInDown">
        <div className="title" style={{ marginBottom: '5px' }}>Danh sách tuyến đọc</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Mã tuyến đọc</th>
              <th>Tuyến đọc</th>
              <th>Phường xã</th>
              <th>Tổ quản lý</th>
              <th style={{ width: '150px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tuyenDocElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}