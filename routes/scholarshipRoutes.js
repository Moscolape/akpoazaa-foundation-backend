const express = require("express");
const {
  registerScholarship,
  registerFoundationScholarship,
  getAllScholarshipApplicants,
  verifyEmail,
  getAllAkpoazaaScholarshipApplicants
} = require("../controllers/scholarshipControllers");
const upload = require("../config/multerConfig");

const router = express.Router();

router.post("/register", registerScholarship);
router.post(
  "/foundation/register",
  upload.fields([{ name: "passport", maxCount: 1 }]),
  registerFoundationScholarship
);

router.get("/applicants", getAllScholarshipApplicants);
router.get("/foundation/applicants", getAllAkpoazaaScholarshipApplicants);

router.get("/verify-email", verifyEmail);

module.exports = router;
