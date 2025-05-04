// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Models/userModel'); // Adjust the path if needed

// Replace with your actual MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017/shopolic';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists.');
    } else {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      const newUser = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword
       
      });

      await newUser.save();
      console.log('Admin user created.');
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
