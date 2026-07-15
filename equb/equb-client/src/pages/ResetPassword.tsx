import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/forms.css";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"request" | "verify" | "reset">("request");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [otpTime, setOtpTime] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setToast(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // OTP countdown
  useEffect(() => {
    if (otpTime === 0) return;
    const timer = setInterval(() => setOtpTime((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [otpTime]);

  // ------------------ Request OTP ------------------
  const requestOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password-request", { email });
      showMessage(res.data.message, "success");
      setStep("verify");
      setOtpTime(600); // 10 minutes
      setOtpVerified(false);
    } catch (err: unknown) {
      let message = "Failed to send OTP";
      if (axios.isAxiosError(err)) message = err.response?.data?.message || message;
      showMessage(message, "error");
    }
  };

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return showMessage("Enter your email", "error");
    requestOTP();
  };

  // ------------------ Verify OTP ------------------
  const verifyOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password-verify", { email, otp });
      showMessage(res.data.message, "success");
      setOtpVerified(true);
      setStep("reset");
    } catch (err: unknown) {
      let message = "Invalid or expired OTP";
      if (axios.isAxiosError(err)) message = err.response?.data?.message || message;
      showMessage(message, "error");
      setOtpVerified(false);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return showMessage("Enter OTP", "error");
    verifyOTP();
  };

  // ------------------ Reset Password ------------------
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }
    if (!otpVerified) {
      showMessage("Please verify OTP first", "error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      showMessage(res.data.message, "success");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err: unknown) {
      let message = "Failed to reset password";
      if (axios.isAxiosError(err)) message = err.response?.data?.message || message;
      showMessage(message, "error");
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="form-page relative">
      {/* Toast */}
      <div className={`toast ${showToast ? "show" : ""} ${toastType}`}>{toast}</div>

      <div className="form-card">
        {step === "request" && (
          <>
            <h2 className="form-title">Reset Password</h2>
            <form onSubmit={handleRequestOTP} className="form-element">
              <div className="input-wrapper">
                <input
                  id="reset-email"
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
                <label htmlFor="reset-email" className="input-label">Email</label>
              </div>
              <button type="submit" className="button-reset mt-4">Send OTP</button>
            </form>
          </>
        )}

        {step === "verify" && (
          <>
            <h2 className="form-title">Enter OTP</h2>
            <form onSubmit={handleVerifyOTP} className="form-element">
              <div className="input-wrapper">
                <input
                  id="reset-otp"
                  type="text"
                  placeholder=" "
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                  className="input-field"
                />
                <label htmlFor="reset-otp" className="input-label">OTP</label>
              </div>

              <div className="otp-timer text-sm text-gray-500">
                {otpTime > 0 ? (
                  `OTP expires in ${formatTime(otpTime)}`
                ) : (
                  <>
                    OTP expired.
                    <button type="button" className="text-indigo-600 underline ml-2" onClick={requestOTP}>
                      Resend OTP
                    </button>
                  </>
                )}
              </div>

              <button type="submit" className="button-reset mt-4">Verify OTP</button>
            </form>
          </>
        )}

        {step === "reset" && otpVerified && (
          <>
            <h2 className="form-title">Reset Password</h2>
            <form onSubmit={handleResetPassword} className="form-element">
              <div className="input-wrapper">
                <input
                  id="reset-new-password"
                  type="password"
                  placeholder=" "
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <label htmlFor="reset-new-password" className="input-label">New Password</label>
              </div>
              <div className="input-wrapper">
                <input
                  id="reset-confirm-password"
                  type="password"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <label htmlFor="reset-confirm-password" className="input-label">Confirm Password</label>
              </div>
              <button type="submit" className="button-reset mt-4">Reset Password</button>
            </form>
          </>
        )}

        <button className="button-back mt-2" onClick={() => (window.location.href = "/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

