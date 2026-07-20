const asyncHandler = require("express-async-handler");
const About = require("../models/About");

// @desc    Get about content (public)
// @route   GET /api/about
// @access  Public
const getAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({ bio: "Write something about yourself here." });
  }
  res.json({ success: true, data: about });
});

// @desc    Update about content
// @route   PUT /api/admin/about
// @access  Private
const updateAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create(req.body);
  } else {
    about.set(req.body);
    await about.save();
  }
  res.json({ success: true, data: about });
});

module.exports = { getAbout, updateAbout };
