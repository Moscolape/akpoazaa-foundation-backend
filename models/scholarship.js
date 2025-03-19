const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dob: { type: String, required: true },
    village: { type: String, required: true },
    town: { type: String, required: true },
    stateResidence: { type: String, required: true },
    obiArea: { type: String, required: true },
    category: {
      type: String,
      enum: ["Primary", "Secondary", "Tertiary"],
      required: true,
    },
    guardianName: { type: String, required: true },
    guardianBank: { type: String, required: true },
    guardianAccountNo: { type: String, required: true },
    guardianAccountName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    schoolName: { type: String, required: true },
    schoolState: { type: String, required: true },
    schoolLGA: { type: String, required: true },
    schoolBank: { type: String, required: true },
    schoolAccountNo: { type: String, required: true },
    schoolAccountName: { type: String, required: true },
    schoolPhone: { type: String, required: true },
    referralName: { type: String },
    referralPhone: { type: String },
    reason: { type: String, required: true },
    declaration: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
module.exports = Scholarship;