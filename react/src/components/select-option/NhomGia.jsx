import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function NhomGia(props) {
  const [nhomGias, setNhomGias] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/nhom_gia`)
      .then(response => {
        setNhomGias(response.data)
      })
  }, [])

  if (!nhomGias) return null

  const nhomGiaOptions = []

  if (props.isSearch) {
    nhomGiaOptions.push({
      value: 0,
      label: 'Tất cả'
    })
  }

  nhomGias.forEach(item => {
    nhomGiaOptions.push({
      value: item.ma_nhom_gia,
      label: item.ten_nhom_gia
    })
  })

  return (
    <Select
      options={nhomGiaOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value && props.value}
    />
  )
}