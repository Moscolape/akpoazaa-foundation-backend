const express = require("express");
const {
  registerScholarship,
  getAllScholarshipApplicants,
} = require("../controllers/scholarshipControllers");

const router = express.Router();

// POST /scholarship/register - Register Scholarship Applicant
router.post("/register", registerScholarship);

// GET /scholarship/applicants - Retrieve all Scholarship Applicants
router.get("/applicants", getAllScholarshipApplicants);

module.exports = router;
