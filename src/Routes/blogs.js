const blogcontroller = require("../Controller/blogs");
const express = require("express")
const Route = express.Router();
Route.post("/adduser", blogcontroller.adduser);
Route.get("/seepost", blogcontroller.seepage);
Route.post("/addpost",blogcontroller.addposts)
module.exports = {blogroutes: Route};
