const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to check authentication
router.use(authMiddleware);

// Fund wallet endpoint
router.post('/fund', async (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ msg: 'Amount must be greater than zero' });
  }

  try {
    // Find the user's wallet
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      // Create a new wallet if it doesn't exist
      const newWallet = new Wallet({ user: req.user.id, balance: amount });
      await newWallet.save();
      return res.status(200).json({ msg: 'Wallet funded successfully', balance: newWallet.balance });
    }

    // Update the balance
    wallet.balance += amount;
    await wallet.save();

    res.status(200).json({ msg: 'Wallet funded successfully', balance: wallet.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
