import axios from "axios";
import Select from 'react-select';
import { useState, useEffect } from "react";

export default function QuanHuyen(props) {
  const [quanHuyens, setQuanHuyens] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quan_huyen`)
      .then(response => {
        setQuanHuyens(response.data);
      });
  }, []);

  const quanHuyenOptions = [];

  if (props.isSearch) {
    quanHuyenOptions.push({
      value: '',
      label: 'Tất cả'
    });
  }

  quanHuyens.forEach(item => {
    quanHuyenOptions.push({
      value: item.ma_quan_huyen,
      label: item.ten_quan_huyen
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
      options={quanHuyenOptions}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  );
}
