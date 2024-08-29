const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path if needed

require('dotenv').config();

const connectDB = require('../config/db'); // Adjust path if needed
connectDB();

const updateAdminPassword = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword', salt); // Replace with your desired password

    await User.updateOne(
      { email: 'admin@example.com' },
      { $set: { password: hashedPassword } }
    );

    console.log('Admin password updated successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

updateAdminPassword();
