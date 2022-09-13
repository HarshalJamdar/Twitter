const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const userModel = require("../models/userModel")


    const authentication = async function (req, res, next) {
    try {
        let token = req.header('Authorization','Bearer Token')
  
        if (!token) return res.status(400).send({ status: false, message: "Token is required" })
    
        let decodedToken = jwt.verify(token.split(" ")[1], "hafvgjh",(err, decoded) => {    
        if (!decoded) {
        return res.status(401).send({ status: false, message: "Invalid token", err: err.message })
        } else {
        req.email = decoded.userId
        next();
    }
    });
    } catch (err) {
        return res.status(500).send({ status: false,  message: err.message })
    }
}

//**********************************************************************//

const authorization = async function (req, res, next) {
    try {
        let userEmail = req.email
        let user1 = await userModel.findOne({ email : userEmail });
        if(!user1 ) return res.status(404).send({ status : false, msg : "User not found" });
        req.userId = user1._id; 

        let tokenId = req.userId;
        let user = req.body.follower || req.params.userId;

        if (!isValidObjectId(user)) return res.status(400).send({status:false,message:`User id ${user} is invalid`})

        const findUser= await userModel.findOne({_id:user});
        if (!findUser) return res.status(404).send({ status: false, message: 'User not found' })
        const {_id} = findUser;

        if(tokenId.toString()!==_id.toString()) return res.status(403).send({ status: false, message: "Unauthorized to perform action." })
        next()
    }catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//**********************************************************************//

 module.exports = { authentication ,authorization}

//**********************************************************************//
