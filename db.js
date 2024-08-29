require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// Connection URI from environment variables
const uri = process.env.DATABASE_URL; // Ensure this is defined in your .env file

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event listeners
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

