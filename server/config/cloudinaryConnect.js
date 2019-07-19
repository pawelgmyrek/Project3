require('dotenv').config();
const cloudinary = require('cloudinary').v2;

async function connect() {
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('Connected to Cloudinary');
}

exports.connect = connect;
