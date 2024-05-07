import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'
import logo from '../../assets/logo-full.png'

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
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  transition: 350ms;
  z-index: 10;
  overflow: auto;
`
const SidebarWrap = styled.div`
  width: 100%;
`

export default function Sidebar() {
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
              return <SubMenu item={item} key={index} />
            })}
            {/* <button className='btn btn-block'>Đăng xuất</button> */}
          </SidebarWrap>          
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}