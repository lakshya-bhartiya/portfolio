const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true }, // e.g. "BCA"
    institution: { type: String, required: true },
    year: { type: String, required: true },
    grade: { type: String, default: "" }, // CGPA/percentage
  },
  { _id: false }
);

// About is a SINGLETON - only one document should ever exist.
const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true }, // long-form "who you are" text
    education: [educationSchema],
    experienceSummary: { type: String, default: "" },
    technologies: [{ type: String }], // quick tag list, e.g. ["React", "Node.js", "MongoDB"]
    careerGoals: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
