import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import { AuthProvider } from "./screen/contex/AuthContext";
import ProtectedRoute from "./screen/contex/ProtectedRoute";

const AppContent = () => {
    const location = useLocation();

    // Hide Navbar for login and createAccount pages
    const hideNavbarRoutes = ["/login", "/createAccount"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <div className="p-0 m-0 box-border">
            {shouldShowNavbar && <Navbar />} {/* Navbar only shows on protected routes */}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route path="/register" element={<CreateAccount />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomeScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home-banner"
                    element={
                        <ProtectedRoute>
                            <HomeBanner />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home-details"
                    element={
                        <ProtectedRoute>
                            <HomeDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <AddToCart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product-data"
                    element={
                        <ProtectedRoute>
                            <ProductData />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/your-lists/wish-list"
                    element={
                        <ProtectedRoute>
                            <WiseList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <ProtectedRoute>
                            <HomeProductDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/offer/:id"
                    element={
                        <ProtectedRoute>
                            <OfferDetails />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;
