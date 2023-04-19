const Plan = require('../model/plan');

const Feature = require('../model/feature');

const createPlan = async (req, res) => {
  try {

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

    const validateSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(), 
      feature: Joi.array().items(objectId.required())
    });

    const { error } = validateSchema.validate(req.body);
    if (error) throw new Error(error.message);

    // Check if plan already exists
    const existingPlan = await Plan.findOne({name:req.body});
    if (existingPlan) {
      return res.status(409).json({ message: 'Name already in use' });
    }

    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json({ message: 'Plan created successfully', data: plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlan = async (req, res) => {
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

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePlan = async (req, res) => {
  try {

    const validateSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(), 
      feature: Joi.array().items(objectId.required())
    });
    
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

const deletePlan = async (req, res) => {
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

// Create a new feature
const createFeature = async (req, res) => {
  try {
    const { name, description } = req.body;
    const feature = new Feature({ name, description });
    const savedFeature = await feature.save();
    res.status(201).json({
      message: 'Feature added successfully',
      feature: savedFeature
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all features
const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific feature by ID
const getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.status(200).json(feature);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a specific feature by ID
const updateFeatureById = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedFeature = await Feature.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedFeature) {
      return res.status(400).json({ message: 'Feature not found' });
    }
    res.status(200).json(updatedFeature);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

// Delete a specific feature by ID
const deleteFeatureById = async (req, res) => {
  try {
    const deletedFeature = await Feature.findByIdAndDelete(req.params.id);
    if (!deletedFeature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {createPlan,getPlan,getPlans,updatePlan,deletePlan,createFeature,getAllFeatures,getFeatureById,updateFeatureById,deleteFeatureById};