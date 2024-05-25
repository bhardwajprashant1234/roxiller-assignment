const Transaction = require('../models/Transaction');

// Fetch statistics data
exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const monthRegex = new RegExp(`/${month}/`, 'i');

    const totalSaleAmount = await Transaction.aggregate([
      { $match: { dateOfSale: monthRegex, isSold: true } },
      { $group: { _id: null, totalSaleAmount: { $sum: '$price' } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: monthRegex,
      isSold: true,
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: monthRegex,
      isSold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.totalSaleAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'An error occurred while fetching statistics' });
  }
};