import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'
import { IoMdLogOut } from "react-icons/io";
import logo from '../../assets/logo-full.png'
import axios from 'axios'

const NavLogo = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #fff;
`
const SidebarNav = styled.nav`
  background: #0051a9;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  position: fixed;
  top: 0;
  left: 0;
  transition: 350ms;
  z-index: 10;
  overflow: auto;
`
const SidebarWrap = styled.div`
  width: 100%;
  position: absolute;
`

const LogoutWrap = styled.div`
  width: 300px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 2px solid #ccc;
  padding: 10px 0;
  background-color: #0051a9;
`

const LogoutButton = styled.button`
  padding: 0.5rem;
  color: #fff;
  background-color: #c82020;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }
`
const User = styled.div`
  color: #fff;
  font-weight: bold;
`

export default function Sidebar() {
  const navigate = useNavigate()
  const maNhanVien = localStorage.getItem('user')
  const [nhanVien, setNhanVien] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tai_khoan/${maNhanVien}`)
      .then(response => {
        setNhanVien(response.data)
      })
  }, [])

  const logout = () => {
    localStorage.removeItem('quyens')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const quyensArray = JSON.parse(localStorage.getItem('quyens'))
  quyensArray.push(0)

  return (
    <>
      <IconContext.Provider value={{ color: 'fff' }}>
        <div className='nav'>
          <NavLogo to="#">
            {/* <FaIcons.FaBars onClick={showSidebar} /> */}
          </NavLogo>
        </div>
        <SidebarNav>
          <SidebarWrap>
            <NavLogo to='#'>
              <img className='logo' src={logo} />
            </NavLogo>
            {SidebarData.map((item, index) => {
              const result = quyensArray.some(i => item.isAllow.includes(i))
              if (result) {
                return <SubMenu item={item} key={index} />
              }
            })}
            <LogoutWrap>
              <User>
                {nhanVien.ho_ten}
              </User>
              <LogoutButton onClick={logout}>
                <IoMdLogOut style={{ transform: 'scale(1.3)' }} /> Đăng xuất
              </LogoutButton>
            </LogoutWrap>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}