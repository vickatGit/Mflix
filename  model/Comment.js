const mongoose = require('mongoose')

const Comment = mongoose.Schema({
    name : {type:String}, 
    email : {type:String}, 
    movie_id : { type : mongoose.Types.ObjectId , ref:'Movie' },
    text : {type:String}, 
    date : {type:Date}

})

module.exports = mongoose.model("Comment",Comment)