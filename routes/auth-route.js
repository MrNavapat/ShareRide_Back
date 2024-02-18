
const { validateRegister, validateLogin } = require('../src/validator/validator')
const authController=require('../controller/auth-controller')
const Authenticate = require('../middlewares/authenticate')

const express = require('express');
const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin,authController.login);

router.get('/me', Authenticate, authController.getMe);



module.exports = router;