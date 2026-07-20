const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "React"
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "Mobile", "Tools", "Other"],
    },
    icon: { type: String, default: "" }, // icon key/name (e.g. lucide/simple-icons slug) OR image URL
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    order: { type: Number, default: 0 }, // for drag-drop ordering within a category
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model("Skill", skillSchema);
