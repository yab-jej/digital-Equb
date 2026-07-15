// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { getProfile, updateProfile, withdrawBalance } from "../service/profileService.ts";

interface Transaction {
  _id: string;
  type: "Deposit" | "Withdrawal";
  amount: number;
  paymentMethod: string;
  date: string;
  status: "Completed" | "Pending";
}

interface User {
  _id: string;
  name: string;
  email: string;
  balance: number;
  transactions: Transaction[];
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawMethod, setWithdrawMethod] = useState<string>("Chapa");

  const [showEditForm, setShowEditForm] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileData = await getProfile();
        setUser(profileData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync edit form when user loads
  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditEmail(user.email);
    }
  }, [user]);

  // Handle profile update
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim() || !user) return;

    try {
      const updatedUser = await updateProfile({ name: editName, email: editEmail });
      setUser(updatedUser);
      setShowEditForm(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile");
    }
  };

  // Handle withdraw
  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (withdrawAmount <= 0 || withdrawAmount > user.balance) {
      alert("Invalid or insufficient balance.");
      return;
    }

    try {
      const res = await withdrawBalance(withdrawAmount, withdrawMethod);
      setUser(res.user);
      setShowWithdrawForm(false);
      setWithdrawAmount(0);
      alert(`Withdrawn ${withdrawAmount} ETB via ${withdrawMethod}`);
    } catch (err) {
      console.error("Withdraw error:", err);
      alert("Failed to process withdrawal");
    }
  };

  if (loading) return <div className="profile-container"><p>Loading...</p></div>;
  if (!user) return <div className="profile-container"><p>User not found</p></div>;

  // Ensure transactions is always an array
  const transactions = user.transactions || [];

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1>{user.name}</h1>
        <p>{user.email}</p>

        <button
          className="edit-profile-btn"
          onClick={() => setShowEditForm(!showEditForm)}
        >
          {showEditForm ? "Cancel" : "Edit Profile"}
        </button>

        {showEditForm && (
          <form className="edit-profile-form" onSubmit={handleEditSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="submit-edit-btn">
              Save Changes
            </button>
          </form>
        )}
      </div>

      {/* Wallet Section */}
      <div className="wallet-section">
        <h2>Total Balance</h2>
        <p className="balance">{user.balance} ETB</p>

        <button
          className="withdraw-btn"
          onClick={() => setShowWithdrawForm(!showWithdrawForm)}
        >
          {showWithdrawForm ? "Cancel" : "Withdraw"}
        </button>

        {showWithdrawForm && (
          <form className="withdraw-form" onSubmit={handleWithdrawSubmit}>
            <label>
              Amount (ETB):
              <input
                type="number"
                value={withdrawAmount || ""}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                min={1}
                max={user.balance}
                required
              />
            </label>

            <label>
              Payment Method:
              <select
                value={withdrawMethod}
                onChange={(e) => setWithdrawMethod(e.target.value)}
              >
                <option value="Chapa">💳 Chapa</option>
                <option value="M-Pesa">📱 M-Pesa</option>
                <option value="Telebirr">📡 Telebirr</option>
                <option value="Bank Transfer">🏦 Bank Transfer</option>
              </select>
            </label>

            <button type="submit" className="submit-withdraw-btn">
              Confirm Withdraw
            </button>
          </form>
        )}
      </div>

      {/* Transactions */}
      <div className="transactions-section">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <div className="transactions-grid">
            {transactions.map((t) => (
              <div
                key={t._id}
                className={`transaction-card ${t.type.toLowerCase()}`}
              >
                <p>
                  <strong>{t.type}</strong> - {t.amount} ETB
                </p>
                <p>Method: {t.paymentMethod}</p>
                <p>Date: {new Date(t.date).toLocaleString()}</p>
                <p>Status: {t.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
