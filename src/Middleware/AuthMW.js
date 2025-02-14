const jwt = require("jsonwebtoken");
const users = require('../Model/users')
const AuthMiddleWare = async(req,res,next)=>{
    const exisitngAccessToken =req.headers["authorization"].split(" ")[1];// Don't like this method 

    try {
        if(!exisitngAccessToken){
            return res.status(401).json({message:"Authorization failed!"});
        }
        console.log(exisitngAccessToken)
       const decodedToken = await jwt.decode(exisitngAccessToken);
       if(!decodedToken||!decodedToken._id){
        return res.status(404).json({message:"Error"})
       }
      const matchUser =await users.findById(decodedToken._id).select("-password -refreshtoken");
      if(!matchUser){
        return res.status(404).json({message:"No users in the db!"})
      }

      req.userExisitng = matchUser;
      next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {AuthMiddleWare};