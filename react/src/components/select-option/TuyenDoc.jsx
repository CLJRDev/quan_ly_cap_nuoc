import axios from "axios"
import Select from 'react-select'
import { useState, useEffect } from "react"

export default function TuyenDoc(props) {
  const [tuyenDocs, setTuyenDocs] = useState(null)

  useEffect(() => {
    if (props.isLapDat) {
      axios.get(`http://127.0.0.1:8000/api/tuyen_doc_search?trang_thai=0`)
        .then(response => {
          setTuyenDocs(response.data)
        })
    } else {
      axios.get(`http://127.0.0.1:8000/api/tuyen_doc`)
        .then(response => {
          setTuyenDocs(response.data)
        })
    }
  }, [])

  if (!tuyenDocs) return null

  const tuyenDocOptions = []

  if (props.isSearch) {
    tuyenDocOptions.push({
      value: '',
      label: 'Tất cả'
    })
  }

  tuyenDocs.forEach(item => {
    tuyenDocOptions.push({
      value: item.ma_tuyen,
      label: item.ten_tuyen
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
      required={props.isRequire}
      options={tuyenDocOptions}
      onChange={props.onChange}
      name={props.name}
      styles={customStyles}
      value={props.value}
      menuPortalTarget={document.body}
      isDisabled={props.isDisabled}
    />
  )
}