// src/models/Commentaire.js
const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {  // Reference to the user who created the comment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  storyId: {  // Optional: ID reference to an associated story or post
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story', // Assuming comments are tied to a story
    required: false,
  },
});

const Commentaire = mongoose.model('Commentaire', commentaireSchema);

module.exports = Commentaire;
