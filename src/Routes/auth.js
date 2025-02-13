const usercontroller = require("../Controller/auth");
const express = require("express")
const Route = express.Router();
const {upload} = require("../Middleware/multerStorage");

const userMulterdataupload = upload.fields([{name:'profilepic',maxCount:1},{name:'coverpic',maxCount:1}])
Route.post("/signup",userMulterdataupload,usercontroller.signup);
Route.post("/login",usercontroller.login);
Route.get("/getcookie",usercontroller.getCookiedata)
module.exports = {authroutes: Route};
