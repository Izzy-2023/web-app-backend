const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
require('./db'); // Import db.js to establish the MongoDB connection

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
