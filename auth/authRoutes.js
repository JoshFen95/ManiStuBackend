const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const Teacher = require('../models/Teacher');
const logger = require('../utils/logger');
const authController = require('./authController');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyUser(), authController.signin);



// router.post('/create', async(req, res) => {
//       //Create a new user
//   const user = new Teacher({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   console.log(user);
//   try {
//     const savedUser = await user.save();
//     //   res.send({studentId: savedStudent._id});
//     res.send({ user: savedUser });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.get("/me", async (req, res) => {
//   logger.log('here');
//   logger.log(req);
//   res.json(req.user.toJson());
// });

module.exports = router;
