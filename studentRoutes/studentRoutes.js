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

router.get("/all",  studentController.getAll);

// Get student data //
router.get("/:id", checkUser, studentController.getOne);

// Add an assessment for a student //
router.post("/:id/assess",checkUser, studentController.addAssessment);

// Delete an assessment // 
router.delete("/:id/delete/:assessId", checkUser, studentController.deleteAssessmentById);

// Edit an assessment assigned to a user //
router.post("/:id/:assessId",checkUser, studentController.editAssessment);

// router.route('/:id')
//   .get(studentController.getOne)
//   .post("/assess",checkUser, studentController.addAssessment)
//   .delete("/delete/:assessId", checkUser, studentController.deleteAssessmentById)
//   .post("/:assessId", checkUser, studentController.editAssessment)

module.exports = router;


// update student infomation


// https://app.pluralsight.com/course-player?clipId=61422221-7630-4066-9d03-e57b52a4c6b6
// above video at 3:50, maybe be able to refactor some methods with funtions
// look in userModel for crypting password


// maybe regiser the port in the config file.
// implement parentsthen parents to view their child?? 

//REWACTCH EERCISE 12 SOLUTION AND ADD A .ME METHODS AND THE REMOVE PASSWORD METHOD IN THAT VIDEO