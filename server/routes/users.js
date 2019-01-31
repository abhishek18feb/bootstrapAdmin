var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controller/UsersController');

// a simple test url to check that all of our files are communicating correctly.
router.post('/login', user_controller.login);
router.post('/signup', user_controller.signup);

module.exports = router;
