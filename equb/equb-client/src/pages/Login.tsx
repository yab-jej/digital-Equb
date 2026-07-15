import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/forms.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // Save both user and token in AuthContext
      login(res.data.user, res.data.token);

      // Redirect to protected page
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) setError(err.response?.data?.message || "Login failed");
      else if (err instanceof Error) setError(err.message);
      else setError("Login failed");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin} className="form-element">
          <div className="input-wrapper">
            <input
              id="login-email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              autoComplete="email"
            />
            <label htmlFor="login-email" className="input-label">Email</label>
          </div>
          <div className="input-wrapper">
            <input
              id="login-password"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              autoComplete="current-password"
            />
            <label htmlFor="login-password" className="input-label">Password</label>
          </div>
          <button type="submit" className="button-login">Login</button>
        </form>
        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/reset-password" className="form-link">Forgot password?</Link>
          <Link to="/register" className="form-link">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
