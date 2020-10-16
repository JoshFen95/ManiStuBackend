const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max:1024
    },

});

module.exports = mongoose.model('Parent', parentSchema);