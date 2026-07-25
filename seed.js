// Run this once to create your first admin account: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ regNumber: 'admin001' });
  if (existing) {
    console.log('Admin already exists.');
    process.exit();
  }

  await User.create({
    name: 'System Admin',
    regNumber: 'admin001',
    email: 'admin@example.com',
    password: 'admin123', // change this after first login in a real deployment
    role: 'admin'
  });

  console.log('Admin created: regNumber=admin001, password=admin123');
  process.exit();
}

seed();
