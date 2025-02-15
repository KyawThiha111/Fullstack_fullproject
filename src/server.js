const express = require("express");
const env = require("dotenv").config({ path: ".env" });
const cors = require("cors");
const server = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const {authroutes} = require("./Routes/auth");
server.use(
  cors({
    origin: process.env.ORIGIN,
    Credential: true,
  })
);

server.use(express.json()); // allow Json
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(cookieParser())

/* Routes for blogs */

server.use("/api/v1",authroutes)
const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URL);
    console.log(result.connection.host);
    if (result) {
      await server.listen(process.env.PORT);
      console.log("Successfully connected to DB");
    }
  } catch (error) {
    console.log("Error occurs", error);
    process.exit(1);
  }
};

connectDB();
