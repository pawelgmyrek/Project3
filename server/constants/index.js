require('dotenv').config();

export const CLOUDINARY_AUTH_URL = `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/resources/image`;

// mongo database locations
export const { MONGODB_URI } = process.env;
export const MONGODB_LOCATION = MONGODB_URI || 'mongodb://localhost/review221';

// site domain
export const DOMAIN = process.env.DOMAIN || 'http://localhost';

// port
export const PORT = process.env.PORT || 3001;
