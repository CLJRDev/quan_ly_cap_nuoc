import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function ToQuanLy(props) {
  const [toQuanLys, setToQuanLys] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/to_quan_ly`)
      .then(response => {
        setToQuanLys(response.data)
      })
  }, [])

  const toQuanLyOptions = []

  if (props.isSearch) {
    toQuanLyOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  toQuanLys.forEach(item => {
    toQuanLyOptions.push({
      value: item.ma_to_quan_ly,
      label: item.ten_to_quan_ly
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
      options={toQuanLyOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}