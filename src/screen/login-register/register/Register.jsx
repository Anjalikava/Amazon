import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For redirection

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Enter your name.";
    }

    if (!mobile.trim()) {
      errors.mobile = "Enter your mobile number.";
    } else if (!/^\d{10,15}$/.test(mobile)) {
      errors.mobile = "Enter a valid mobile number.";
    }

    if (!password.trim()) {
      errors.password = "Enter your password.";
    } else if (password.length < 6) {
      errors.password = "Passwords must be at least 6 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save data to localStorage
      const userData = { name, mobile, password };
      localStorage.setItem("user", JSON.stringify(userData));

      // Show success message
      alert("Account Created Successfully!");

      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <div className="create-account-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
        className="amazon-logo"
      />
      <div className="create-account-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Your name</label>
          <input
            type="text"
            placeholder="First and last name"
            className={`form-control ${errors.name ? "input-error" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <label>Mobile number</label>
          <div className="mobile-input">
          <div className="w-[300px] ">
  <select className="w-full p-2 border border-gray-300 rounded">
    <option>IN +91</option>
    <option>US +1</option>
    <option>UK +44</option>
  </select>
</div>

            <input
              type="text"
              placeholder="Mobile number"
              className={`form-control ${errors.mobile ? "input-error" : ""}`}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          {errors.mobile && <p className="error-message">{errors.mobile}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            className={`form-control ${errors.password ? "input-error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <button className="btn btn-warning verify-btn" type="submit">
            Verify mobile number
          </button>
        </form>

        <hr />

        <p className="business-text">
          <strong>Buying for work?</strong> <br />
          <a href="#">Create a free business account</a>
        </p>

        <p className="signin-text">
          Already have an account? <a href="/login">Sign in ›</a>
        </p>

        <p className="terms-text">
          By creating an account or logging in, you agree to Amazon’s{" "}
          <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
      <footer className="footer">
        <a href="#">Conditions of Use</a>
        <a href="#">Privacy Notice</a>
        <a href="#">Help</a>
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
};

export default CreateAccount;
