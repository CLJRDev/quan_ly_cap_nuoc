import Select from 'react-select'

export default function TrangThai(props) {

  const options = props.isDongHo === true ? [
    {
      value: '',
      label: 'Tất cả'
    },
    {
      value: '1',
      label: 'Đang lắp đặt'
    },
    {
      value: '0',
      label: 'Trống'
    }
  ] : [
    {
      value: '',
      label: 'Tất cả'
    },
    {
      value: '1',
      label: 'Kích hoạt'
    },
    {
      value: '0',
      label: 'Khóa'
    }
  ]

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
      options={options}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  )
}