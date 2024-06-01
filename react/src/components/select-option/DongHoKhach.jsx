import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function DongHoKhach(props) {
  const [dongHos, setDongHos] = useState([])

  useEffect(() => {
    if (props.isLapDat) {
      axios.get(`http://127.0.0.1:8000/api/dong_ho_khach_search?tinh_trang=0`)
        .then(response => {
          setDongHos(response.data)
        })
    } else {
      axios.get(`http://127.0.0.1:8000/api/dong_ho_khach`)
        .then(response => {
          setDongHos(response.data)
        })
    }
  }, [])

  const dongHoKhachOptions = []

  if (props.isSearch) {
    dongHoKhachOptions.push({
      value: '',
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
      options={dongHoKhachOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
      isDisabled={props.isDisabled}
    />
  )
}