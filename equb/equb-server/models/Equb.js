import mongoose from "mongoose";

const equbSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  contribution: { type: Number, required: true, min: 1 },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  maxMembers: { type: Number, required: true, min: 1, max: 12 },
  cycle: { type: String, enum: ["Monthly"], default: "Monthly" },
  nextDraw: { type: Date, required: true },
  policyAgreed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Equb", equbSchema);
