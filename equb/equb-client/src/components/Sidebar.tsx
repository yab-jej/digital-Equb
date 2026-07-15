import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "My Equbs", path: "/my-equbs" },
    { name: "Create Equb", path: "/create-equb" },
    { name: "Payments", path: "/payments" },
    { name: "Disputes", path: "/disputes" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h1 className="sidebar-title" onClick={toggleSidebar}>
        Digital Equb
      </h1>
      <nav className="sidebar-links">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            onClick={() => {
              if (isOpen) toggleSidebar(); // Auto-close sidebar on click
            }}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">© 2025 Digital Equb</div>
    </aside>
  );
};

export default Sidebar;
