const express = require('express');const router = express.Router();const staticController = require('../controllers/staticController');const userController = require('../controllers/userController');router.get('/', staticController.checkAuth, userController.home);router.get('/orders', staticController.checkAuth, userController.history);router.get('/active', staticController.checkAuth, userController.active);module.exports = router;