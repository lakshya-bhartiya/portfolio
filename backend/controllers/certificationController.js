const asyncHandler = require("express-async-handler");
const Certification = require("../models/Certification");

// @desc    Get all certifications (public, ordered)
// @route   GET /api/certifications
// @access  Public
const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.find().sort({ order: 1 });
  res.json({ success: true, count: certifications.length, data: certifications });
});

// @desc    Create certification
// @route   POST /api/admin/certifications
// @access  Private
const createCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.create(req.body);
  res.status(201).json({ success: true, data: cert });
});

// @desc    Update certification
// @route   PUT /api/admin/certifications/:id
// @access  Private
const updateCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findById(req.params.id);
  if (!cert) {
    res.status(404);
    throw new Error("Certification not found");
  }
  cert.set(req.body);
  await cert.save();
  res.json({ success: true, data: cert });
});

// @desc    Delete certification
// @route   DELETE /api/admin/certifications/:id
// @access  Private
const deleteCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findById(req.params.id);
  if (!cert) {
    res.status(404);
    throw new Error("Certification not found");
  }
  await cert.deleteOne();
  res.json({ success: true, message: "Certification deleted" });
});

module.exports = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
};
