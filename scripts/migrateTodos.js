require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const Todo = require('../models/Todo'); // Adjust the path to your Todo model
const User = require('../models/User'); // Adjust the path to your User model

// Use the URI from environment variables
const MONGO_URI = process.env.DATABASE_URL;

const migrateTodos = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);

        // Fetch all todos that lack a userId
        const todos = await Todo.find({ userId: { $exists: false } });

        console.log(`Found ${todos.length} todos to update.`);

        for (const todo of todos) {
            // Example: Find a default user or implement logic to find the correct user ID
            const user = await User.findOne(); // Adjust query as necessary
            const defaultUserId = user ? user._id : 'default_user_id'; // Use actual user ID or default

            // Update todos with the determined userId
            await Todo.updateOne({ _id: todo._id }, { $set: { userId: defaultUserId } });
        }

        console.log('Migration completed.');

        // Disconnect from MongoDB
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error during migration:', err);
        process.exit(1);
    }
};

migrateTodos();
