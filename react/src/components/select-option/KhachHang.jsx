import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function KhachHang(props) {
  const [khachHangs, setKhachHangs] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/khach_hang`)
      .then(response => {
        setKhachHangs(response.data)
      })
  }, [])

  if (!khachHangs) return null

  const khachHangOptions = []

  if (props.isSearch) {
    khachHangOptions.push({
      value: 0,
      label: 'Tất cả'
    })
  }

  khachHangs.forEach(item => {
    khachHangOptions.push({
      value: item.ma_khach_hang,
      label: item.ma_khach_hang
    })
  })

  return (
    <Select
      options={khachHangOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value && props.value}
    />
  )
}