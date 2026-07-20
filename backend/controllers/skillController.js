const asyncHandler = require("express-async-handler");
const Skill = require("../models/Skill");

// @desc    Get all skills (public - grouped by category, ordered)
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1 });
  res.json({ success: true, count: skills.length, data: skills });
});

// @desc    Create a new skill
// @route   POST /api/admin/skills
// @access  Private
const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ success: true, data: skill });
});

// @desc    Update a skill
// @route   PUT /api/admin/skills/:id
// @access  Private
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }
  skill.set(req.body);
  await skill.save();
  res.json({ success: true, data: skill });
});

// @desc    Delete a skill
// @route   DELETE /api/admin/skills/:id
// @access  Private
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }
  await skill.deleteOne();
  res.json({ success: true, message: "Skill deleted" });
});

// @desc    Reorder skills in bulk (drag-drop in admin panel)
// @route   PUT /api/admin/skills/reorder
// @access  Private
// body: { items: [{ id, order }, ...] }
const reorderSkills = asyncHandler(async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    res.status(400);
    throw new Error("items must be an array of { id, order }");
  }
  await Promise.all(
    items.map((item) => Skill.findByIdAndUpdate(item.id, { order: item.order }))
  );
  res.json({ success: true, message: "Skills reordered" });
});

module.exports = { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills };
