const express = require('express');
const router = express.Router();

// Define your post routes here
router.get('/', (req, res) => {
    res.send('Post route');
});

module.exports = router;
