const handleImageUpload = async(path)=>{
    try {
        const uploadResult = cloudinaryInstance.uploader.upload(req.file.path)
        return uploadResult.url;
    } catch (error) {
        
    }
}

module.exports = {handleImageUpload}