const express = require('express');
const router = express.Router();
const {
  initializeDatabase,
  getTransactions,
  getBarChartData,
  getPieChartData,
} = require('../controllers/transactionController');

// Routes for transaction-related endpoints
router.get('/init', initializeDatabase);
router.get('/transactions', getTransactions);
router.get('/barchart', getBarChartData);
router.get('/piechart', getPieChartData);

module.exports = router;