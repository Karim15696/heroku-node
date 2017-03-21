var mongoose = require('mongoose');

var portfolioSchema = mongoose.Schema({
    username:String

})

var Portfolio = mongoose.model("portfolio", portfolioSchema);

module.exports = Portfolio;
