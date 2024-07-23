const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

dotenv.config();

const router = express.Router();

// Configure Multer
const storage = multer.memoryStorage();

const upload = multer({storage: storage,});

// Signup Route
const signup = async (req, res) => {
  try {
    const { firstName, lastName, userBio, userEmail, userMobile, userName } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ userEmail });
    if (userExists) {
      return res.status(401).send("User already exists with this email");
    }

    // Check if file is provided (Profile Image)
    if (!req.file) {
      return res.status(400).json({ error: "No Profile Image Provided" });
    }

    // Upload profile image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    // Encrypt the password
    const password = req.body.userPassword;
    const saltRounds = 10; // For password hashing
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);
    console.log("Request Body: ", req.body);

    // Create a new user using the User model
    const newUser = new User({
      firstName,
      lastName,
      userBio,
      userEmail,
      userMobile,
      userName,
      userPassword: encryptedPassword,
      profileImage: result.secure_url,
    });

    await newUser.save();

    // Generate JWT token
    // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // return res.status(200).json({
    //     status: 'ok',
    //     user: newUser,
    //     token: token // Send the JWT token to the client
    // });

    return res.status(200).json({
        status: "Ok",
        user: newUser
    });
    // res.redirect("/login");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Login Route
const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    // console.log(userEmail);

    const user = await User.findOne({ userEmail });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        userPassword,
        user.userPassword
      );
      if (passwordMatch) {
        return res.json(user);
      } else {
        return res.json({ status: "Error", getUser: false });
      }
    } else {
      return res.json({ status: "Error", getUser: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { signup, login };
