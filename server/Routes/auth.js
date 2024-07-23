const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');
const multer = require('multer');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');



dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const destinationPath ="./images";
        cb(null, destinationPath);
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix+file.originalname);                            
    },

});

var upload = multer({
    storage: storage
});

//SignUp
router.post("/signup", upload.single("profileImage"),authController.signup);

//Login
router.post("/login", authController.login); //(endpoint,function)=>("/login",authController.login);
  

module.exports = router;