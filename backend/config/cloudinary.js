const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === "application/pdf";
    if (isPDF) {
      return {
        folder: "portfolio/resumes",
        resource_type: "raw", // PDFs/non-image files must use "raw" on Cloudinary
        allowed_formats: ["pdf"],
        // Cloudinary derives the public_id from originalname for raw files by
        // default, which can cause collisions - keep it unique:
        public_id: `resume-${Date.now()}`,
      };
    }
    return {
      folder: "portfolio",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
      transformation: [{ width: 1600, crop: "limit" }],
    };
  },
});

// Accept images (for profile/project/certificate pictures) and PDFs (for resume)
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files or PDF are allowed"));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = { cloudinary, upload };
