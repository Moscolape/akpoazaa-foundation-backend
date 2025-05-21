const mongoose = require("mongoose");

const foundationScholarshipSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dob: { type: String, required: true },
    stateOrigin: { type: String, required: true },
    lgaOrigin: { type: String, required: true },
    category: {
      type: String,
      enum: ["Primary", "Secondary", "Tertiary"],
      required: true,
    },
    guardianName: { type: String, required: true },
    relationshipWithWard: {
      type: String,
      enum: ["Father", "Mother", "Guardian"],
      required: true,
    },
    guardianPhone: { type: String, required: true },
    schoolName: { type: String, required: true },
    schoolState: { type: String, required: true },
    schoolLGA: { type: String, required: true },
    schoolFees: { type: String, required: true },
    schoolBank: { type: String, required: true },
    schoolAccountNo: { type: String, required: true },
    schoolAccountName: { type: String, required: true },
    schoolPhone: { type: String, required: true },
    referralName: { type: String },
    referralPhone: { type: String },
    reason: { type: String, required: true },
    declaration: { type: Boolean, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date }
  },
  { timestamps: true }
);

const FoundationScholarship = mongoose.model("FoundationScholarship", foundationScholarshipSchema);
module.exports = FoundationScholarship;