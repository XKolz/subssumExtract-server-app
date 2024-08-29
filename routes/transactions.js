const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

// GET /api/transactions/history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    // Validate page and limit
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(pageLimit) || pageLimit <= 0) {
      return res.status(400).json({ msg: 'Invalid page or limit value' });
    }

    // Calculate skip value
    const skip = (pageNumber - 1) * pageLimit;

    // Fetch transaction history for the logged-in user with pagination
    const transactions = await Transaction.find({ user: userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageLimit);

    // Fetch total count for pagination
    const totalCount = await Transaction.countDocuments({ user: userId });

    res.json({
      transactions,
      totalCount,
      page: pageNumber,
      totalPages: Math.ceil(totalCount / pageLimit),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
