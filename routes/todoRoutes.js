// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create a new todo
router.post('/', async (req, res) => {
    try {
      const { title, content } = req.body;
      const todo = new Todo({ title, content, userId: req.user.id });
      await todo.save();
      res.status(201).json(todo);
    } catch (err) {
      res.status(400).json({ message: 'Error creating todo' });
    }
  });
  
  // Get all todos for the authenticated user
  router.get('/', async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.user.id });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching todos' });
    }
  });
  
// Get a todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todo' });
  }
});

// Update a todo by ID
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Error updating todo' });
  }
});

// Delete a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

module.exports = router;

