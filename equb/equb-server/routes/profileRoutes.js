import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getProfile, updateProfile, withdraw } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);
router.post("/withdraw", verifyToken, withdraw);

export default router;
