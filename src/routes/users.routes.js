const { Router } = require('express');
const router = Router();

const { renderSignInForm, renderSignUpForm, signin, signup, logout } = require('../controllers/users.controller')

// configure routes
router.get('/auth/signin', renderSignInForm);
router.post('/auth/signin', signin);
router.get('/auth/signup', renderSignUpForm);
router.post('/auth/signup', signup);
router.get('/auth/logout', logout);

module.exports = router;