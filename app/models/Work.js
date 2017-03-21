var mongoose = require('mongoose');

var workSchema = mongoose.Schema({
username:String,
title:{
    type:String,
    required:true,
    unique:true
},
URL:String
})

var Work = mongoose.model("work", workSchema);

module.exports = Work;
