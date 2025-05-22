const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String // Will store bcrypt-hashed passwords
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
