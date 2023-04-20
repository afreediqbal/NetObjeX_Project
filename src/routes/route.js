const express = require('express');
const router = express.Router();
const {checkUser} = require('../middleware/checkUser')
const {checkAdmin} = require('../middleware/checkAdmin')

const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

// ADMIN ROUTES
router.post('/admin/add', checkAdmin, adminController.addAdmin);
router.post('/admin/create-plan', checkAdmin,  adminController.createPlan);
router.get('/admin/plans', checkAdmin, adminController.getPlans);
router.get('/admin/plan/:id', checkAdmin, adminController.getPlan);
router.put('/admin/update-plan/:id', checkAdmin, adminController.updatePlan);
router.delete('/admin/delete-plan/:id', checkAdmin, adminController.deletePlan);
router.post('/admin/create-feature', checkAdmin, adminController.createFeature);
router.get('/admin/features', checkAdmin, adminController.getAllFeatures);
router.get('/admin/feature/:id', checkAdmin, adminController.getFeatureById);
router.put('/admin/feature/:id', checkAdmin, adminController.updateFeatureById);
router.delete('/admin/feature/:id', checkAdmin, adminController.deleteFeatureById);

// USER ROUTES
router.get('/signin', (req, res) => {
    res.render('signin'); // render the signin.handlebars file
  });
router.post('/register', userController.registerUser);
router.post('/signin', userController.signinUser);
router.get('/user/sub-plans', checkUser, userController.listSubscribedPlans);
router.get('/user/plans', checkUser, userController.listPlans);
router.post('/user/subscribe-plan', checkUser,  userController.subscribePlan);
router.put('/user/unsubscribe-plan', checkUser, userController.unsubscribePlan);

module.exports = router;
