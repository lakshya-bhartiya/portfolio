const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true }, // e.g. "Full Stack Developer Intern"
    company: { type: String, required: true }, // e.g. "Codiotic Technologies"
    location: { type: String, default: "" },
    startDate: { type: String, required: true }, // stored as "Jan 2024" style string for simplicity
    endDate: { type: String, default: "" }, // empty if current
    current: { type: Boolean, default: false },
    points: [{ type: String }], // bullet points: "Built MERN applications", "Developed REST APIs", etc.
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ order: 1 });

module.exports = mongoose.model("Experience", experienceSchema);
