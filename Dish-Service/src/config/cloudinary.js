// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;  

cloudinary.config({ 
  cloud_name: 'dkuruj44a', 
  api_key: '345268945864934', 
  api_secret: 'Dh2EjmXmqOGvFNSK1Ze9d3RQHO0' 
});

module.exports = cloudinary;