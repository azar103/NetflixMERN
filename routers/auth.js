const express= require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const passport = require('passport');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', passport.authenticate('jwt', {session: false}), authCtrl.authMe);

module.exports  = router;