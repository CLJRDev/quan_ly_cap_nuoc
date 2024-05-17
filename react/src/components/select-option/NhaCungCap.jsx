import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function NhaCungCap(props) {
  const [nhaCungCaps, setNhaCungCaps] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/nha_cung_cap`)
      .then(response => {
        setNhaCungCaps(response.data)
      })
  }, [])

  if (!nhaCungCaps) return null

  const nhaCungCapOptions = []

  if (props.isSearch) {
    nhaCungCapOptions.push({
      value: 0,
      label: 'Tất cả'
    })
  }

  nhaCungCaps.forEach(item => {
    nhaCungCapOptions.push({
      value: item.ma_nha_cung_cap,
      label: item.ten_nha_cung_cap
    })
  })

  return (
    <Select
      options={nhaCungCapOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value && props.value}
    />
  )
}