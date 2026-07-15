import express from "express";
import { createEqub } from "../controllers/equbController.js";
import { protect } from "../middleware/auth.js"; // Optional: user authentication middleware

const router = express.Router();

// Create new Equb
router.post("/create", protect, createEqub);

export default router;
