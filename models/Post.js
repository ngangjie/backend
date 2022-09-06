const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
   title:{
       type:String,
       require:true
   },
   description:{
       type:String,
       require:true
   },
   author:{
       type:String,
       require:true
   },
   image:{
    type:String,
    require:true
   },
    comments:[{
        type: Schema.Types.ObjectId,
        ref:'comments',
        require:true
    }],
      
  likes:[{
    type: Schema.Types.ObjectId,
    ref:'likes',
    require:true
   }],
   date:{
       type:Date,
       default:Date.now
   }
});


module.exports = User = mongoose.model('posts', PostSchema);