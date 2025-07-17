// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const path = require('path');

exports.loginPage = (req, res) => {
  const loginPath = path.join(__dirname, '../../client/login.html');
  res.sendFile(loginPath);
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      alert('Username not found');
      return res.status(401).json({ message: 'Username not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      alert('Invalid Passwords');
      return res.status(401).json({ message: 'Invalid Passwords' });
    }

    req.session.user = user.username; // Save user in session
    res.redirect('/api/');

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
