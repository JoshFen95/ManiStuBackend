const Student = require("../models/Student");
const Assessment = require("../models/Assessment");
const logger = require("../utils/logger");

//Register a student //
exports.register = async (req, res) => {
  //Create a new user
  const student = new Student({
    name: req.body.name,
    year: req.body.year,
  });
  console.log(student);
  try {
    const savedStudent = await student.save();
    res.send({ student: savedStudent });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get student data //
exports.getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findOne({ _id: studentId });
    res.send({ student: student });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getStudentByName = async (req, res) => {
  console.log('hi')
  const studentName = req.params.studentName;
  studentName.toString();
  console.log(studentName);
  console.log("i am here");

  try {
    const student = await Student.findOne({ name: studentName });
    console.log(student);
    res.send({ student: student });
  } catch (err) {
    logger.error(err);
    res.status(400).send(err);
  }
};

// Add an assessment for a student //
exports.addAssessment = async (req, res) => {
  const studentId = req.params.id;
  logger.log(studentId);
  const student = await Student.findOne({ _id: studentId });

  //Create a new assessment and assign it to student
  const assessment = new Assessment({
    assessmentName: req.body.assessmentName,
    studentName: req.body.studentName,
    teacherName: req.body.teacherName,
    subject: req.body.subject,
    rating: req.body.rating,
    comments: req.body.comments,
  });
  logger.log(assessment);

  if (
    !assessment.teacherName ||
    !assessment.subject ||
    !assessment.rating ||
    !assessment.comments
  ) {
    console.log("Please enter all fields");
    return res.status(400).send("Please enter all fields");
  }

  try {
    await student.assessments.push(assessment);
    await student.save();
    res.send({ student: student });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete an assessment //  \\ METHOD NOT DELETING
exports.deleteAssessmentById = async (req, res) => {
  const studentId = req.params.id;
  const assessmentId = req.params.assessId;
  const student = await Student.findOne({ _id: studentId });
  const index = await getAssessmentIndex(studentId, assessmentId);

  try {
    student.assessments.splice(index, 1);
    student.markModified("assessments");
    await student.save();
    res.send({ student: student });
  } catch (err) {
    res.status(400).send(err);
    logger.log(err);
  }
};


exports.editAssessment = async (req, res) => {
  const studentId = req.params.id;
  const assessmentId = req.params.assessId;
  const student = await Student.findOne({ _id: studentId });
  const index = await getAssessmentIndex(studentId, assessmentId);
  logger.log(student.assessments[index]);

  const currentAssessment = student.assessments[index];
  const updatedData = {
    rating: req.body.rating,
    comments: req.body.comments,
  };
  try {
    student.assessments[index] = { ...currentAssessment, ...updatedData };
    student.markModified("assessments");

    const updated = await student.save();
    logger.log(updated);

    res.send(updated);
  } catch (err) {
    logger.error(err);
    res.status(400).send('The assessment could not be updated.');
  }
};

// Returns the index of a student's specified assessment //
async function getAssessmentIndex(studentId, assessmentId) {
  try {
    const student = await Student.findOne({ _id: studentId });
    const assessments = student.assessments;
    let assessmentIndex = null;

    assessments.forEach((assessment, index) => {
      if (assessment._id == assessmentId) {
        assessmentIndex = index;
      }
    });

    return assessmentIndex;
  } catch (err) {
    return err;
  }
}

exports.getAll = async (req, res) => {
  try {
    const students = await Student.find();
    res.send({ students: students });
  } catch (err) {
    res.status(400).send(err);
  }
};

