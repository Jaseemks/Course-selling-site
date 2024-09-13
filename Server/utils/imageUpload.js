const { cloudinaryInstance } = require("../config/cloudinaryConfig")

const handleImageUpload = async(path)=>{
    try {
        console.log('hitttttttttttttttttt');
        
        const uploadResult =  await cloudinaryInstance.uploader.upload(path)
        console.log(uploadResult);
        return uploadResult.url;
        
        
    } catch (error) {
        // next(error);
    }
}

module.exports = {handleImageUpload}