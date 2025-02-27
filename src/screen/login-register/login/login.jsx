import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInput = (value) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("This field cannot be empty.");
      return;
    }

    if (!validateInput(input)) {
      setError("Enter a valid mobile phone number.");
      return;
    }

    // Retrieve stored user data
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.mobile === input) {
      setError("");

      // Save login status
      localStorage.setItem("isAuthenticated", "true");

      alert("Login successful!");
      navigate("/"); // Redirect to Home page
      window.location.reload(); // Force reload to update Auth state
    } else {
      setError("Mobile number not registered. Please create an account.");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="login-container">
        <div className="logo-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className="amazon-logo"
          />
        </div>
        <div className="login-box">
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit}>
            <label>Mobile phone number</label>
            <div className="input-container">
              <input
                type="text"
                className={`form-control ${error ? "input-error" : ""}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {error && (
                <div className="error-message-container">
                  <span className="error-icon">⚠️</span>
                  <p className="error-message">{error}</p>
                </div>
              )}
            </div>
            <button className="btn btn-warning" type="submit">
              Continue
            </button>
          </form>
          <p className="terms">
            By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
          </p>
          <a href="#" className="help-link">
            Need help?
          </a>
          <hr />
        </div>
        <div className="new-account-section">
          <p className="new-text">New to Amazon?</p>
          <NavLink to={"/createAccount"}>
            <button className="btn create-account-btn">
              Create your Amazon account
            </button>
          </NavLink>
        </div>
        <footer className="footer">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
          <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
