import Select from 'react-select'

export default function TrangThai(props) {
  let options = props.isDongHo === true ? [
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
      value: '1',
      label: 'Kích hoạt'
    },
    {
      value: '0',
      label: 'Khóa'
    }
  ]

  if (props.isSearch === true) {
    options.unshift({
      value: '',
      label: 'Tất cả'
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