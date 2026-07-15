// src/components/Navbar.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth.ts";
import "../styles/Navbar.css";
interface NavbarProps {
  openSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openSidebar }) => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <span className="welcome-text" onClick={openSidebar}>
        Welcome!
      </span>
      <button
        onClick={logout}
        className="logout-btn"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
