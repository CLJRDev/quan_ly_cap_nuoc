import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover{
    background: rgba(255, 255, 255, .075);
    border-left: 4px solid #3b7ddd;
    cursor: pointer;
  }
`
const SidebarLabel = styled.span`
  margin-left: 16px;
`
const DropdownLink = styled(Link)`
  background: transparent;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, .075);
    cursor: pointer;
  }
`;

export default function SubMenu({ item }) {
  const [subnav, setSubnav] = useState(false)
  const showSubnav = () => setSubnav(!subnav)
  const quyensArray = JSON.parse(localStorage.getItem('quyens'))
  return (
    <>
      <SidebarLink onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          if (quyensArray.includes(item.maQuyen) || !item.maQuyen) {
            return (
              <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
            )
          }
        })}
    </>
  )
}