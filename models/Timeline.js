// src/models/Timeline.js
const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  media: {
    type: String, // URL or file path to an image or video related to the event
  },
});

const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;
