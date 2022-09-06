const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the comments schema
const CommentSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
     date:{
        type:Date,
        default:Date.now
     },
    


 });
 
 module.exports = Comment = mongoose.model('comments', CommentSchema);