const express = require('express');
const router = express.Router();
const {checkUser} = require('../middleware/checkUser')

const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

// ADMIN ROUTES
router.post('/admin/create-plan',  adminController.createPlan);
router.get('/admin/plans',  adminController.getPlans);
router.get('/admin/plan/:id',  adminController.getPlan);
router.put('/admin/update-plan/:id',  adminController.updatePlan);
router.delete('/admin/delete-plan/:id',  adminController.deletePlan);
router.post('/admin/create-feature', adminController.createFeature);
router.get('/admin/features', adminController.getAllFeatures);
router.get('/admin/feature/:id', adminController.getFeatureById);
router.put('/admin/feature/:id', adminController.updateFeatureById);
router.delete('/admin/feature/:id', adminController.deleteFeatureById);

// USER ROUTES
router.post('/register', userController.registerUser);
router.post('/signin', userController.signinUser);
router.get('/user/sub-plans', checkUser, userController.listSubscribedPlans);
router.get('/user/plans', checkUser, userController.listPlans);
router.post('/user/subscribe-plan', checkUser,  userController.subscribePlan);
router.put('/user/unsubscribe-plan', checkUser, userController.unsubscribePlan);

module.exports = router;
