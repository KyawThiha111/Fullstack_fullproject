const cloudinary = require("cloudinary").v2;
const env = require("dotenv").config();
const fs = require("fs")
cloudinary.config({ 
    cloud_name: 'dy42uk6tc', 
    api_key: '896439323964338', 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
 const uploadFileToCloudinary = async (filepath)=>{
    try {
        if(!filepath) return null;
        const uploadResult = await cloudinary.uploader
        .upload(
            filepath, {
                resource_type: "auto"
            }
        )
        fs.unlinkSync(filepath)
        return uploadResult // An obj with a url
    } catch (error) {
        console.log(error)
        fs.unlinkSync(filepath)
        return null
    }
}

module.exports = {uploadFileToCloudinary}
