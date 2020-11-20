const mongoose = require('mongoose');
const moment = require('moment');

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
        min: 6,
    },
    subject:{
        type: String,
        required: true,
        min: 6,
    },
    date: {
        type: String, 
        default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
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