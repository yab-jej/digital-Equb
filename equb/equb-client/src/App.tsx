// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import MyEqubs from "./pages/MyEqubs";
import CreateEqub from "./pages/CreateEqub";
import Payments from "./pages/Payments";
import Disputes from "./pages/Disputes";
import Profile from "./pages/Profile";
import EqubDetail from "./pages/EqubDetail"; // ✅ added

// Layout + ProtectedRoute
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/my-equbs"
  element={
    <ProtectedRoute>
      <Layout>
        <MyEqubs />
      </Layout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/equb/:id" // ✅ dynamic route for Equb detail
          element={
            <ProtectedRoute>
              <Layout>
                <EqubDetail />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-equb"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateEqub />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Layout>
                <Payments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/disputes"
          element={
            <ProtectedRoute>
              <Layout>
                <Disputes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
