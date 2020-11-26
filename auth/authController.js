const Teacher = require('../models/Teacher');
const logger = require('../utils/logger');
const signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.teacher._id);
  logger.log(req.headers);
  logger.log(req.teacher)
  res.json({token: token, teacher: req.teacher.toJson()});
};
