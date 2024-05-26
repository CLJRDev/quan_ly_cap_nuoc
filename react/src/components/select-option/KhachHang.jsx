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
      value: '',
      label: 'Tất cả'
    })
  }

  khachHangs.forEach(item => {
    khachHangOptions.push({
      value: item.ma_khach_hang,
      label: item.ma_khach_hang
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
      required={props.require}
      options={khachHangOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}