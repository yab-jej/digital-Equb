// src/pages/Register.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/forms.css";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  // Check password match in real time
  useEffect(() => {
    if (!confirmPassword) setPasswordMatch(null);
    else setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const showError = (message: string) => {
    setToast(message);
    setToastType("error");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const showSuccess = (message: string) => {
    setToast(message);
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return showError("Name is required");
    if (password !== confirmPassword) return showError("Passwords do not match");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      showSuccess(res.data.message || "Account created successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) showError(err.response?.data?.message || "Registration failed");
      else if (err instanceof Error) showError(err.message);
    }
  };

  return (
    <>
      {/* Toast notification */}
      <div
        role="alert"
        aria-live="assertive"
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50
          transition-all duration-500 ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
          ${toastType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
      >
        {toast}
      </div>

      {/* Registration form */}
      <main className="form-page">
        <section className="form-card" aria-labelledby="register-heading">
          <h2 id="register-heading" className="form-title">Create Account</h2>

          <form onSubmit={handleRegister} className="form-element">
            {/* Name */}
            <div className="input-wrapper">
              <label htmlFor="register-name" className="input-label">Name</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field"
                aria-required="true"
              />
            </div>

            {/* Email */}
            <div className="input-wrapper">
              <label htmlFor="register-email" className="input-label">Email</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                aria-required="true"
              />
            </div>

            {/* Password */}
            <div className="input-wrapper">
              <label htmlFor="register-password" className="input-label">Password</label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                aria-required="true"
              />
            </div>

            {/* Confirm Password */}
            <div className="input-wrapper">
              <label htmlFor="register-confirm-password" className="input-label">Confirm Password</label>
              <input
                id="register-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field"
                aria-required="true"
              />
            </div>

            {/* Password match feedback */}
            {passwordMatch !== null && (
              <p className={`mt-1 text-sm ${passwordMatch ? "text-green-500" : "text-red-500"}`}>
                {passwordMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            )}

            <button type="submit" className="button-register mt-4">Create Account</button>
          </form>

          <p className="flex justify-center mt-4 text-sm">
            <Link to="/login" className="form-link">Already have an account? Login</Link>
          </p>
        </section>
      </main>
    </>
  );
};

export default Register;
