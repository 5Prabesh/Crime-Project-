const express = require('express');
const router = express.Router();

const { authController } = require("../controllers");

router.post('/register', authController.registerUser);
router.post('/login-user', authController.loginUser);
router.post('/login-admin', authController.loginAdmin);

module.exports = router;
