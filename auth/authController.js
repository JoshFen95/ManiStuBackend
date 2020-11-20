const Teacher = require('../models/Teacher');
const signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.teacher._id);
  console.log(req.headers);
  console.log(req.teacher)
  res.json({token: token, teacher: req.teacher.toJson()});
};
