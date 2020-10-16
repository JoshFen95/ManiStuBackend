const User = require('../models/Teacher');
const signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id);
  console.log(req.headers);
  res.json({token: token, teacher: req.user});
};