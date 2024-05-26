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
      value: '',
      label: 'Tất cả'
    })
  }

  coDongHos.forEach(item => {
    coDongHoOptions.push({
      value: item.ma_co_dong_ho,
      label: item.ten_co_dong_ho
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
      options={coDongHoOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
    />
  )
}