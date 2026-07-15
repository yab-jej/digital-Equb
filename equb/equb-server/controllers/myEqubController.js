import Equb from "../models/Equb.js";

// 1. Fetch groups created by the user
export const getCreatedEqubs = async (req, res) => {
  const { userId } = req.params;

  try {
    const created = await Equb.find({ admin: userId }).sort({ createdAt: -1 });
    res.status(200).json(created);
  } catch (error) {
    console.error("Error fetching created Equbs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Fetch active/joined groups for the user
export const getActiveEqubs = async (req, res) => {
  const { userId } = req.params;

  try {
    const active = await Equb.find({ members: userId, status: "Active" }).sort({ createdAt: -1 });
    res.status(200).json(active);
  } catch (error) {
    console.error("Error fetching active Equbs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. Fetch available groups (not joined by the user)
export const getAvailableEqubs = async (req, res) => {
  const { userId } = req.params;

  try {
    const available = await Equb.find({ members: { $ne: userId } }).sort({ createdAt: -1 });
    res.status(200).json(available);
  } catch (error) {
    console.error("Error fetching available Equbs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
