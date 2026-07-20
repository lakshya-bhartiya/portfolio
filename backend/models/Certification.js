const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "MongoDB Developer Certification"
    issuer: { type: String, required: true }, // e.g. "MongoDB University"
    date: { type: String, required: true }, // e.g. "March 2025"
    image: { type: String, default: "" }, // certificate image/badge URL
    credentialUrl: { type: String, default: "" }, // verify link
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

certificationSchema.index({ order: 1 });

module.exports = mongoose.model("Certification", certificationSchema);
