const express = require('express');
const router = express.Router();

// Import validation functions from authvalidation
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

// Import signup and login logic from authcontroller
const { signup, login } = require('../Controllers/AuthController'); // Add login here

// Signup and login routes using validation and controller logic
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;