const Scholarship = require("../models/scholarship");
const FoundationScholarship = require("../models/foundationScholarship");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Register a new scholarship applicant with email verification
exports.registerScholarship = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, fullName } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await Scholarship.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(400).json({
          message:
            "Email already exists but is not verified. Please check your email for verification.",
        });
      }
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Generate a verification token (valid for 1 hour)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    // Save verification token in the database
    const newScholarship = new Scholarship({
      ...req.body,
      isVerified: false,
      verificationToken: token,
      verificationTokenExpires: new Date(Date.now() + 3600000),
    });

    await newScholarship.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Scholarship Application Email",
      html: `
        <div style="display: flex; justify-content: space-between; align-items: items-start">
        <div>
          <h5>Hello ${fullName},</h5>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${process.env.BASE_URL}/verify-email?token=${token}">Verify Email</a>
          <p>This link will expire in 5 minutes.</p>
        </div>
        <img src="https://iamakpoazaa.netlify.app/assets/Akpoazaa%20Foundation%20Logo-CKIMWbzR.png" alt="Scholarship Logo" width="150" />
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        "Verification email sent!! Please check your inbox (also check your spam folder).",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Scholarship.findOne({ email: decoded.email });
    
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if token matches and is still valid
    if (user.verificationToken !== token || user.verificationTokenExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await user.updateOne({
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });

    res.status(200).json({ message: "Applicant has been verified!!" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(400).json({ message: error.message || "Invalid token" });
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


exports.registerFoundationScholarship = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

    if (!req.files.passport) {
    return res
      .status(400)
      .json({ message: "Required file is missing!" });
  }

  const { email, fullName } = req.body;

  try {
    const passport = req.files.passport[0].path.replace(/\\/g, "/");

    const existingUser = await FoundationScholarship.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(400).json({
          message:
            "Email already exists but is not verified. Please check your email for verification.",
        });
      }
      return res.status(400).json({ message: "Email already exists!" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    const newScholarship = new FoundationScholarship({
      ...req.body,
      passport,
      isVerified: false,
      verificationToken: token,
      verificationTokenExpires: new Date(Date.now() + 3600000),
    });

    await newScholarship.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Scholarship Application Email",
      html: `
        <div style="display: flex; justify-content: space-between; align-items: items-start">
        <div>
          <h5>Hello ${fullName},</h5>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${process.env.BASE_URL}/verify-email?token=${token}">Verify Email</a>
          <p>This link will expire in 5 minutes.</p>
        </div>
        <img src="https://iamakpoazaa.netlify.app/assets/Akpoazaa%20Foundation%20Logo-CKIMWbzR.png" alt="Scholarship Logo" width="150" />
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        "Verification email sent!! Please check your inbox (also check your spam folder).",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};