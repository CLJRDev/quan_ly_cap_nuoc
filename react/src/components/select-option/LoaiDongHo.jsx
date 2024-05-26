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
      value: '',
      label: 'Tất cả'
    })
  }

  loaiDongHos.forEach(item => {
    loaiDongHoOptions.push({
      value: item.ma_loai_dong_ho,
      label: item.ten_loai_dong_ho
    })
  })

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999
    }),
  };

  return (
    <Select
      options={loaiDongHoOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}