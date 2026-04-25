require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const activityRoutes = require("./modules/activity/activity.routes");
const tenantMiddleware = require("./middleware/tenant.middleware");

const app = express();

//app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173",
    "https://activity-feed-system-sg20reajz-leo-amit-dcostas-projects.vercel.app"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "x-tenant-id"]
}));
app.use(express.json());

// tenant isolation middleware
app.use(tenantMiddleware);

// routes
app.use("/activities", activityRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

module.exports = app;