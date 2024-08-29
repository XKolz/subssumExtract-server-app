// const express = require('express');
// const mongoose = require('mongoose');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/profile');
// const passport = require('passport');
// const session = require('express-session');
// require('./config/passport');

// require('dotenv').config();

// const app = express();
// // app.use(express.json());

// // Initialize Passport and use session
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB
// connectDB();

// // Express session middleware
// app.use(session({
//   // secret: 'your_secret_key',
//   secret: process.env.SESSION_SECRET || 'your_secret_key',
//   resave: false,
//   saveUninitialized: false
// }));

// // Middleware to parse JSON bodies in requests
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/auth', authRoutes);

// // Protected Route
// const authMiddleware = require('./middleware/authMiddleware');
// app.get('/api/protected', authMiddleware, (req, res) => {
//   res.send('This is a protected route');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const walletRoutes = require('./routes/wallet'); // Add this line
const overviewRoutes = require('./routes/overview');
const profileRoutes = require('./routes/profile');
// const profileRoutes = require('./routes/profile');
const communicationRoutes = require('./routes/communicationNetworks');
const convertAirtimeRoutes = require('./routes/convertAirtime');
const transactionRoutes = require('./routes/transactions'); 
const adminRoutes = require('./routes/admin');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passport');

const fs = require('fs');
const path = require('path');

const app = express();

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Consider using an environment variable for the secret
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/profile'));
app.use('/api/wallet', walletRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/communication-networks', communicationRoutes); 
app.use('/api/convert-airtime', convertAirtimeRoutes);
app.use('/api/transactions', transactionRoutes);


// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads/profile-pictures');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Protected Route
const authMiddleware = require('./middleware/authMiddleware');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
