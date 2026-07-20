const mongoose = require("mongoose");

// Hero is a SINGLETON - only one document should ever exist.
const heroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Lakshya Bhartiya" },
    role: { type: String, required: true, default: "MERN Stack Developer" },
    tagline: { type: String, required: true }, // e.g. "Full Stack MERN Developer passionate about..."
    profileImage: { type: String, default: "" }, // Cloudinary URL
    resumeUrl: { type: String, default: "" }, // Cloudinary/uploaded PDF URL
    ctaButtons: {
      viewProjectsLabel: { type: String, default: "View Projects" },
      contactLabel: { type: String, default: "Contact Me" },
      resumeLabel: { type: String, default: "Download Resume" },
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);
