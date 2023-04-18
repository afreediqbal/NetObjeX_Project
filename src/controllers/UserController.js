const User = require('../model/user');

const listPlans = async (req, res) => {
  try {
    const plans = await User.listPlans();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const subscribePlan = async (req, res) => {
  try {
    const { userId, planId } = req.params;
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

module.exports = {listPlans,subscribePlan,getFeatures};