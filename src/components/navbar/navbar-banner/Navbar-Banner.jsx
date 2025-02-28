import React from "react";
import { Search, ShoppingCart, Menu } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";
import AmazonLogo from "../../../images/amazonLogo.png";
import "./Navbar-Banner.css";
import LanguageDropdown from "./language-drop-down/Language-Drop-Down";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

const NavbarBanner = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [selectedText, setSelectedText] = useState("All");
  const textMeasureRef = useRef(null);
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const [location, setLocation] = useState(
    localStorage.getItem("deliveryLocation") || "Ahmedabad 382350"
  );

  useEffect(() => {  // Update localStorage when location changes
    localStorage.setItem("deliveryLocation", location);
  }, [location]);

  const handleLocationChange = () => {   // Function to handle location change
    const newLocation = prompt("Enter new location (City & Pincode):", location);
    if (newLocation) {
      setLocation(newLocation); // Update state
      localStorage.setItem("deliveryLocation", newLocation); // Save to localStorage
    }
  };

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
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {    // Handle logout
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Clear state
    navigate("/login"); // Redirect to login page
  };

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
              <div className="address-text dropdown-delivery pl-0.25">
                <div className="phone-delivery-address flex cursor-pointer" onClick={handleLocationChange}>
                  <LocationOn className="delivery-icon" />
                  <div className="address-text">
                    <p className="text-xs text-slate-300">Delivering to {location}</p>
                    <p className="font-bold">Update location</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="menu-item">
                <div className="basket-section link" onClick={() => navigate("/wishlist")}>
                  <span className="basket-count text-sm">{wishlistCount}</span>
                  <FavoriteIcon className="basket-icon" />
                  <p className="basket-text text-sm text-white">Wishlist</p>
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

            <div className="menu-item relative group">
              {/* Dropdown Menu (Appears on Hover) */}
              <div className="relative group">
                {/* Account Section */}
                <div className="account-section link cursor-pointer p-2">
                  <p>Hello, {user ? user.name : "Sign in"}</p>
                </div>

                {/* Dropdown Menu (Appears on Hover) */}
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md p-2 hidden group-hover:flex flex-col z-50 overflow-visible min-w-max">
                  {!user ? (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        Login
                      </a>
                      <a
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        Register
                      </a>
                    </>
                  ) : (
                    <>
                      <div className="w-[120px]">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-gray-100 rounded"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Delivery Address (hidden on small screens) */}
        <div className="delivery-address hidden md:flex cursor-pointer" onClick={handleLocationChange}>
          <LocationOn className="delivery-icon " />
          <div className="address-text">
            <p className="text-xs text-slate-300">Delivering to {location}</p>
            <p className="font-bold">Update location</p>
          </div>
        </div>

        {/* Search Bar (hidden on small screens) */}
        <div className="search-bar hidden md:flex">
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
          <div className="relative group">
            {/* Account & Lists Section */}
            <div className="account-section link cursor-pointer p-2">
              <p>Hello, {user ? user.name : "Sign in"}</p>
            </div>

            {/* Dropdown Menu (Appears on Hover) */}
            <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-300 shadow-lg rounded-md p-2 hidden group-hover:flex flex-col z-50">
              {!user ? (
                <>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Register
                  </a>
                </>
              ) : (
                <>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </>
              )}
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

