require('dotenv').config();
const cloudinary = require('cloudinary').v2;

async function connect() {
  await cloudinary.config({
    cloud_name: 'ddsikzemi',
   api_key: '853564394133989',
   api_secret: 'IxsNbULkfSaDorFXt4ybWJSd_cc',
  });
  console.log('Connected to Cloudinary');
}

exports.connect = connect;
