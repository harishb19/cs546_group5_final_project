const express = require('express');
const router = express.Router();
const staticController = require('../controllers/staticController');

router.post('/info', staticController.theaterInfo);

module.exports = router;