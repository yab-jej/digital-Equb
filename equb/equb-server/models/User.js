import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  resetOtp: { type: String },
  resetOtpExpiry: { type: Date },
 createdEqubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equb" }],
  joinedEqubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equb" }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
