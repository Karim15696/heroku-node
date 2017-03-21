var mongoose = require('mongoose');

var registerSchema = mongoose.Schema({
    username: String,
    password: String,
    image:String

})

var Register = mongoose.model("register", registerSchema);

module.exports = Register;
