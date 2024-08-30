const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/user.model');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    const userID = +Date.now(); // Generate a unique userID

    if (user) {
      return res.status(400).json({ message: 'User already exists please login' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      userID
    });

    await user.save();

    // Respond with user details including userID
    res.status(201).json({ 
      message: 'User registered successfully',
      email: user.email,
      name: user.name,
      userID: user.userID  
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
      return res.status(400).json({ message: 'Enter the valid Email.' });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Enter the valid Password.' });
    }

   
    const payload = {
      user: {
        id: user.userID, 
      },
    };

    jwt.sign(
      payload,
      SECRET_KEY,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          
          token,
          userID: user.userID
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.sendStatus(401); 

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user;
    next();
  });
};

// Authentication check route
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
