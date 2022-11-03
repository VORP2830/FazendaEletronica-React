import React from 'react'
import { Container, Content } from './styles'
import { Link } from "react-router-dom";
import { FaTimes, FaHome } from 'react-icons/fa'
import { TbLogout } from 'react-icons/tb'
import SidebarItem from '../SliedbarItem'
import Cookies from 'universal-cookie';
import './index.css'

const cookies = new Cookies();

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  const Botao = () => {
    //cookies.remove('Token')
    alert('apertou')
    window.location.reload()
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
      <Link to="/principal"><SidebarItem Icon={FaHome} Text="Painel principal" /></Link>
      <SidebarItem Icon={TbLogout} Text="Logout"/>
      </Content>
    </Container>
  )
}


export default Sidebar