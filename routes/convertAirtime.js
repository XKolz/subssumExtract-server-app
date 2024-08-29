const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

// Sample function to handle airtime to cash conversion
const convertAirtimeToCash = async (network, phoneNumber, amount, pin) => {
  // Mocked logic for conversion
  // In a real-world scenario, this might involve calling an external service or API
  return {
    success: true,
    message: 'Airtime converted successfully',
    amount: amount, // Return the amount converted
    paymentMethod: 'Airtime Transfer', // Mock payment method for now
    transactionNo: `TX${Date.now()}` // Mock transaction number
  };
};

// POST /api/convert-airtime
router.post('/', authMiddleware, async (req, res) => {
  const { network, phoneNumber, amount, pin } = req.body;

  // Simple validation
  if (!network || !phoneNumber || !amount || !pin) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    // Convert airtime to cash
    const result = await convertAirtimeToCash(network, phoneNumber, amount, pin);
    
    if (result.success) {
      // Create a new transaction in the database
      const newTransaction = new Transaction({
        user: req.user.id,
        service: 'Airtime Conversion',
        amount: amount,
        totalAmount: amount, // Assuming no fees or charges
        status: 'Completed', // Marking as completed for this example
        paymentMethod: result.paymentMethod,
        transactionNo: result.transactionNo,
        date: new Date()
      });

      await newTransaction.save();

      res.json(result);
    } else {
      res.status(400).json({ msg: result.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
