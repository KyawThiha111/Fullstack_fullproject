const {Schema,model} = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const env = require("dotenv").config();
const userschema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        maxlength: 50
    },
     email:{
        type:String,
        required: true,
        maxlength: 70
    },
    password:{
     type: String,
     required:true,
     maxlength: 300,
     trim: true
    },
    profilephoto: {
        type: String
    },
    coverphoto:{
      type: String
    },
    refreshtoken:{
     type: String
    },
    posts: [
     {
        type: Schema.Types.ObjectId,
        ref : "posts" 
     }
    ],
}, {timestamps: true})

userschema.pre('save', async function(next){
   try {
    if(!this.isModified("password")){
        return next()
    }
    const hashpassword = await bcrypt.hash(this.password,10);
    this.password = hashpassword
    return next()
   } catch (error) {
     console.log(error)
     return next()
   } 
})

userschema.methods.isPasswordMatch= async function(password){
    return await bcrypt.compare(password, this.password)
}

userschema.methods.generateAccessToken = async function(){
    jwt.sign({
        _id: this._id,
        username: this.username,
        email : this.email
    }),process.env.SECRET_KEY_TOKEN ,
    {expiresIn: "1h"}
}

userschema.methods.generateRefreshToken = async function(){
    jwt.sign(
        {_id: this._id}, process.env.REFRESH_KEY ,{expiresIn: "1d"}
    )
}

module.exports =  model("users",userschema)