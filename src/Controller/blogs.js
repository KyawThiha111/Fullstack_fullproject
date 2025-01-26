const blogs = require("../Model/blog")
const mongoose = require("mongoose")
exports.addpost = (req,res)=>{
    const {username, email, blog} = req.body;
    blogs.create({username,email,blog}).then((result)=>{
        console.log("Added to the database")
     return res.status(202).send("Added post")
    })
}

exports.seepage = (req,res)=>{
    blogs.find().then(blog=>{
        return res.status(200).send(`Posts displayed: ${blog}`)
    }).catch(err=>{
        console.log(err)
    })
}

