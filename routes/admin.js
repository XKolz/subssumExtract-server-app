const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // Middleware to check if the user is an admin

// Middleware to check authentication
router.use(authMiddleware);
router.use(adminMiddleware); // Apply admin check middleware

// Endpoint to activate or deactivate a user account
router.patch('/update-user-status/:id', async (req, res) => {
  const { status } = req.body;

  if (!status || (status !== 'active' && status !== 'inactive')) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.json({ msg: 'User status updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
