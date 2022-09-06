 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 
 //create the user schema
 let UserSchema = new Schema({
   
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
   
    password:{
        type:String,
        require:true
    },
    post:[{
        type: Schema.Types.ObjectId,
        ref:'posts',
        require:true
    }],
    date:{
        type:Date,
        default:Date.now
    }
 });

 module.exports = User = mongoose.model('users', UserSchema);