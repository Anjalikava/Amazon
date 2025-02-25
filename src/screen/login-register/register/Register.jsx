import React from "react";
import "./Register.css";

const CreateAccount = () => {
return (
    <div className="create-account-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
        className="amazon-logo"
      />
      <div className="create-account-box">
        <h2>Create Account</h2>
        <form>
          <label>Your name</label>
          <input type="text" placeholder="First and last name" className="form-control" />

          <label>Mobile number</label>
          <div className="mobile-input" >
            <select className="country-code">
              <option>IN +91</option>
              <option>US +1</option>
              <option>UK +44</option>
            </select>
            <input type="text" placeholder="Mobile number" className="form-control" />
          </div>

          <label>Password</label>
          <input type="password" placeholder="At least 6 characters" className="form-control" />
          <p className="password-info">
            <span className="info-icon">ℹ</span> Passwords must be at least 6 characters.
          </p>

          <p className="verification-text">
            To verify your number, we will send you a text message with a temporary code.
            Message and data rates may apply.
          </p>

          <button className="btn btn-warning verify-btn">Verify mobile number</button>
        </form>

        <hr />

        <p className="business-text">
          <strong>Buying for work?</strong> <br />
          <a href="#">Create a free business account</a>
        </p>

        <p className="signin-text">
          Already have an account? <a href="#">Sign in ›</a>
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
