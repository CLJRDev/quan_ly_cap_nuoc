import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function Quyen(props) {
  const [quyens, setQuyens] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quyen`)
      .then(response => {
        setQuyens(response.data)
      })
  }, [])

  const quyenOptions = []

  if (props.isSearch) {
    quyenOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  quyens.forEach(item => {
    if (item.trang_thai == 1) {
      quyenOptions.push({
        value: item.ma_quyen,
        label: item.ten_quyen
      })
    }
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
      options={quyenOptions}
      isMulti={props.isMulti}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}