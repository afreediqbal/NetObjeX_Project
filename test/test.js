const User = require('../src/model/user');
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/netobjexdb', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
    
    // Create a user
    const user = new User({
      email: 'test@example.com',
      password: 'password',
      role: 'user'
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
