const express = require('express');
const router = express.Router();

// Sample data for communication networks in Nigeria
const networks = [
  { id: 1, name: 'MTN', code: '011' },
  { id: 2, name: 'Glo', code: '031' },
  { id: 3, name: 'Airtel', code: '032' },
  { id: 4, name: '9mobile', code: '090' }
];

// GET /api/communication-networks
router.get('/', (req, res) => {
  try {
    res.json(networks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
