const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); 
const User = require('../models/User'); // Adjust the path as needed
const authMiddleware = require('../middleware/authMiddleware'); // Adjust the path as needed

// Middleware to check authentication
router.use(authMiddleware);

// Get user profile
// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Ensure the ID is a number if you are using numeric IDs
//     if (typeof userId !== 'number') {
//       return res.status(400).json({ msg: 'Invalid user ID' });
//     }

//     const user = await User.findOne({ id: userId }).select('-password'); // Find by custom ID
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Use the default MongoDB _id

    const user = await User.findById(userId).select('-password'); // Find by default _id
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Upload profile picture
router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user profile picture URL
    user.profilePicture = req.file.path;
    await user.save();

    res.json({ msg: 'Profile picture uploaded successfully', profilePicture: req.file.path });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Edit Profile endpoint
// router.put('/edit-profile', async (req, res) => {
//   const { username, email } = req.body;

//   // Validate request
//   if (!username || !email) {
//     return res.status(400).json({ msg: 'Please provide both username and email' });
//   }

//   try {
//     // Find user by ID
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Update user profile
//     user.username = username;
//     user.email = email;

//     await user.save();

//     res.json({ msg: 'Profile updated successfully', user });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// Edit Profile endpoint
router.put('/edit-profile', async (req, res) => {
  const { username, email, status } = req.body;

  // Validate request
  if (!username || !email) {
    return res.status(400).json({ msg: 'Please provide both username and email' });
  }

  try {
    // Find user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user profile
    user.username = username;
    user.email = email;

    if (status) {
      user.status = status;
    }

    await user.save();

    res.json({ msg: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
