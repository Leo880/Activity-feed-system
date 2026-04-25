const express = require("express");
const router = express.Router();

const {
  createActivity,
  getActivities
} = require("./activity.controller");

router.post("/", createActivity);
router.get("/", getActivities);

module.exports = router;