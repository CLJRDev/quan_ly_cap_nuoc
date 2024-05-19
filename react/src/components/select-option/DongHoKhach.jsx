import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function DongHoKhach(props) {
  const [dongHos, setDongHos] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/dong_ho_khach`)
      .then(response => {
        setDongHos(response.data)
      })
  }, [])

  if (!dongHos) return null

  const dongHoKhachOptions = []

  if (props.isSearch) {
    dongHoKhachOptions.push({
      value: 0,
      label: 'Tất cả'
    })
  }

  if (props.isHopDong) {
    dongHos.forEach(item => {
      if (item.tinh_trang == 0) {
        dongHoKhachOptions.push({
          value: item.ma_dong_ho,
          label: item.ma_dong_ho
        })
      }
    })
  } else {
    dongHos.forEach(item => {
      dongHoKhachOptions.push({
        value: item.ma_dong_ho,
        label: item.ma_dong_ho
      })
    })
  }



  return (
    <Select
      options={dongHoKhachOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value && props.value}
    />
  )
}