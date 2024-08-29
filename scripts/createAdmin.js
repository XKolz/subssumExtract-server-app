const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path if needed
const bcrypt = require('bcryptjs');

require('dotenv').config();

const connectDB = require('../config/db'); // Adjust the path if needed
connectDB();

const createAdmin = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword', salt); // Replace with your desired password

    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com', // Replace with desired admin email
      password: hashedPassword,
      role: 'admin', // Ensure the role is set to 'admin'
      status: 'active' // Optionally set the initial status
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

createAdmin();
