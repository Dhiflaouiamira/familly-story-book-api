const express = require('express');
const router = express.Router();
const Story = require('../models/Story'); // Import the Story model

// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new story
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newStory = new Story({ title, content, author });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a story by ID
router.put('/:id', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(updatedStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a story by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);
    if (!deletedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
