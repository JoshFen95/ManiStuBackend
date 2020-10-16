const Teacher = require('../models/Teacher');

exports.createTeacher = async(req, res) => {
    //Create a new user
const teacher = new Teacher({
  teacherName: req.body.teacherName,
  password: req.body.password,
});
console.log(teacher);
try {
  const savedTeacher = await teacher.save();
  //   res.send({studentId: savedStudent._id});
  res.send({ teacher: savedTeacher });
} catch (err) {
  res.status(400).send(err);
}
};

exports.me = function(req, res) {
  res.json(req.teacher.toJson());
};