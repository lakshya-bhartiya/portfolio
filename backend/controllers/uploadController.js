const asyncHandler = require("express-async-handler");

// @desc    Upload a single image, returns the hosted URL to save on any model field
// @route   POST /api/admin/upload
// @access  Private
// Uses multer + CloudinaryStorage (see config/cloudinary.js) - by the time this
// controller runs, req.file.path is already the final Cloudinary URL.
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  res.status(201).json({
    success: true,
    data: {
      url: req.file.path,
      publicId: req.file.filename,
    },
  });
});

module.exports = { uploadImage };
