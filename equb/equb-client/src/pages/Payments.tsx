// src/pages/Payments.tsx
import React, { useState } from "react";
import "../styles/Payments.css";

interface Payment {
  id: number;
  equbName: string;
  contribution: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

const Payments: React.FC = () => {
  const userName = "John Doe"; // later fetch dynamically

  const [payments] = useState<Payment[]>([
    {
      id: 1,
      equbName: "Sunshine Equb",
      contribution: 500,
      dueDate: "2025-10-25",
      status: "Pending",
    },
    {
      id: 2,
      equbName: "Unity Circle",
      contribution: 1000,
      dueDate: "2025-10-20",
      status: "Paid",
    },
    {
      id: 3,
      equbName: "Bright Future Group",
      contribution: 800,
      dueDate: "2025-10-10",
      status: "Overdue",
    },
  ]);

  return (
    <div className="payments-container">
      {/* Header */}
      <header className="payments-header">
        <div className="header-left">
          {/* Embedded SVG logo */}
          <svg
            width="90"
            height="90"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="logo"
          >
            <circle cx="50" cy="50" r="46" fill="#FFF9E6" stroke="#FBBF24" strokeWidth="4" />
            <text x="38" y="55" fontSize="18" fontWeight="bold" fill="#9333EA" textAnchor="middle">D</text>
            <text x="52" y="55" fontSize="18" fontWeight="bold" fill="#10B981" textAnchor="middle">E</text>
            <circle cx="44" cy="50" r="8" stroke="#22C55E" strokeWidth="2.5" fill="none" />
            <circle cx="56" cy="50" r="8" stroke="#F87171" strokeWidth="2.5" fill="none" />
            <rect x="48" y="61" width="4" height="4" fill="#10B981" transform="rotate(45 50 63)" />
          </svg>

          <div>
            <h1 className="title">Payments Dashboard</h1>
            <p className="subtitle">Welcome back, {userName}</p>
          </div>
        </div>
      </header>

      {/* Active Payments */}
      <section className="active-payments">
        <h2 className="section-title">Active Payments</h2>
        <div className="payments-grid">
          {payments.map((p) => (
            <div key={p.id} className={`payment-card ${p.status.toLowerCase()}`}>
              <h3 className="equb-name">{p.equbName}</h3>
              <p className="amount">💰 Contribution: {p.contribution} ETB</p>
              <p className="due">📅 Due Date: {p.dueDate}</p>
              <span className={`status ${p.status.toLowerCase()}`}>{p.status}</span>
              {p.status !== "Paid" && <button className="pay-btn">Pay Now</button>}
            </div>
          ))}
        </div>
      </section>

      {/* Payment Methods with real inline SVG logos */}
      <section className="payment-methods">
        <h2 className="section-title">Choose Payment Method</h2>
        <div className="methods-grid">

          {/* Chapa */}
          <div className="method-card">
            <svg className="method-icon" width="60" height="60" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="30" fill="#4CAF50" />
              <text x="32" y="38" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">C</text>
            </svg>
            <p>Chapa</p>
          </div>

          {/* Telebirr */}
          <div className="method-card">
            <svg className="method-icon" width="60" height="60" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="30" fill="#FF6F00" />
              <text x="32" y="38" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">T</text>
            </svg>
            <p>Telebirr</p>
          </div>

          {/* M-Pesa */}
          <div className="method-card">
            <svg className="method-icon" width="60" height="60" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="30" fill="#00ADEF" />
              <text x="32" y="38" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">M</text>
            </svg>
            <p>M-Pesa</p>
          </div>

          {/* Credit/Debit Card (Visa/MasterCard style) */}
          <div className="method-card">
            <svg className="method-icon" width="60" height="40" viewBox="0 0 64 40">
              <rect x="0" y="0" width="64" height="40" rx="6" fill="#1A1F71" />
              <rect x="4" y="28" width="20" height="4" fill="white" />
              <circle cx="50" cy="20" r="8" fill="#FF5F00" />
              <circle cx="56" cy="20" r="8" fill="#EB001B" />
            </svg>
            <p>Credit/Debit Card</p>
          </div>

          {/* PayPal */}
          <div className="method-card">
            <svg className="method-icon" width="60" height="60" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="30" fill="#003087" />
              <text x="32" y="38" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">P</text>
            </svg>
            <p>PayPal</p>
          </div>

          {/* Bank Transfer */}
          <div className="method-card">
            <svg className="method-icon" width="60" height="60" viewBox="0 0 64 64">
              <rect x="8" y="16" width="48" height="32" rx="4" fill="#FFC107" />
              <line x1="8" y1="32" x2="56" y2="32" stroke="#000" strokeWidth="2" />
              <rect x="12" y="20" width="40" height="8" fill="#FFF" />
            </svg>
            <p>Bank Transfer</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="payments-footer">
        <p>
          Need help with a payment?{" "}
          <a href="/support" className="support-link">
            Contact Support
          </a>
        </p>
        <p className="footer-note">© 2025 Digital Equb. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Payments;
