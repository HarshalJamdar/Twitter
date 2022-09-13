
const tweetModel = require("../models/tweetModel")
const userModel = require("../models/userModel");
const { isValidRequestBody, isValid, isValidEmail, isValidPassword, isValidObjectId } = require("../utilities/validators")


const postTweet = async function(req,res){
    try{
        let requestBody = req.body;
        let userId = req.userId;

//==validating request body==//
     if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Please provide details"});  
     let { tweet } = requestBody;

//==validating description==//
    if (!isValid(tweet)) return res.status(400).send({ status: false, msg: "tweet is required" });

//==creating post==//    
    const savePost = await tweetModel.create({ tweet, userId});

//==sending succesfull response==//
    return res.status(201).send({ status: true, msg : "Successfull", tweetId : savePost._id }); 

    }catch(err){
    res.status(500).send({status:false, message:err.message});
    }
}


const getNewsFeed = async function(req, res){
    try{
        let requestBody = req.body;
    //==validating request body==//
        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Please provide details"});  
        let { userId } = requestBody;

    //==validating follow==//
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userId is not a valid" });

        let user = await userModel.findById({_id : userId} );
        if(!user ) return res.status(404).send({ status : false, msg : "User not found" });

        let user1 = await userModel.findOne({ email : req.email });
        if(!user1 ) return res.status(404).send({ status : false, msg : "User not found" });
        req.userId = user1._id; 
       
        let sendData = await tweetModel.find({userId}).sort({createdAt:-1}).limit(10);
        

        if( userId.toString() === req.userId.toString() ){
            return res.status(200).send({ status: true, msg : "Successfull", data : sendData }); 
        }else{
        //==checking if following ==//
            let temp = user1.following, isIdPresent = false;
            for(let i=0;i<temp.length;i++){
            if(temp[i].toString()===userId.toString()){
                isIdPresent = true;
                break;
            }
        }
            if(isIdPresent){
                return res.status(200).send({ status: true, msg : "Successfull", data : sendData }); 
            }else{
                return res.status(400).send({ status: false, msg : "Unsuccessfull, first follow user",  }); 
            }
      }
    }catch(err){
    res.status(500).send({status:false, message:err.message});
    }
}

//========================================================================================================//

module.exports = {  postTweet, getNewsFeed }

//========================================================================================================//
