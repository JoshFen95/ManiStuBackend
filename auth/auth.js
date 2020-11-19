const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt, algorithms: ['HS256']});
const Teacher = require('../models/Teacher'); 
const { response } = require('express');

exports.decodeToken = () => {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    console.log('Here');
    console.log(req.query.access_token);
    // if (req.query && req.query.hasOwnProperty('access_token')) {
    //   req.headers.authorization = 'Bearer ' + req.query.access_token;
    // }
    if (req.headers.authorization) {
      req.headers.authorization = 'Bearer ' + req.headers.authorization;
    }
    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next)
  };
};

exports.getFreshUser = () => {
  return function(req, res, next) {
    console.log('hererhrehreherher')
    console.log(req);
    Teacher.findById(req.user._id)
      .then(function(teacher) {
        if (!teacher) {
          // if no user is found it was not
          // it was a valid JWT but didn't decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send('Unauthorized');
        } else {
          // update req.user with fresh user from
          // stale token data
          req.teacher = teacher;
          next();
        }
      }, function(err) {
        next(err);
      });
  }
};

exports.verifyUser = () => {
  return function(req, res, next) {
    console.log(req);
    const teacherName = req.body.teacherName;
    const password = req.body.password;

    // if no username or password then send
    if (!teacherName || !password) {
      res.status(400).send('You need a username and password');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    Teacher.findOne({teacherName: teacherName})
      .then(function(teacher) {
        if (!teacher) {
          res.status(401).send('No user with the given username');
        } else {
          // checking the passowords here
          if (!teacher.authenticate(password)) {
            res.status(401).send('Wrong password');
          } else {
            // if everything is good,
            // then attach to req.user
            // and call next so the controller
            // can sign a token from the req.user._id
            req.teacher = teacher;
            console.log(req.teacher)
            next();
          }
        }
      }, function(err) {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = (id) => {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    // {expiresInMinutes: config.expireTime}
    {expiresIn: config.expireTime}
  );
};

//changed everything here to arrow functions so if something does go wrong here, remember that.
