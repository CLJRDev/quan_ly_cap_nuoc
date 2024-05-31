import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function LoaiKhachHang(props) {
  const [loaiKhachHangs, setLoaiKhachHangs] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loai_khach_hang`)
      .then(response => {
        setLoaiKhachHangs(response.data)
      })
  }, [])

  const loaiKhachHangOptions = []

  if (props.isSearch) {
    loaiKhachHangOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  loaiKhachHangs.forEach(item => {
    loaiKhachHangOptions.push({
      value: item.ma_loai_khach_hang,
      label: item.ten_loai_khach_hang
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
      options={loaiKhachHangOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}