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
    posts: [
     {
        type: Schema.Types.ObjectId,
        ref : "posts" 
     }
    ],
}, {timestamps: true})

userschema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next()
    }
    bcrypt.hash(this.password,10,(err,hash)=>{
        if(err){
            console.log(err)
            return next()
        }
        this.password = hash
     }) 
   
    next();
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