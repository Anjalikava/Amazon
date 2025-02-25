import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar-Belt.css"; 

const NavbarBottom = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate(); // Use React Router navigation

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigation = (category) => {
    navigate(`/product-data?category=${category}`);
  };

  const handleNavigationHome = () => {
    navigate("/"); // Proper navigation to Home
  };

  return (
    <>
      
      <div className="navbar-bottom">
        <div className="flex items-center space-x-3 p-2 pl-6">
          <p className="link flex items-center" onClick={toggleSidebar}>
            <svg className="h-6 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            All
          </p>
          <p className="link" onClick={handleNavigationHome}>Home</p>
          <p className="link" onClick={() => handleNavigation("books")}>Books</p>
          <p className="link" onClick={() => handleNavigation("fashion-clothing")}>Fashion Clothing</p>
          <p className="link hidden lg:inline-flex" onClick={() => handleNavigation("electronics")}>Electronics</p>
          <p className="link hidden lg:inline-flex" onClick={() => handleNavigation("food-grocery")}>Food & Grocery</p>
          <p className="link hidden lg:inline-flex" onClick={() => handleNavigation("shopper-toolkit")}>Shopper Toolkit</p>
          <p className="link hidden lg:inline-flex" onClick={() => handleNavigation("health-personal-care")}>Health & Personal Care</p>
        </div>
      </div>
    </>
  );
};

export default NavbarBottom;
