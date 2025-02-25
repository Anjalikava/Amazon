import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomeBanner from "./screen/home-screen/home-banner/Home-Banner";
import HomeDetails from "./screen/home-screen/home-banner/Home-Banner-Click-Products";
import ProductData from "./components/navbar/navbar-belt/product-details/Product-Data";
import HomeProductDetails from "./screen/home-screen/home-details/Home-Product-Details";
import OfferDetails from "./screen/home-screen/home-details/Home-product-Offers";
import { HomeScreen } from "./screen/home-screen/Home-Screen";
import WiseList from "./components/navbar/navbar-banner/language-drop-down/WiseList";
import AddToCart from "./components/navbar/navbar-banner/cart/cart";
import Wishlist from "./components/navbar/navbar-banner/language-drop-down/WiseList";
import Login from "./screen/login-register/login/login";
import CreateAccount from "./screen/login-register/register/Register";


const App = () => {
    return (
        <Router>
            <div className="p-0 m-0 box-border">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/home-banner" element={<HomeBanner />} />
                    <Route path="/home-details" element={<HomeDetails />} />
                    <Route path="/cart" element={<AddToCart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/product-data" element={<ProductData />} />
                    <Route path="/your-lists/wish-list" element={<WiseList />} />
                    <Route path="/product/:id" element={<HomeProductDetails />} />
                    <Route path="/offer/:id" element={<OfferDetails />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<CreateAccount />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
