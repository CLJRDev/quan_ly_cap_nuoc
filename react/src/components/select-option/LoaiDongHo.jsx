import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function LoaiDongHo(props) {
  const [loaiDongHos, setLoaiDongHos] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_dong_ho`)
      .then(response => {
        setLoaiDongHos(response.data)
      })
  }, [])

  if (!loaiDongHos) return null

  const loaiDongHoOptions = []

  if (props.isSearch) {
    loaiDongHoOptions.push({
      value: 0,
      label: 'Tất cả'
    })
  }

  loaiDongHos.forEach(item => {
    loaiDongHoOptions.push({
      value: item.ma_loai_dong_ho,
      label: item.ten_loai_dong_ho
    })
  })

  return (
    <Select
      options={loaiDongHoOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value && props.value}
    />
  )
}