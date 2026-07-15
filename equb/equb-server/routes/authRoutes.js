import express from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  verifyResetOtp,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password-request", requestPasswordReset);
router.post("/reset-password-verify", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;

