const {Schema, model} = require("mongoose");

const postSchema = new Schema({
    title : {
        type: String,
        maxlength: 150,
        unique: true
    },
    blog : {
        type: String,
        maxlength: 500,
        unique: true
    }
}, {timestamps: true})

module.exports = model("posts", postSchema)