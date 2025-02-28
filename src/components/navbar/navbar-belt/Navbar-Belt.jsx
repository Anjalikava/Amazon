import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
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
        <div className="flex items-center  p-2 pl-6">
        <p className="link" onClick={handleNavigationHome}>
  <HomeIcon />
 
</p>
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
