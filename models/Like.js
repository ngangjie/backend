const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the BlogLike schema
const LikeSchema = new Schema({
    post:{
        type:String,
        require:true
    },
    user:{
        type:String,
        require:true
    },
     date:{
        type:Date,
        default:Date.now
     },
    


 });
 
 module.exports = BlogLike = mongoose.model('likes', LikeSchema);