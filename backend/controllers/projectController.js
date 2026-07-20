const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");

// @desc    Get all projects (public). Supports ?featured=true to filter.
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured === "true") filter.featured = true;

  const projects = await Project.find(filter).sort({ order: 1 });
  res.json({ success: true, count: projects.length, data: projects });
});

// @desc    Get a single project by id (public - used for project details modal)
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.json({ success: true, data: project });
});

// @desc    Create project
// @route   POST /api/admin/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  project.set(req.body);
  await project.save();
  res.json({ success: true, data: project });
});

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  await project.deleteOne();
  res.json({ success: true, message: "Project deleted" });
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
