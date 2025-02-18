import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./loginstyles.css";

const LoginPage = () => {
  return (
    <div className="login-main-container">
      <Header />
      <div className="login-body">
        <div className="container">
          <div className="login-container">
            <h2>Welcome back</h2>
            <form>
              <label>Email</label>
              <input type="email" placeholder="BabaYagaWick@xyz.com" />
              <label>Password</label>
              <input type="password" placeholder="•••••••••" />
              <button type="submit">Log in</button>
            </form>
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign up for free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
