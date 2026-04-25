const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
    index: true
  },
  actorId: {
    type: String,
    required: true
  },
  actorName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  entityId: {
    type: String
  },
  metadata: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * 🔥 CRITICAL FOR PERFORMANCE
 * Compound index for cursor pagination
 */
ActivitySchema.index({ tenantId: 1, createdAt: -1 });

module.exports = mongoose.model("Activity", ActivitySchema);