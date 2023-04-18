const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');



const registerUser = async (req, res) => {

  const objectId = Joi.extend((joi) => ({
    type: 'objectId',
    messages: {
      invalid: '{{#label}} must be a valid Object ID',
    },
    validate(value, helpers) {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return { value, errors: helpers.error('invalid') };
      }
    },
  }));

  const { email, password, plan } = req.body;

  try {

    const registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(), 
      plan: objectId.required()
    });

    // Input Validation
    const { error } = registerSchema.validate(req.body);
    if (error) throw new Error(error.message);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role:'user',
      plan
    });

    // Save new user to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id, role:"user" },
      "a324hh2ber",
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const listPlans = async (req, res) => {
  try {
    const plans = await User.findById(req.user.userId).populate('plan');
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const subscribePlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(req.query);
    const {planId} = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const plan = await User.findPlanById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    const subscription = await User.subscribePlan(userId, planId);
    res.status(200).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getUsageStatistics = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const usageStats = await User.getUsageStatistics(userId);
//     res.status(200).json(usageStats);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getFeatures = async (req, res) => {
    try {
      const features = await Feature.find();
      res.status(200).json(features);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {listPlans,subscribePlan,getFeatures,registerUser};