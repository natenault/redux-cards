const passport = require('passport');
const passportService = require('../services/passport');
const authController = require('../controllers/authController');
const router = require('express').Router();

//===============================================
// Auth
//===============================================

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', requireSignin, authController.signin);
router.post('/signup', authController.signup);
// router.get('/user', requireAuth, function(req, res) {
//   res.send({ message: 'message which requires auth' });
// });

module.exports = router;
