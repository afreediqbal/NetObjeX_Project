const User = require('../model/user');
const Plan = require('../model/plan')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
require('dotenv').config()
const exphbs = require('express-handlebars');


//User Signup
const registerUser = async (req, res) => {

  const { email, password} = req.body;

  try {

    const registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
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
      role:'user'
    });

    // Save new user to database
    await newUser.save();

    const secret = process.env.JWT_TOKEN;
    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id, role:"user" },
        secret,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//User Signin
const signinUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {

    const validateSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });

    // Input Validation
    const { error } = validateSchema.validate(req.body);
    if (error) throw new Error(error.message);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secret = process.env.JWT_TOKEN;
    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, userId: user._id, role: user.role },
        secret,
      { expiresIn: '1h' }
    );

    //Use either of these two return response-comment any one(this for postman response)
    res.status(200).json({ message: 'Sign in successful', token });

    //(this is the demo for reactive web page using handlebars)
    if(role=='admin'){
      res.status(200).render("admin-dashboard");
    }
    else{
      res.status(200).render("user-dashboard");
    }
    
    
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Get the list of plans user has subscribed 
const listSubscribedPlans = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('plan');
    delete user.password;
    if (user.plan){
      res.status(200).json(user.plan)
    }else{
      res.status(200).json({ message: "No active plans"})
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Subscribe to a Plan
const subscribePlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {planId} = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const plan = await User.findPlanById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    
    // Check if the plan is already subscribed by the user
    if(user.plan && user.plan.name === plan.name){
        return res.status(400).json({ message: "Plan already subscribed" });
    }
    
    const subscription = await User.findByIdAndUpdate(userId, {plan:planId});
    res.status(200).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Unsubscribe from a Plan
const unsubscribePlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.plan) {
      return res.status(400).json({ message: "User is not subscribed to any plan" });
    }
    user.plan = null;
    await user.save();
    res.status(200).json({ message: "User unsubscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// List of all available plans for the user
const listPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {listSubscribedPlans,subscribePlan,registerUser,signinUser,listPlans,unsubscribePlan};