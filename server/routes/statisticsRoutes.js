const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controllers/statisticsController');

// Route for statistics endpoint
router.get('/statistics', getStatistics);

module.exports = router;