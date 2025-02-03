const users = require("../Model/users");
const posts = require("../Model/posts");
const mongoose = require("mongoose");
const { uploadFileToCloudinary } = require("../utils/cloudinary");
const fs = require("fs");
exports.adduser = async (req, res) => {
  const { username, email, password } = req.body;
  const propicpath = req.files.profilepic[0].path;
  const coverpicpath = req.files.coverpic[0].path;
  let propicUrl = null;
  let coverpicUrl = null;
  try {

    if([username,email,password].some(field=> field.trim()==="")){
        fs.unlinkSync(propicpath);
        fs.unlinkSync(coverpicpath);
        return res.status(402).json({message:"Field required!"})
    }
    const existinguser = await users.findOne({
        $or: [{username},{email}]
    })
    if(existinguser){
        fs.unlinkSync(propicpath);
        fs.unlinkSync(coverpicpath);
        return res.status(409).json({message:"User Excisting"})
    }

    if (!propicpath) return null;
    const propicresult = await uploadFileToCloudinary(propicpath);
    propicUrl = propicresult.url;

    if (!coverpicpath) return null;
    const coverpicresult = await uploadFileToCloudinary(coverpicpath);
    coverpicUrl = coverpicresult.url;

    const newuser = await users.create({
      username,
      email,
      password,
      profilephoto: propicUrl,
      coverphoto: coverpicUrl,
    });

    const newuserInfo = await users.findById(newuser._id).select(" -password -refreshtoken");
    if(!newuserInfo){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(202).json({message:"New user added!", newuser: newuserInfo});
  } catch (error) {
    fs.unlinkSync(propicpath)
    fs.unlinkSync(coverpicpath)
    console.log(err);
  }
};
