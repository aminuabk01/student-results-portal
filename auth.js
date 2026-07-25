const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { regNumber, password } = req.body;
    const user = await User.findOne({ regNumber });

    if (!user) return res.render('login', { error: 'Invalid registration number or password' });

    const match = await user.comparePassword(password);
    if (!match) return res.render('login', { error: 'Invalid registration number or password' });

    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.name = user.name;

    if (user.role === 'admin') return res.redirect('/admin/dashboard');
    return res.redirect('/student/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Something went wrong. Try again.' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
