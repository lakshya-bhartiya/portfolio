const mongoose = require("mongoose");

// Contact is a SINGLETON - only one document should ever exist.
const contactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
