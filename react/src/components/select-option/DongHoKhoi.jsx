import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function DongHoKhoi(props) {
  const [dongHos, setDongHos] = useState([])

  useEffect(() => {
    if (props.isLapDat) {
      axios.get(`http://127.0.0.1:8000/api/dong_ho_khoi_search?tinh_trang=0`)
        .then(response => {
          setDongHos(response.data)
        })
    } else {
      axios.get(`http://127.0.0.1:8000/api/dong_ho_khoi`)
        .then(response => {
          setDongHos(response.data)
        })
    }
  }, [])

  const dongHoKhoiOptions = []

  if (props.isSearch) {
    dongHoKhoiOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  dongHos.forEach(item => {
    dongHoKhoiOptions.push({
      value: item.ma_dong_ho,
      label: item.ma_dong_ho
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
      options={dongHoKhoiOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value}
      menuPortalTarget={document.body}
      required={props.require}
      isDisabled={props.isDisabled}
    />
  )
}