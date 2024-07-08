const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: "demo4g1qf",
  api_key: "433437319416881",
  api_secret: "e2VMYNVJMJaNPa9AghB4_FXVtp8"

});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
   destination: function (req, file, cb) {
    cb(null, '/ECO-ONLINE-FOLDER'); 
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image (you can use a library like 'uuid' for this)
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

module.exports = {upload};
