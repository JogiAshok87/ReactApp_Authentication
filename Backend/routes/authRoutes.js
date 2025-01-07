const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const {check} = require('express-validator')

router.post('/register',[
    check('name','Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('confirmPassword','confirmPassword must have the same value as the password field')
       .custom((value,{req})=>value===req.body.password),
  ],authController.register);

router.post('/login',
    [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
    ]
    ,authController.login)

module.exports = router

