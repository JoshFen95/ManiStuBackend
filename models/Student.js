const mongoose = require('mongoose');
const Assessment = require('./Assessment');


const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6
    },
    year: {
        type: Number,
        required: true
    },
    assessments: [],

});

module.exports = mongoose.model('Student', studentSchema);