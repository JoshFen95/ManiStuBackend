const router = require("express").Router();
const teacherController = require("./teacherController");
const auth = require('../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.post("/register", teacherController.createTeacher);

router.get('/me', checkUser, teacherController.me);


module.exports = router;