import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/CreateEqub.css";

interface EqubPayload {
  name: string;
  contribution: number;
  maxMembers: number;
  policyAgreed: boolean;
}

const CreateEqub: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token, user } = useAuth();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [membersCount, setMembersCount] = useState<number>(1);
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn || !token || !user) {
    return <p>Loading authentication...</p>;
  }

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === "object" && error !== null && "message" in error) {
      return (error as { message: string }).message;
    }
    return "Unknown error occurred";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!policyAgreed) {
      return alert("You must agree to the Equb policy before continuing.");
    }

    const payload: EqubPayload = {
      name,
      contribution: amount,
      maxMembers: membersCount,
      policyAgreed,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/equbs/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        console.log("Created Equb:", res.data.equb);
        navigate("/my-equbs", { state: { newEqub: res.data.equb } });
      } else {
        alert(res.data.message || "Failed to create Equb");
      }
    } catch (err: unknown) {
      console.error(err);
      const message = getErrorMessage(err);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-equb-container">
      <h1>Create a New Equb</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="equbName">Group Name</label>
          <input
            id="equbName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="equbAmount">Contribution Amount (ETB)</label>
          <input
            id="equbAmount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            min={1}
          />
        </div>

        <div>
          <label htmlFor="equbMembers">Max Members</label>
          <input
            id="equbMembers"
            type="number"
            value={membersCount}
            onChange={(e) => setMembersCount(Number(e.target.value))}
            min={1}
            max={12}
            required
          />
        </div>

        <div className="create-equb-policy">
          <label>
            <input
              type="checkbox"
              checked={policyAgreed}
              onChange={(e) => setPolicyAgreed(e.target.checked)}
            />{" "}
            I agree to the{" "}
            <button
              type="button"
              className="policy-toggle"
              onClick={() => setShowPolicy(!showPolicy)}
            >
              Equb Agreement & Policy
            </button>
          </label>

          {showPolicy && (
            <div className="policy-box">
              <h3>Digital Equb Agreement</h3>
              <p>
                By joining or creating an Equb, you commit to contributing the agreed amount on schedule. 
                Members are expected to maintain honesty, respect group rules, and uphold financial fairness.
              </p>
              <h3>Privacy Policy</h3>
              <p>
                We store only essential user data for identification within the platform. 
                No personal or financial data will be shared externally without consent.
              </p>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Equb"}
        </button>
      </form>
    </div>
  );
};

export default CreateEqub;
