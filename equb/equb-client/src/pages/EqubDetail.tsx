import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EqubDetail.css";

interface Equb {
  id: number;
  name: string;
  logo: string;
  contribution: number;
  members: string[];
  cycle: string;
  nextDraw: string;
  status: string;
  admin: string;
}

const EqubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const equbId = Number(id);

  const [allEqubs, setAllEqubs] = useState<Equb[] | null>(null); // null until loaded
  const [chatMessages, setChatMessages] = useState<{ user: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("equbs");
    const userEqubs: Equb[] = stored ? JSON.parse(stored) : [];

    const defaultEqubs: Equb[] = [
      { id: 1, name: "Addis Unity Equb", logo: "💰", contribution: 5000, members: ["Marta", "Samuel", "Lidya", "You"], cycle: "Monthly", nextDraw: "Nov 5, 2025", status: "Active", admin: "You" },
      { id: 2, name: "Tech Circle Equb", logo: "🖥️", contribution: 1000, members: ["Abel", "Selam", "Mikiyas"], cycle: "Monthly", nextDraw: "Oct 30, 2025", status: "Active", admin: "Selam" },
      { id: 3, name: "Ethiopian Traders Equb", logo: "📈", contribution: 2000, members: ["Kifle", "Sara"], cycle: "Weekly", nextDraw: "Oct 25, 2025", status: "Open", admin: "Kifle" },
    ];

    setAllEqubs([...defaultEqubs, ...userEqubs]);
  }, []);

  if (!allEqubs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Equb details...</p>
      </div>
    );
  }

  const equb = allEqubs.find((eqb) => eqb.id === equbId);

  if (!equb) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Equb not found!</h1>
        <button
          onClick={() => navigate("/my-equbs")}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          ← Back to My Equbs
        </button>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setChatMessages([...chatMessages, { user: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="equb-detail-page min-h-screen bg-gray-50 px-6 md:px-12 py-10 text-gray-800">
      <button
        onClick={() => navigate("/my-equbs")}
        className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
      >
        ← Back to My Equbs
      </button>

      <div className="equb-info bg-white shadow-lg rounded-2xl p-6 mb-10">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{equb.logo}</span>
          <h1 className="text-3xl font-bold">{equb.name}</h1>
          <span
            className={`ml-auto px-3 py-1 rounded-full font-semibold ${
              equb.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {equb.status}
          </span>
        </div>
        <p>💸 Contribution: {equb.contribution} ETB / {equb.cycle}</p>
        <p>🔁 Cycle: {equb.cycle}</p>
        <p>📅 Next Draw: {equb.nextDraw}</p>
        <p>👤 Admin: {equb.admin}</p>
        <p>👥 Members ({equb.members.length}): {equb.members.join(", ")}</p>
      </div>

      <div className="equb-chat bg-white shadow-lg rounded-2xl p-6 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Group Chat</h2>
        <div className="chat-messages flex-1 overflow-y-auto mb-4 max-h-96 border rounded-lg p-3 bg-gray-50">
          {chatMessages.length === 0 && <p className="text-gray-400">No messages yet...</p>}
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold">{msg.user}: </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EqubDetail;
