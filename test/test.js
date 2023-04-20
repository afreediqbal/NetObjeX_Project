const User = require('../src/model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Connect to database
mongoose.connect('mongodb://localhost/netobjexdb', { useNewUrlParser: true })
  .then(async() => {
    console.log('Connected to database');

    // Hash password
    const hashedPassword = await bcrypt.hash('adminpass', 12);
    
    // Create a user
    const user = new User({
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    
    // Save user to database
    return user.save();
  })
  .then((savedUser) => {
    console.log('User saved:', savedUser);
    
    // Find all users
    return User.find({});
  })
  .then((users) => {
    console.log('All users:', users);
    
    // Disconnect from database
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from database');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
