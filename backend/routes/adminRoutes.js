const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

const { getHero, updateHero } = require("../controllers/heroController");
const { getAbout, updateAbout } = require("../controllers/aboutController");
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} = require("../controllers/skillController");
const {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} = require("../controllers/certificationController");
const {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievementController");
const {
  getContact,
  updateContact,
  getMessages,
  markMessageRead,
  deleteMessage,
} = require("../controllers/contactController");
const { uploadImage } = require("../controllers/uploadController");

// Every route below requires a valid JWT (Authorization: Bearer <token>)
router.use(protect);

// Hero (singleton)
router.get("/hero", getHero);
router.put("/hero", updateHero);

// About (singleton)
router.get("/about", getAbout);
router.put("/about", updateAbout);

// Skills (CRUD + reorder)
router.get("/skills", getSkills);
router.post("/skills", createSkill);
router.put("/skills/reorder", reorderSkills); // must come before /:id routes
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);

// Experience (CRUD)
router.get("/experience", getExperience);
router.post("/experience", createExperience);
router.put("/experience/:id", updateExperience);
router.delete("/experience/:id", deleteExperience);

// Projects (CRUD)
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// Certifications (CRUD)
router.get("/certifications", getCertifications);
router.post("/certifications", createCertification);
router.put("/certifications/:id", updateCertification);
router.delete("/certifications/:id", deleteCertification);

// Achievements (CRUD)
router.get("/achievements", getAchievements);
router.post("/achievements", createAchievement);
router.put("/achievements/:id", updateAchievement);
router.delete("/achievements/:id", deleteAchievement);

// Contact info (singleton) + messages inbox
router.get("/contact", getContact);
router.put("/contact", updateContact);
router.get("/messages", getMessages);
router.put("/messages/:id/read", markMessageRead);
router.delete("/messages/:id", deleteMessage);

// Image/file upload (returns a Cloudinary URL to store on any field)
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
