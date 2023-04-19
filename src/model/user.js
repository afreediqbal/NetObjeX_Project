const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  }

  
});

userSchema.statics.findPlanById = async function(planId) {
  return this.model('Plan').findById(planId);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
