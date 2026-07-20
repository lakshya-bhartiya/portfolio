// Run this ONCE after setting up your .env: npm run seed
// Creates your first admin login + default singleton documents (Hero/About/Contact)
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const Hero = require("../models/Hero");
const About = require("../models/About");
const Contact = require("../models/Contact");

const seed = async () => {
  await connectDB();

  // 1. Create admin user (only if one doesn't already exist with this email)
  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existingAdmin) {
    console.log(`Admin already exists: ${existingAdmin.email}`);
  } else {
    const admin = await Admin.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log(`Admin created: ${admin.email}`);
  }

  // 2. Create default singleton docs if they don't exist, so the admin panel
  //    has something to edit on first load instead of blank/error states.
  const heroExists = await Hero.findOne();
  if (!heroExists) {
    await Hero.create({
      name: "Lakshya Bhartiya",
      role: "MERN Stack Developer",
      tagline:
        "Full Stack MERN Developer passionate about building scalable web and mobile applications using React, Next.js, Node.js, Express, MongoDB, and React Native.",
    });
    console.log("Default Hero document created");
  }

  const aboutExists = await About.findOne();
  if (!aboutExists) {
    await About.create({
      bio: "Write your about-me bio here from the admin panel.",
      education: [],
      technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
    });
    console.log("Default About document created");
  }

  const contactExists = await Contact.findOne();
  if (!contactExists) {
    await Contact.create({ email: process.env.ADMIN_EMAIL || "you@example.com" });
    console.log("Default Contact document created");
  }

  console.log("Seeding complete.");
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
