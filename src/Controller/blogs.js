const users = require("../Model/users")
const posts = require("../Model/posts")
const mongoose = require("mongoose")
exports.adduser = (req,res)=>{
    const {username, email,password, profilephoto} = req.body;
    users.create({username,email,password,profilephoto}).then((result)=>{
        console.log("Added to the database")
     return res.status(202).send("Added post")
    })
}

exports.seepage = (req,res)=>{
    users.find().then(user=>{
        return res.status(200).send(`Users displayed: ${user}`)
    }).catch(err=>{
        console.log(err)
    })
}

exports.addposts = (req,res)=>{
    const {title, blog} = req.body;
    posts.create({title,blog}).then(result=>{
        return res.status(202).send("Post added!")
    }).catch(err=>{
        console.log(err)
    })
}
