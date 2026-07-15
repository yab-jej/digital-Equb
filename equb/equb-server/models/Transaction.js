import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
