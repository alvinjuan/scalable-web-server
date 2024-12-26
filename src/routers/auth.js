const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation } = require('../middleware/validation');
const userController = require('../controllers/userController');

router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);

module.exports = router;