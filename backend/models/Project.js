const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "ElectroFix"
    description: { type: String, required: true },
    images: [{ type: String }], // Cloudinary URLs, first one = cover image
    techStack: [{ type: String }], // e.g. ["Next.js", "React Native", "Express", "MongoDB"]
    features: [{ type: String }], // e.g. ["OTP Login", "Admin Panel", "Live Tracking"]
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    videoLink: { type: String, default: "" },
    caseStudyLink: { type: String, default: "" },
    featured: { type: Boolean, default: false }, // show in "Featured Projects" section
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ featured: 1, order: 1 });

module.exports = mongoose.model("Project", projectSchema);
