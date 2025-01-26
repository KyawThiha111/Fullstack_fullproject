const blogcontroller = require("../Controller/blogs");
const express = require("express")
const Route = express.Router();
Route.post("/addpost", blogcontroller.addpost);
Route.get("/seepost", blogcontroller.seepage);

module.exports = {blogroutes: Route};
