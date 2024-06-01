import Select from 'react-select'

export default function Nam(props) {
  let options = []
  let year = 2024
  for (let i = 1; i <= 10; i++) {
    options.push({
      value: `${year}`,
      label: `Năm ${year}`
    })
    year += 1
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