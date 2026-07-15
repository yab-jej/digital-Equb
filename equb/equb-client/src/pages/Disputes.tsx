// src/pages/Disputes.tsx
import React, { useState } from "react";
import "../styles/Disputes.css";

interface Dispute {
  id: number;
  equbName: string;
  submittedBy: string;
  issueType: "Payment" | "Member" | "Other";
  status: "Pending" | "Under Review" | "Resolved";
  date: string;
  description: string;
}

const Disputes: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: 1,
      equbName: "Sunshine Equb",
      submittedBy: "Alice",
      issueType: "Payment",
      status: "Pending",
      date: "2025-10-20",
      description: "Payment not received despite confirmation.",
    },
    {
      id: 2,
      equbName: "Unity Circle",
      submittedBy: "Bob",
      issueType: "Member",
      status: "Under Review",
      date: "2025-10-18",
      description: "Member did not contribute on time.",
    },
    {
      id: 3,
      equbName: "Bright Future Group",
      submittedBy: "Charlie",
      issueType: "Other",
      status: "Resolved",
      date: "2025-10-10",
      description: "Dispute resolved by admin approval.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newDispute, setNewDispute] = useState({
    equbName: "",
    submittedBy: "",
    issueType: "Payment" as "Payment" | "Member" | "Other",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDispute((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = disputes.length ? disputes[disputes.length - 1].id + 1 : 1;
    setDisputes([
      ...disputes,
      {
        id: nextId,
        equbName: newDispute.equbName,
        submittedBy: newDispute.submittedBy,
        issueType: newDispute.issueType,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        description: newDispute.description,
      },
    ]);
    setShowForm(false);
    setNewDispute({ equbName: "", submittedBy: "", issueType: "Payment", description: "" });
  };

  return (
    <div className="disputes-container">
      <h1 className="text-2xl font-bold mb-4">Disputes</h1>
      <p className="mb-6">Manage and resolve disputes from Equb members.</p>

      <button className="new-dispute-btn mb-4" onClick={() => setShowForm(true)}>
        + New Dispute
      </button>

      {/* New Dispute Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="font-bold text-xl mb-4">Submit a New Dispute</h2>
            <form onSubmit={handleSubmit} className="dispute-form">
              <label>
                Equb Name:
                <input
                  type="text"
                  name="equbName"
                  value={newDispute.equbName}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Submitted By:
                <input
                  type="text"
                  name="submittedBy"
                  value={newDispute.submittedBy}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Issue Type:
                <select name="issueType" value={newDispute.issueType} onChange={handleInputChange}>
                  <option value="Payment">Payment</option>
                  <option value="Member">Member</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Description:
                <textarea
                  name="description"
                  value={newDispute.description}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dispute List */}
      <div className="disputes-grid">
        {disputes.map((d) => (
          <div
            key={d.id}
            className={`dispute-card ${
              d.status === "Pending"
                ? "pending"
                : d.status === "Under Review"
                ? "under-review"
                : "resolved"
            }`}
          >
            <h3 className="equb-name font-semibold">{d.equbName}</h3>
            <p>
              <strong>Submitted by:</strong> {d.submittedBy}
            </p>
            <p>
              <strong>Issue Type:</strong> {d.issueType}
            </p>
            <p>
              <strong>Status:</strong> {d.status}
            </p>
            <p>
              <strong>Date:</strong> {d.date}
            </p>
            <p className="description">{d.description}</p>
            {d.status !== "Resolved" && (
              <button className="resolve-btn mt-2">Mark as Resolved</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disputes;
