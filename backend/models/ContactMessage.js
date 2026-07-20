const mongoose = require("mongoose");

// Messages submitted by visitors through the portfolio's Contact form.
// Admin can view/manage these in the admin panel (like a mini inbox).
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
