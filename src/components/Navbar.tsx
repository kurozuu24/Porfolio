import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(motion.h1)`
  background: linear-gradient(to right, var(--accent), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.75rem;
  font-weight: 800;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(to right, var(--accent), var(--primary));
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--text-primary);
    
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--background-light);
    padding: 1.5rem;
    flex-direction: column;
    gap: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavContainer>
      <Logo>JC</Logo>
      <NavLinks>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/sobre-mi">Sobre Mí</NavLink>
        <NavLink to="/proyectos">Proyectos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
      </NavLinks>
      <MobileMenuButton onClick={toggleMobileMenu}>
        ☰
      </MobileMenuButton>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Inicio</NavLink>
        <NavLink to="/sobre-mi" onClick={() => setIsMobileMenuOpen(false)}>Sobre Mí</NavLink>
        <NavLink to="/proyectos" onClick={() => setIsMobileMenuOpen(false)}>Proyectos</NavLink>
        <NavLink to="/contacto" onClick={() => setIsMobileMenuOpen(false)}>Contacto</NavLink>
      </MobileMenu>
    </NavContainer>
  );
};

export default Navbar; 