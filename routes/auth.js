const express = require('express');
const router = express.Router();
const User = require('../models/User');

async function handleLogin(req, res, role, viewPath, redirectTo) {
  try {
    const { regNumber, password } = req.body;
    const user = await User.findOne({ regNumber, role });

    if (!user) return res.render(viewPath, { error: 'Invalid registration number or password' });

    const match = await user.comparePassword(password);
    if (!match) return res.render(viewPath, { error: 'Invalid registration number or password' });

    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.name = user.name;

    return res.redirect(redirectTo);
  } catch (err) {
    console.error(err);
    res.render(viewPath, { error: 'Something went wrong. Try again.' });
  }
}

// Admin login
router.get('/admin/login', (req, res) => res.render('admin/login', { error: null }));
router.post('/admin/login', (req, res) => handleLogin(req, res, 'admin', 'admin/login', '/admin/dashboard'));

// Student login
router.get('/student/login', (req, res) => res.render('login', { error: null }));
router.post('/student/login', (req, res) => handleLogin(req, res, 'student', 'login', '/student/dashboard'));

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
