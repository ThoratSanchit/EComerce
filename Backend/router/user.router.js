const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/user.model');
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "12345"; 


// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    const userID = +Date.now(); 

    if (user) {
      return res.status(400).json({ message: 'User already exists, please login' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, userID });
    await user.save();

    const payload = { user: { id: user.userID } };

    jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({
        message: 'User registered successfully',
        token,
        email: user.email,
        name: user.name,
        userID: user.userID  
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Enter a valid email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Enter a valid password.' });
    }

    const payload = { user: { id: user.userID } };

    jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({
        message: 'Login successful',
        token,
        userID: user.userID
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// function for decoding the authToken
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Authcheck route for decode user
router.get('/check-auth', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.user.user.id }).select('-password');
    if (!user) return res.sendStatus(404);
    res.json({ email: user.email, name: user.name, userID: user.userID });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = { router, authenticateToken };
