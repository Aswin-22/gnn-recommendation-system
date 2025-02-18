import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./loginstyles.css";

function SignUp() {
  return (
    <div>
      <div className="login-main-container">
        <Header />
        <div className="login-body">
          <div className="container">
            <div className="login-container">
              <h2>Welcome !!</h2>
              <form>
                <label>Full Name</label>
                <input type="text" placeholder="Jhon Wick" />
                <label>Email</label>
                <input type="email" placeholder="BabaYagaWick@xyz.com" />
                <label>Password</label>
                <input type="password" placeholder="•••••••••" />
                <label>Confirm Password</label>
                <input type="password" placeholder="•••••••••" />
                <button type="submit">Sign Up</button>
              </form>
              <p className="signup-link">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
