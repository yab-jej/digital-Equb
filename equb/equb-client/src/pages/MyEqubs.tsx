// src/pages/MyEqubs.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/MyEqubs.css";
import { useAuth } from "../context/AuthContext";

interface Equb {
  _id: string;
  name: string;
  amount: number;
  members: string[];
  status: string;
}

const API_URL = "http://localhost:5000/api/myequbs";

const MyEqubs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, token } = useAuth();

  const [createdEqubs, setCreatedEqubs] = useState<Equb[]>([]);
  const [activeEqubs, setActiveEqubs] = useState<Equb[]>([]);
  const [availableEqubs, setAvailableEqubs] = useState<Equb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Safe fetch function with dependencies handled
  const fetchEqubs = useCallback(
    async (endpoint: string): Promise<Equb[]> => {
      if (!user?._id || !token) return [];
      try {
        const res = await axios.get<Equb[]>(
          `${API_URL}/${endpoint}/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
      } catch (err) {
        console.error(`Failed to fetch ${endpoint} Equbs`, err);
        return [];
      }
    },
    [user?._id, token]
  );

  useEffect(() => {
    const loadEqubs = async () => {
      if (!isLoggedIn || !user || !token) {
        setError("You must be logged in to view your Equbs.");
        setLoading(false);
        return;
      }

      try {
        const [created, active, available] = await Promise.all([
          fetchEqubs("created"),
          fetchEqubs("active"),
          fetchEqubs("available"),
        ]);

        const newEqub = location.state?.newEqub as Equb | undefined;
        setCreatedEqubs(newEqub ? [newEqub, ...created] : created);
        setActiveEqubs(active);
        setAvailableEqubs(available);
      } catch {
        setError("Failed to load Equb data.");
      } finally {
        setLoading(false);
      }
    };

    loadEqubs();
  }, [isLoggedIn, user, token, location.state, fetchEqubs]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading your Equbs...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );

  const renderEqubSection = (title: string, equbs: Equb[]) => (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">
        {title}
      </h2>
      {equbs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equbs.map((eqb) => (
            <div
              key={eqb._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">💰</span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    eqb.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {eqb.status}
                </span>
              </div>
              <h3 className="text-lg font-bold">{eqb.name}</h3>
              <p className="text-gray-600 mt-1">💸 {eqb.amount} ETB</p>
              <p className="text-gray-600">
                👥 {eqb.members?.length || 0} Members
              </p>
              <button
                onClick={() => navigate(`/equb/${eqb._id}`)}
                className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition-all"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No {title.toLowerCase()} found.</p>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 px-6 md:px-12 py-10 text-gray-800">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            My Equbs
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your Equb groups in one place
          </p>
        </div>
        <button
          onClick={() => navigate("/create-equb")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-transform hover:scale-105"
        >
          + Create New Equb
        </button>
      </header>

      {renderEqubSection("Your Created Groups", createdEqubs)}
      {renderEqubSection("Active Groups", activeEqubs)}
      {renderEqubSection("Available Groups", availableEqubs)}
    </div>
  );
};

export default MyEqubs;
