const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const Teacher = require('../models/Teacher');
const logger = require('../utils/logger');
const authController = require('./authController');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyUser(), authController.signin);

module.exports = router;
