const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // e.g. "Projects Completed"
    value: { type: Number, required: true }, // e.g. 20 - used for the 0 -> N counter animation
    suffix: { type: String, default: "+" }, // e.g. "+" so it renders as "20+"
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

achievementSchema.index({ order: 1 });

module.exports = mongoose.model("Achievement", achievementSchema);
