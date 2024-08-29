const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // id: { type: Number, unique: true, required: true }, // Custom ID field
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Password may not be required for Google OAuth users
  profilePicture: { type: String } , // Store URL of user's profile picture
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' } , // Store user's status
  googleId: { type: String, unique: true }, // Store Google ID for OAuth users
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('User', UserSchema);
