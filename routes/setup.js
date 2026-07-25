const express = require('express');
const router = express.Router();
const User = require('../models/User');

// TEMPORARY setup route - visit once, then delete this file
router.get('/setup-admin-x7k2m9', async (req, res) => {
  try {
    const existing = await User.findOne({ regNumber: 'admin001' });
    if (existing) return res.send('Admin already exists. You can delete this route now.');

    await User.create({
      name: 'System Admin',
      regNumber: 'admin001',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    res.send('Admin created! regNumber=admin001, password=admin123. Now go delete this route file.');
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

module.exports = router;
