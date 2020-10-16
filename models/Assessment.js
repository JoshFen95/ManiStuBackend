const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    assessmentName:{
        type: String,
        required: true,
        min: 6
    },
    studentName:{
        type: String,
        required: true,
        min: 6
    },
    teacherName:{
        type: String,
        required: true,
        min: 6
    },
    subject:{
        type: String,
        required: true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },

    comments: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Assessment', assessmentSchema);

// const Assessment = {
//         studentName:{
//         type: String,
//         // required: true,
//         min: 6
//     },
//     teacherName:{
//         type: String,
//         // required: true,
//         min: 6
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//         required: true
//     },
//     rating:{
//         type: Number,
//         // required: true
//     },

//     comments: {
//         type: String,
//         // required: true
//     },


// };

// module.exports = Assessment;