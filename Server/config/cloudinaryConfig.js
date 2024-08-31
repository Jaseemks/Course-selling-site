const {v2} = require("cloudinary")

// Configuration
  v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const cloudinaryInstance = v2;

module.exports = {cloudinaryInstance}