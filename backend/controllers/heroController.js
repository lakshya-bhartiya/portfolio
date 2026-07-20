const asyncHandler = require("express-async-handler");
const Hero = require("../models/Hero");

// @desc    Get hero content (public - used by portfolio)
// @route   GET /api/hero
// @access  Public
const getHero = asyncHandler(async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) {
    // auto-create an empty default doc so the admin panel always has something to edit
    hero = await Hero.create({
      name: "Lakshya Bhartiya",
      role: "MERN Stack Developer",
      tagline: "Full Stack MERN Developer passionate about building scalable web and mobile applications.",
    });
  }
  res.json({ success: true, data: hero });
});

// @desc    Update hero content (creates it if it doesn't exist yet)
// @route   PUT /api/admin/hero
// @access  Private
const updateHero = asyncHandler(async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) {
    hero = await Hero.create(req.body);
  } else {
    hero.set(req.body);
    await hero.save();
  }
  res.json({ success: true, data: hero });
});

module.exports = { getHero, updateHero };
