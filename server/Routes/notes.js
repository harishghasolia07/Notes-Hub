const express = require('express');
const router = express.Router();
const NotesController = require('../Controllers/NotesController');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const destinationPath ="./files";
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

//Routes
router.post("/upload",upload.single("file"),NotesController.uploadNote); //(endpoint,file,function)
router.get("/getFiles",NotesController.getNote); //(endpoint,function)
router.get("/getFiles/:id",NotesController.getNoteById); //(endpoint,function)

module.exports = router;