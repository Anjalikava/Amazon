import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="main-wrapper"> {/* This div centers everything */}
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
          <form>
            <label>Email or mobile phone number</label>
            <input type="text" className="form-control" />
            <button className="btn btn-warning">Continue</button>
          </form>
          <p className="terms">
            By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
          </p>
          <a href="#" className="help-link">
            Need help?
          </a>
          <hr />
        </div>
        <div>
          <p className="new-text">New to Amazon?</p>
          <button className="btn create-account-btn">Create your Amazon account</button>
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
