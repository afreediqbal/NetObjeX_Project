const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

// ADMIN ROUTES
router.post('/admin/create-plan', adminController.createPlan);
router.get('/admin/plans', adminController.getPlans);
router.get('/admin/plan/:id', adminController.getPlan);
router.put('/admin/update-plan/:id', adminController.updatePlan);
router.delete('/admin/delete-plan/:id', adminController.deletePlan);

// USER ROUTES
router.get('/user/plans', userController.listPlans);
router.post('/user/subscribe-plan/:id', userController.subscribePlan);
router.get('/user/features', userController.getFeatures);
router.get('/user/usage', userController.getUsageStatistics);

module.exports = router;
