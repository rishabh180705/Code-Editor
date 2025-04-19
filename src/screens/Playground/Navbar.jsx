import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const NavbarContainer = styled.div`
  height: ${({ isFullScreen }) => (isFullScreen ? '0' : '4.5rem')};
  background: linear-gradient(135deg,rgb(120, 15, 15),rgb(41, 138, 235));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height 0.3s ease;
  box-shadow: ${({ isFullScreen }) => isFullScreen ? 'none' : '0 4px 10px rgba(0, 0, 0, 0.2)'};
  z-index: 100;
`

const NavbarContent = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

const Logo = styled.img`
  width: 55px;
  transition: 0.3s ease-in-out;
`

const MainHeading = styled.h1`
  font-size: 1.9rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 0.5px;

  span {
    font-weight: 700;
    background: linear-gradient(90deg, #00c6ff, #0072ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const Navbar = ({ isFullScreen }) => {
  const navigate = useNavigate()

  return (
    <NavbarContainer isFullScreen={isFullScreen}>
      <NavbarContent onClick={() => navigate('/')}>
        <Logo src={logo} alt="Logo" />
        <MainHeading><span>Code</span> Editor</MainHeading>
      </NavbarContent>
    </NavbarContainer>
  )
}

export default Navbar
