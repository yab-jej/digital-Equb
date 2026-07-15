import User from "../models/User.js";

export const getDashboardInfo = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("DashboardController error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
