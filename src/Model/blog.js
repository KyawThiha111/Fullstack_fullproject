const {Schema,model} = require("mongoose");
const blogschema = new Schema({
    username: {
        type: String,
    },
     email:{
        type:String,
        required: true,
        maxlength: 100
    },
    blog:{
     type: String,
     required:true,
     maxlength: 300
    }
})

module.exports =  model("blogs",blogschema)