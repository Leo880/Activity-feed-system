const activityService = require("./activity.service");

/**
 * POST /activities
 */
const createActivity = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const activity = await activityService.createActivity(
      req.body,
      tenantId
    );

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /activities
 */
const getActivities = async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const { cursor, limit } = req.query;

    const activities = await activityService.getActivities({
      tenantId,
      cursor,
      limit
    });

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createActivity,
  getActivities
};