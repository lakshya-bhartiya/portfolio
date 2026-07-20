const asyncHandler = require("express-async-handler");
const Experience = require("../models/Experience");

// @desc    Get all experience entries (public, ordered)
// @route   GET /api/experience
// @access  Public
const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.find().sort({ order: 1 });
  res.json({ success: true, count: experience.length, data: experience });
});

// @desc    Create experience entry
// @route   POST /api/admin/experience
// @access  Private
const createExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.create(req.body);
  res.status(201).json({ success: true, data: exp });
});

// @desc    Update experience entry
// @route   PUT /api/admin/experience/:id
// @access  Private
const updateExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) {
    res.status(404);
    throw new Error("Experience entry not found");
  }
  exp.set(req.body);
  await exp.save();
  res.json({ success: true, data: exp });
});

// @desc    Delete experience entry
// @route   DELETE /api/admin/experience/:id
// @access  Private
const deleteExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) {
    res.status(404);
    throw new Error("Experience entry not found");
  }
  await exp.deleteOne();
  res.json({ success: true, message: "Experience entry deleted" });
});

module.exports = { getExperience, createExperience, updateExperience, deleteExperience };
