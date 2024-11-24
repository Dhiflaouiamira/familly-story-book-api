// src/models/Family.js
const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  profilePhoto: {
    type: String,
    default: '',
  },
  coverPhoto: {
    type: String,
    default: '',
  },
  // Link to timeline events
  timeline: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Timeline',
    },
  ],
  familyTree: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
