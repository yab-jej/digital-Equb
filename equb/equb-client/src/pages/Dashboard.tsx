import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { getDashboard } from "../routes/dashboardRoute";

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getDashboard();
        setUserName(data.name || data.email || "User");
      } catch (err) {
        console.error("Failed to fetch dashboard info:", err);
        setUserName("User");
      }
    };

    loadUser();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-gradient-bg"></div>

        <div className="dashboard-logo">
          <svg
            width="96"
            height="96"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="48" stroke="#fbbf24" strokeWidth="4" fill="#fff8eb" />
            <g className="inner-circles">
              <circle cx="35" cy="50" r="10" stroke="#4ade80" strokeWidth="3" fill="#e0f7ef" />
              <circle cx="65" cy="50" r="10" stroke="#f87171" strokeWidth="3" fill="#fee2e2" />
            </g>
            <path d="M50 40 L45 55 L50 60 L55 55 Z" fill="#f59e0b" />
            <path d="M50 60 L45 65 L50 70 L55 65 Z" fill="#10b981" />
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#7c3aed"
              fontFamily="Inter, sans-serif"
            >
              DE
            </text>
          </svg>
        </div>

        <h1 className="dashboard-title">
          Welcome back, <span className="gradient-text">{userName}</span> 👋
        </h1>
        <p className="dashboard-subtitle">
          Manage your Equb activities with ease and transparency.
        </p>
      </header>

      <main className="dashboard-main">
        <div className="info-card indigo-card">
          <h2>What is Digital Equb?</h2>
          <p>
            Digital Equb modernizes traditional group saving by connecting
            members online, ensuring transparency, and automating the entire
            contribution cycle.
          </p>
        </div>

        <div className="info-card violet-card">
          <h2>How It Works</h2>
          <p>
            Join or create groups, contribute on schedule, and receive your turn
            automatically — no manual follow-up needed. The process is secure,
            traceable, and fair.
          </p>
        </div>

        <div className="info-card pink-card">
          <h2>Why Choose Digital Equb?</h2>
          <p>
            Enjoy automation, instant notifications, and transparent tracking of
            your savings. Save smarter — no stress, no missed turns.
          </p>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p className="footer-title">Digital Equb System</p>
        <p>Email: support@digitalequb.com | Phone: +251 900 123 456</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} Digital Equb. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
