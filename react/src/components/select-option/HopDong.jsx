import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function HopDong(props) {
  const [hopDongs, setHopDongs] = useState([])

  useEffect(() => {
    if (props.isLapDat) {
      axios.get(`http://127.0.0.1:8000/api/hop_dong_search?trang_thai=0`)
        .then(response => {
          setHopDongs(response.data)
        })
    } else {
      axios.get(`http://127.0.0.1:8000/api/hop_dong`)
        .then(response => {
          setHopDongs(response.data)
        })
    }

  }, [])

  const hopDongOptions = []

  if (props.isSearch) {
    hopDongOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  hopDongs.forEach(item => {
    hopDongOptions.push({
      value: item.ma_hop_dong,
      label: item.ma_hop_dong
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
      options={hopDongOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value && props.value}
      menuPortalTarget={document.body}
      isDisabled={props.isDisabled}
    />
  )
}