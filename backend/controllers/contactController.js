const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");
const ContactMessage = require("../models/ContactMessage");

// @desc    Get contact info (public)
// @route   GET /api/contact
// @access  Public
const getContact = asyncHandler(async (req, res) => {
  let contact = await Contact.findOne();
  if (!contact) {
    contact = await Contact.create({ email: "you@example.com" });
  }
  res.json({ success: true, data: contact });
});

// @desc    Update contact info
// @route   PUT /api/admin/contact
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  let contact = await Contact.findOne();
  if (!contact) {
    contact = await Contact.create(req.body);
  } else {
    contact.set(req.body);
    await contact.save();
  }
  res.json({ success: true, data: contact });
});

// @desc    Submit a message via the portfolio's contact form
// @route   POST /api/contact/message
// @access  Public
const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email and message are required");
  }

  const saved = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({ success: true, data: saved });
});

// @desc    Get all submitted messages (inbox view)
// @route   GET /api/admin/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

// @desc    Mark a message as read / delete a message
// @route   PUT /api/admin/messages/:id/read , DELETE /api/admin/messages/:id
// @access  Private
const markMessageRead = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  msg.read = true;
  await msg.save();
  res.json({ success: true, data: msg });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  await msg.deleteOne();
  res.json({ success: true, message: "Message deleted" });
});

module.exports = {
  getContact,
  updateContact,
  sendMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
};
