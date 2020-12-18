const router = require("express").Router();
const Student = require("../models/Student");
const Assessment = require("../models/Assessment");
const auth = require("../auth/auth");
const logger = require("../utils/logger");
const studentController = require("./studentController")
// var ObjectId = require('mongoose').Types.ObjectId;

const checkUser = [auth.decodeToken(), auth.getFreshUser()];

//Register a student //
router.post("/register", studentController.register);

router.get("/all", checkUser,studentController.getAll);

// Get student data //
router.get("/:id", checkUser, studentController.getStudentById);
router.get("/studentName/:studentName", checkUser,  studentController.getStudentByName)
// Add an assessment for a student //
router.post("/:id/assess", checkUser,studentController.addAssessment);

// Delete an assessment // 
router.delete("/:id/delete/:assessId", checkUser,studentController.deleteAssessmentById);

// Edit an assessment assigned to a user //
router.post("/:id/:assessId", studentController.editAssessment);

module.exports = router;