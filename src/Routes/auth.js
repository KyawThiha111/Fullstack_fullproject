const blogcontroller = require("../Controller/auth");
const express = require("express")
const Route = express.Router();
const {upload} = require("../Middleware/multerStorage");

const userMulterdataupload = upload.fields([{name:'profilepic',maxCount:1},{name:'coverpic',maxCount:1}])
Route.post("/adduser",userMulterdataupload,blogcontroller.adduser);
module.exports = {authroutes: Route};
