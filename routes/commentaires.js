const express = require('express');
const router = express.Router();
const Commentaire = require('../models/Commentaire'); // Importing the Commentaire model for database operations

// Route to retrieve all commentaires
router.get('/', async (req, res) => {
  try {
    const commentaires = await Commentaire.find();
    res.json(commentaires);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to create a new commentaire
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newCommentaire = new Commentaire({ title, content, author }); // Creating a new commentaire instance with the provided data
    await newCommentaire.save(); // Saving the new commentaire to the database
    res.status(201).json(newCommentaire); // Returning the saved commentaire in the response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to retrieve a single commentaire by its unique ID
router.get('/:id', async (req, res) => {
  try {
    const commentaire = await Commentaire.findById(req.params.id); // Finding a commentaire by ID
    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire not found' });
    }
    res.json(commentaire); // Returning the found commentaire
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to update an existing commentaire by its unique ID
router.put('/:id', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const updatedCommentaire = await Commentaire.findByIdAndUpdate(
      req.params.id,
      { title, content, author }, // Updating fields with the provided data
      { new: true } // Ensuring the updated document is returned
    );
    if (!updatedCommentaire) {
      return res.status(404).json({ message: 'Commentaire not found' });
    }
    res.json(updatedCommentaire); // Returning the updated commentaire
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to delete a commentaire by its unique ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCommentaire = await Commentaire.findByIdAndDelete(req.params.id); // Deleting a commentaire by ID
    if (!deletedCommentaire) {
      return res.status(404).json({ message: 'Commentaire not found' });
    }
    res.json({ message: 'Commentaire deleted successfully' }); // Confirming deletion
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; // Exporting the router to be used in the main application
