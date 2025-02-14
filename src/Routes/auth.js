const usercontroller = require("../Controller/auth");
const express = require("express")
const Route = express.Router();
const {upload} = require("../Middleware/multerStorage");
const {AuthMiddleWare} = require("../Middleware/AuthMW")
const userMulterdataupload = upload.fields([{name:'profilepic',maxCount:1},{name:'coverpic',maxCount:1}])
Route.post("/signup",userMulterdataupload,usercontroller.signup);
Route.post("/login",usercontroller.login);
Route.get("/geneateTokens",usercontroller.generateTokensAfterAccessTokenExpired)
Route.get("/checkCookies",usercontroller.checkCookie);
Route.get('/logout',AuthMiddleWare,usercontroller.logout);
module.exports = {authroutes: Route};
