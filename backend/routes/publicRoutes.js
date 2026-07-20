const express = require("express");
const router = express.Router();

const { getHero } = require("../controllers/heroController");
const { getAbout } = require("../controllers/aboutController");
const { getSkills } = require("../controllers/skillController");
const { getExperience } = require("../controllers/experienceController");
const { getProjects, getProjectById } = require("../controllers/projectController");
const { getCertifications } = require("../controllers/certificationController");
const { getAchievements } = require("../controllers/achievementController");
const { getContact, sendMessage } = require("../controllers/contactController");

// These are the ONLY routes the Next.js portfolio needs to call.
// All are read-only (GET) except the contact form submission.
router.get("/hero", getHero);
router.get("/about", getAbout);
router.get("/skills", getSkills);
router.get("/experience", getExperience);
router.get("/projects", getProjects); // supports ?featured=true
router.get("/projects/:id", getProjectById);
router.get("/certifications", getCertifications);
router.get("/achievements", getAchievements);
router.get("/contact", getContact);
router.post("/contact/message", sendMessage);

module.exports = router;
