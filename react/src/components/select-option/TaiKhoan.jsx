import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function TaiKhoan(props) {
  const [taiKhoans, setTaiKhoans] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tai_khoan`)
      .then(response => {
        setTaiKhoans(response.data)
      })
  }, [])

  const taiKhoanOptions = []

  if (props.isSearch) {
    taiKhoanOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  taiKhoans.forEach(item => {
    taiKhoanOptions.push({
      value: item.ma_nhan_vien,
      label: item.ma_nhan_vien
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
      options={taiKhoanOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}