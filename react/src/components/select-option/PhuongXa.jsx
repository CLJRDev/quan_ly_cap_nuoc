import axios from "axios";
import Select from 'react-select';
import { useState, useEffect } from "react";

export default function PhuongXa(props) {
  const [phuongXas, setPhuongXas] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/phuong_xa`)
      .then(response => {
        setPhuongXas(response.data);
      });
  }, []);

  const phuongXaOptions = [];

  if (props.isSearch) {
    phuongXaOptions.push({
      value: '',
      label: 'Tất cả'
    });
  }

  phuongXas.forEach(item => {
    phuongXaOptions.push({
      value: item.ma_phuong_xa,
      label: item.ten_phuong_xa
    });
  });

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
      options={phuongXaOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  );
}
