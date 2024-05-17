import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function CoDongHo(props) {
  const [coDongHos, setCoDongHos] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/co_dong_ho`)
      .then(response => {
        setCoDongHos(response.data)
      })
  }, [])

  if (!coDongHos) return null

  const coDongHoOptions = []

  if (props.isSearch) {
    coDongHoOptions.push({
      value: 0,
      label: 'Tất cả'
    })
  }

  coDongHos.forEach(item => {
    coDongHoOptions.push({
      value: item.ma_co_dong_ho,
      label: item.ten_co_dong_ho
    })
  })

  return (
    <Select
      options={coDongHoOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value && props.value}
    />
  )
}