import React from "react";
import { Search, ShoppingCart, Menu } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";
import AmazonLogo from "../../../assets/amazonLogo.png";
import "./Navbar-Banner.css";
import LanguageDropdown from "./language-drop-down/Language-Drop-Down";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';



const NavbarBanner = () => {
  // State to toggle the menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [wishlistCount, setWishlistCount] = useState(0);
  // Toggle menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [selectedText, setSelectedText] = useState("All");
  const textMeasureRef = useRef(null);
  const selectRef = useRef(null);
  useEffect(() => {
    // Update the dropdown width based on the selected option's text width
    if (textMeasureRef.current && selectRef.current) {
      const width = textMeasureRef.current.offsetWidth;
      selectRef.current.style.width = `${width + 32}px`; // Add padding
    }
  }, [selectedText]);

  const handleChange = (e) => {
    setSelectedText(e.target.options[e.target.selectedIndex].text);
  };
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
  
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
  
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);


 

useEffect(() => {
  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlist.length);
  };

  updateWishlistCount();
  window.addEventListener("wishlistUpdated", updateWishlistCount);

  return () => {
    window.removeEventListener("wishlistUpdated", updateWishlistCount);
  };
}, []);

  
  const navigate = useNavigate();
  return (
    <div className="navbar-banner">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-container">
          <img src={AmazonLogo} alt="Amazon Logo" className="logo-image"></img>
          <span className=" md:inline">.in</span>
        </div>

        {/* Menu Icon (visible on phone screens only) */}
        <div
          className="menu-icon-container block md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="menu-icon" />
        </div>

        {/* Dropdown Menu (visible on phone screens only) */}
        {menuOpen && (
          <div className="menu-dropdown">
            <div className="menu-item">
              <div className="address-text dropdown-delivery pl-0.25 ">
                <div className="flex items-center space-x-2">
                  <LocationOn className="menu-icon" />
                  <div>
                    <p className="text-s text-black-300">
                      Delivering to Ahmedabad 382350
                    </p>
                    <p className="font-bold text-sm">Update location</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-item">
              <div className="account-section link">
                <p>Hello, Sign in</p>
                <p className="font-extrabold md:text-sm text-sm">
                  Account & Lists
                </p>
              </div>
            </div>
            <div className="menu-item">
            <div className="basket-section link" onClick={() => navigate("/wishlist")}>
  <span className="basket-count text-sm">{wishlistCount}</span>
  <FavoriteIcon className="basket-icon" />
  <p className="basket-text text-sm">Wishlist</p>
</div>

            </div>
            <div className="menu-item" onClick={() => navigate("/cart")}>
              <div className="basket-section link">
                <span className="basket-count text-sm">{cartCount}</span>
                <ShoppingCart className="basket-icon" />
                <p className="basket-text text-sm">Cart</p>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Address (hidden on small screens) */}
        <div className="delivery-address hidden md:flex">
          <LocationOn className="delivery-icon" />
          <div className="address-text">
            <p className="text-xs text-slate-300">
              Delivering to Ahmedabad 382350
            </p>
            <p className="font-bold">Update location</p>
          </div>
        </div>

        {/* Search Bar (hidden on small screens) */}
        <div className="search-bar hidden md:flex">
          {/* Dropdown */}
          <select
            ref={selectRef}
            onChange={handleChange}
            className=" category-dropdown">
            <option value="aps">All</option>
            <option value="your-account"> Your Account</option>
            <option value="customer-service">Customer Service</option>
            <option value="track-orders">Track Orders</option>
            <option value="returns-refunds">Returns & Refunds</option>
            <option value="buy-again">Buy Again</option>
            <option value="join-prime">Join Prime</option>
            <option value="prime-video">Prime Video</option>
            <option value="exclusive-deals">Exclusive Deals</option>
            <option value="shopping-list">Shopping List</option>
            <option value="gift-ideas">Gift Ideas</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="payment-methods">Payment Methods</option>
            <option value="coupons">Coupons</option>
          </select>

          {/* Hidden element to measure text width */}
          <span
            ref={textMeasureRef}
            className="absolute invisible whitespace-nowrap p-2"
          >
            {selectedText}
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search Amazon"
          />
          <button className="search-button">
            <Search className="search-icon" />
          </button>
        </div>

        {/* Right Section (hidden on small screens) */}
        <div className="right-section hidden md:flex">
          <LanguageDropdown />
          {/* <div className="flag-section link">
            <div className="flex">
              <img
                src={IndianFlag}
                alt="Indian Flag"
                className="flag-icon"
               
              />
              <div className="pt-1 pl-1">
                <span className="language-text">EN</span>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>
          </div> */}
<div className="relative group">
  {/* Account & Lists Section */}
  <div className="account-section link cursor-pointer p-2">
    <p>Hello, Sign in</p>
    <p className="font-extrabold md:text-sm text-sm">Account & Lists</p>
  </div>

  {/* Dropdown Menu (Appears on Hover) */}
  <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-300 shadow-lg rounded-md p-2 hidden group-hover:flex flex-col z-50">
    <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
      Login
    </a>
    <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
      Register
    </a>
  </div>
</div>



          <div className="basket-section link" onClick={() => navigate("/wishlist")}>
  <span className="basket-count text-sm">{wishlistCount}</span>
  <FavoriteIcon className="basket-icon" />
  <p className="basket-text text-sm">Wishlist</p>
</div>

          <div className="basket-section link" onClick={() => navigate("/cart")}>
            <span className="basket-count text-sm">{cartCount}</span>
            <ShoppingCart className="basket-icon" />
            <p className="basket-text text-sm" >Cart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBanner;

