import express from "express";
import {
  getCreatedEqubs,
  getActiveEqubs,
  getAvailableEqubs,
} from "../controllers/myEqubController.js";

const router = express.Router();

// GET groups created by logged-in user
router.get("/created/:userId", getCreatedEqubs);

// GET groups joined by logged-in user (active)
router.get("/active/:userId", getActiveEqubs);

// GET groups not joined by logged-in user (available)
router.get("/available/:userId", getAvailableEqubs);

export default router;
