import React, { useState } from "react";
import "./styles/Login.css";
import { DiApple } from "react-icons/di";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { useAuth } from "../contextapi/AuthContext";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setIsAdminLoggedIn, setIsCustomerLoggedIn, setIsSellerLoggedIn, setUsername } =
    useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/user/checkuserlogin`,formData);
      if (response.status === 200) {
        const { role } = response.data;

        localStorage.setItem("user", JSON.stringify(response.data));

        
        setUsername(response.data.username)
        if (role === "ADMIN") {
          setIsAdminLoggedIn(true);
          navigate("/admin-dashboard");
        } else if (role === "SELLER") {
          setIsSellerLoggedIn(true);
          navigate("/sellerhome");
        } else if (role === "BUYER") {
          setIsCustomerLoggedIn(true);
          navigate("/customerhome");
        } else {
          setError("Unknown user role");
        }
      } else {
        setError(response.data || "Login failed");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data || "Invalid credentials");
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <p className="login-header">
        <strong>ASTHETICA</strong>
      </p>

      <form onSubmit={handleSubmit} className="login">
        <div className="login-section">
          <div className="header">
            <h2>Welcome Back</h2>
            <p className="header-quote">Sign in to explore curated works</p>

            {/* Show error or message */}
            {(error || message) && (
              <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
                {error || message}
              </p>
            )}
          </div>

          <div className="form-section">
            <p>Username</p>
            <input
              className="login-input-field"
              type="text"
              id="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
            <p>Password</p>
            <input
              className="login-input-field"
              type="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="check-section">
            <div style={{ display: "flex", fontSize: "small" }}>
              <label htmlFor="remember">Remember Me</label>
              <input type="checkbox" id="remember" />
            </div>
            <Link to="/forgot-password">
              <p>Forgot password?</p>
            </Link>
          </div>

          <div className="login-page-btn">
            <button type="submit">Sign In</button>
          </div>

          <div className="ggl-fcbk-sign">
            <div className="login-divider">
              <span>or</span>
            </div>

            <div className="login-opts">
              <button type="button">
                <DiApple />
                <p>Sign In with Apple</p>
              </button>
            </div>
            <div className="login-opts">
              <button type="button">
                <FaGoogle />
                <p>Sign In with Google</p>
              </button>
            </div>

            <p className="login-register">
              Don't have an account?{" "}
              <Link to="/register">
                <span>Register here</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
