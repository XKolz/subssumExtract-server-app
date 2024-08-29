const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const Referral = require('../models/Referral');
const SavedCard = require('../models/SavedCard');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to check authentication
router.use(authMiddleware);

// Get Overview endpoint
router.get('/overview', async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user.id;

    // Find wallet details
    const wallet = await Wallet.findOne({ user: userId });
    const walletBalance = wallet ? wallet.balance : 0;

    // Find referral details
    const referral = await Referral.findOne({ user: userId });
    const referralCode = referral ? referral.referralCode : '';
    const totalReferrals = referral ? referral.totalReferrals : 0;

    // Find saved card details
    const savedCards = await SavedCard.find({ user: userId });

    // Get wallet bonus (assuming it's a fixed amount for simplicity)
    const walletBonus = 50; // Replace this with your logic if different

    res.json({
      walletBalance,
      referralCode,
      totalReferrals,
      walletBonus,
      savedCards
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
