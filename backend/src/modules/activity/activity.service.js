const Activity = require("./activity.model");

/**
 * Create Activity
 */
const createActivity = async (data, tenantId) => {
  return await Activity.create({
    ...data,
    tenantId
  });
};

/**
 * Cursor-based Pagination
 */
const getActivities = async ({ tenantId, cursor, limit = 20 }) => {
  const query = {
    tenantId
  };

  if (cursor) {
    query.createdAt = { $lt: new Date(cursor) };
  }

  const activities = await Activity.find(query)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .select("actorName type createdAt"); // projection

  return activities;
};

module.exports = {
  createActivity,
  getActivities
};