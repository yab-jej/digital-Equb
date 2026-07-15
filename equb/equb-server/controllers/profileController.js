import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// GET profile info
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json({ ...user.toObject(), transactions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE profile info
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// WITHDRAW balance
export const withdraw = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (amount <= 0 || amount > user.balance)
      return res.status(400).json({ message: "Invalid or insufficient balance" });

    user.balance -= amount;
    await user.save();

    const transaction = await Transaction.create({
      user: req.user.id,
      type: "Withdrawal",
      amount,
      paymentMethod,
      status: "Completed",
    });

    res.json({ user, transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
