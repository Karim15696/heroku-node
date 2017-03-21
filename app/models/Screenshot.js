var mongoose = require('mongoose');

var Screenshot = mongoose.Schema({
username:String,
title:{
    type:String,
    required:true,
    unique:true
},
image:String
})

var Screenshot = mongoose.model("Screenshot", Screenshot);

module.exports = Screenshot;
