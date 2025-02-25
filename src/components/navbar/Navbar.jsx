import React from 'react';
import NavbarBanner from './navbar-banner/Navbar-Banner';
import NavbarBottom from './navbar-belt/Navbar-Belt';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <NavbarBanner />
      <NavbarBottom />
    </header>
  );
};

export default Navbar;
