const Scholarship = require("../models/scholarship");
const { validationResult } = require("express-validator");

// Register a new scholarship applicant
exports.registerScholarship = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("Request Body:", req.body);

  try {
    const newScholarship = new Scholarship({
      ...req.body, // Include all form fields
    });

    await newScholarship.save();
    res.status(201).json({
      message: "Scholarship application submitted successfully",
      applicant: newScholarship,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all scholarship applicants
exports.getAllScholarshipApplicants = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
  
    try {
      const totalApplicants = await Scholarship.countDocuments();
      const applicants = await Scholarship.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);
  
      res.status(200).json({
        message: "Scholarship applicants fetched successfully!",
        applicants,
        totalApplicants,
        currentPage: page,
        totalPages: Math.ceil(totalApplicants / perPage),
        perPage,
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  };
  