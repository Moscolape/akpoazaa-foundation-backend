const express = require("express");
const {
  registerScholarship,
  registerFoundationScholarship,
  getAllScholarshipApplicants,
  verifyEmail,
} = require("../controllers/scholarshipControllers");
const upload = require("../config/multerConfig");


const router = express.Router();

// POST /scholarship/register - Register Scholarship Applicant
router.post("/register", registerScholarship);
router.post(
  "/foundation/register",
  upload.fields([{ name: "passport", maxCount: 1 }]),
  registerFoundationScholarship
);

// GET /scholarship/applicants - Retrieve all Scholarship Applicants
router.get("/applicants", getAllScholarshipApplicants);

router.get("/verify-email", verifyEmail);

module.exports = router;
