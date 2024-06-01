import Select from 'react-select'

export default function Thang(props) {
  let options = []
  for (let i = 1; i <= 12; i++) {
    options.push({
      value: `${i}`,
      label: `Tháng ${i}`
    })
  }

  if (props.isSearch) {
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
      name={props.name}
      onChange={props.onChange}
      options={options}
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  )
}