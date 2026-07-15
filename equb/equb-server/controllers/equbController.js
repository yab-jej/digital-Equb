import Equb from "../models/Equb.js";

// @desc   Create new Equb
// @route  POST /api/equbs/create
// @access Private
export const createEqub = async (req, res) => {
  try {
    console.log("DEBUG - req.user:", req.user); // log authenticated user
    console.log("DEBUG - req.body:", req.body); // log payload

    const { name, contribution, maxMembers, policyAgreed } = req.body;

    // Validation
    if (!name || !contribution || !req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "Name, contribution, and authenticated user are required."
      });
    }

    if (!policyAgreed) {
      return res.status(400).json({
        success: false,
        message: "You must agree to the Equb policy."
      });
    }

    // Check if Equb name already exists
    const existing = await Equb.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: "An Equb with this name already exists." });
    }

    // Calculate next draw date (1 month from now)
    const nextDraw = new Date();
    nextDraw.setMonth(nextDraw.getMonth() + 1);

    // Create Equb
    const newEqub = await Equb.create({
      name,
      contribution,
      members: [req.user.id],
      admin: req.user.id,
      maxMembers,
      cycle: "Monthly",
      nextDraw,
      policyAgreed,
    });

    return res.status(201).json({ success: true, equb: newEqub });
  } catch (error) {
    console.error("Create Equb Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
