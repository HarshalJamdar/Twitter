const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const tweetSchema = new mongoose.Schema({
    
userId: ObjectId,

tweet: {
    type:String,
    required:true, 
    trim:true,
},

isDeleted : {
    type : Boolean,
    default : false
}

},{ timestamps:true }
)

module.exports=mongoose.model("tweet", tweetSchema);