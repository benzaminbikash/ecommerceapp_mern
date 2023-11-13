const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const cloudinaryImage = async (uploadfile) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(uploadfile, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
  });
};
module.exports = { cloudinaryImage };
