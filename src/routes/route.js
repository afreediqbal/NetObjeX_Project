const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

// ADMIN ROUTES
router.post('/admin/create-plan', checkAdmin, adminController.createPlan);
router.get('/admin/plans', checkAdmin, adminController.getPlans);
router.get('/admin/plan/:id', checkAdmin, adminController.getPlan);
router.put('/admin/update-plan/:id', checkAdmin, adminController.updatePlan);
router.delete('/admin/delete-plan/:id', checkAdmin, adminController.deletePlan);

// USER ROUTES
router.get('/user/plans', checkUser, userController.listPlans);
router.post('/user/subscribe-plan/:id', checkUser, userController.subscribePlan);
router.get('/user/features', checkUser, userController.getFeatures);
// router.get('/user/usage', userController.getUsageStatistics);

module.exports = router;
