const Plan = require('../model/plan');

exports.createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json({ message: 'Plan created successfully', data: plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan updated successfully', data: plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
