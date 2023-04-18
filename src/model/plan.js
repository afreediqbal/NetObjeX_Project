const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature'
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
