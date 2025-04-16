const express = require("express");
const router = express.Router();
const { verifyDonation } = require("../controllers/donationController");

// POST /api/donations/verify
router.post("/verify", verifyDonation);

module.exports = router;