// server.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
require('./db'); // Import db.js to establish the MongoDB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Middleware to handle 404 errors (must be after all route handlers)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Middleware to handle other errors (must be after all route handlers)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Define the port
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
