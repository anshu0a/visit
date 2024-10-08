
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(40); 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'visit_dev',
        allowedFormat: async (req, file) => ['png', 'jpg', 'jpeg'],
    },
})
 const removeimage = async(hh)=>{
    hh= hh.trim();
  await cloudinary.uploader.destroy(hh);

};

module.exports = {
    cloudinary,
    storage,
    removeimage,
};
