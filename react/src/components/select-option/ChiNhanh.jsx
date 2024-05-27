import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function ChiNhanh(props) {
  const [chiNhanhs, setChiNhanhs] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/chi_nhanh`)
      .then(response => {
        setChiNhanhs(response.data)
      })
  }, [])

  const chiNhanhOptions = []

  if (props.isSearch) {
    chiNhanhOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  chiNhanhs.forEach(item => {
    chiNhanhOptions.push({
      value: item.ma_chi_nhanh,
      label: item.ten_chi_nhanh
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
      options={chiNhanhOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}