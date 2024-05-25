const Transaction = require('../models/Transaction');
const fetchData = require('../utils/fetchData');

// Initialize the database with seed data
exports.initializeDatabase = async (req, res) => {
  try {
    const data = await fetchData();
    await Transaction.insertMany(data);
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'An error occurred while initializing the database' });
  }
};

// List all transactions with search and pagination
exports.getTransactions = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(limit);

    const totalTransactions = await Transaction.countDocuments(query);
    const totalPages = Math.ceil(totalTransactions / limit);

    res.status(200).json({
      transactions,
      totalTransactions,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
};

// Fetch data for the bar chart
exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const monthRegex = new RegExp(`/${month}/`, 'i');

    const barChartData = await Transaction.aggregate([
      { $match: { dateOfSale: monthRegex } },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
          default: 'above 900',
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    res.status(200).json(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'An error occurred while fetching bar chart data' });
  }
};

// Fetch data for the pie chart
exports.getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const monthRegex = new RegExp(`/${month}/`, 'i');

    const pieChartData = await Transaction.aggregate([
      { $match: { dateOfSale: monthRegex } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ error: 'An error occurred while fetching pie chart data' });
  }
};