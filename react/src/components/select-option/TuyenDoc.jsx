import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function TuyenDoc(props) {
  const [tuyenDocs, setTuyenDocs] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tuyen_doc`)
      .then(response => {
        setTuyenDocs(response.data)
      })
  }, [])

  if (!tuyenDocs) return null

  const tuyenDocOptions = []

  if (props.isSearch) {
    tuyenDocOptions.push({
      value: 0,
      label: 'Tất cả'
    })
  }

  tuyenDocs.forEach(item => {
    tuyenDocOptions.push({
      value: item.ma_tuyen,
      label: item.ten_tuyen
    })
  })

  return (
    <Select
      options={tuyenDocOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value && props.value}
    />
  )
}