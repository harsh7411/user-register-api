const express = require('express');
const router = express.Router();
const { registerUser, verifyEmail } = require('../controller/userController');
const upload = require('../config/uploadConfig');


router.post('/register', upload.single('profilePicture'), registerUser);
router.get('/verify-email', verifyEmail);

module.exports = router;