const express = require('express');
const { validateRegister, validateLogin } = require('../src/validator/validator')
const authController=require('../controller/auth-controller')

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin,authController.login);

// router.post('/login', validateLogin,authController.login);


// router.post('/register', validateRegister, ;
// router.post('/login', validateLogin, authController.login);
// router.get('/me', authenticate, authController.getMe);


module.exports = router;