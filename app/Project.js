var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
username:String,
title:{
    type:String,
    required:true,
    unique:true
},
    URL:String
})

var Project = mongoose.model("project", projectSchema);

module.exports = Project;
