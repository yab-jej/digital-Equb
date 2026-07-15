import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className={`layout ${sidebarOpen ? "" : "sidebar-closed"}`}>
      <Sidebar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
      <div className="main-section">
        {/* Pass the function as prop */}
        <Navbar openSidebar={openSidebar} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

