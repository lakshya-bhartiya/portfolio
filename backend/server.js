require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();

// Security & parsing
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// CORS - only allow the portfolio (Next.js) and admin panel (Vite) origins
const allowedOrigins = (process.env.CLIENT_URLS || "").split(",").map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Rate limiting - protects login + contact form from abuse
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: "Too many attempts, please try again later." },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/contact/message", authLimiter);

// Health check
app.get("/", (req, res) => res.json({ success: true, message: "Portfolio API is running" }));
app.get("/api/health", (req, res) => res.json({ success: true, status: "ok" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", publicRoutes); // /api/hero, /api/skills, /api/projects, etc. (read-only)
app.use("/api/admin", adminRoutes); // all protected CRUD routes

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
