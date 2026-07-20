const asyncHandler = require("express-async-handler");
const Achievement = require("../models/Achievement");

// @desc    Get all achievements (public, ordered)
// @route   GET /api/achievements
// @access  Public
const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find().sort({ order: 1 });
  res.json({ success: true, count: achievements.length, data: achievements });
});

// @desc    Create achievement
// @route   POST /api/admin/achievements
// @access  Private
const createAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.create(req.body);
  res.status(201).json({ success: true, data: achievement });
});

// @desc    Update achievement
// @route   PUT /api/admin/achievements/:id
// @access  Private
const updateAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (!achievement) {
    res.status(404);
    throw new Error("Achievement not found");
  }
  achievement.set(req.body);
  await achievement.save();
  res.json({ success: true, data: achievement });
});

// @desc    Delete achievement
// @route   DELETE /api/admin/achievements/:id
// @access  Private
const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (!achievement) {
    res.status(404);
    throw new Error("Achievement not found");
  }
  await achievement.deleteOne();
  res.json({ success: true, message: "Achievement deleted" });
});

module.exports = {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
