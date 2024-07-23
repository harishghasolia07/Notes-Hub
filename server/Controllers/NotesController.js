const express = require('express');
const Notes = require('../Models/Notes');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const storage = multer.memoryStorage();

var upload = multer({storage: storage});

//Upload a note
const uploadNote = async (req,res) =>{
    try{
        const fileName = req.body.title;
        const fileDescription = req.body.desc;
        const tags = req.body.tags;
        const file = req.file.filename;    

        const uploadedBy = req.body.userId;
        console.log(uploadedBy);

        const newFile = new Notes({
            fileName: fileName,
            fileDescription: fileDescription,
            tags:tags,
            files:file,
            uploadedBy:uploadedBy
        });

        await newFile.save();
        res.send({status:"ok"});
    }
    catch(err){
        res.status(400).json({error:err.message});
        console.log(err);
    }
}

//Get all notes
const getNote = async (req,res) =>{
    try{
        const {title,tag} = req.query;
        const query = {};

        if(title){
            query.fileName = {
                $regex: title,
                $options: 'i'
            };
        }
        if(tag){
            query.tag = {
                $regex: tag,
                $options: 'i'
            };
        };
        const data = await Notes.find(query);
        res.send({data:data});
    }
    catch(err){
        res.status(400).json({error:err.message});
        console.log(err);
    }
}

//Get note by id
const getNoteById = async (req,res) =>{   
    try{
        userId = req.params.id;
        console.log(userId);

        await Notes.find({
            uploadedBy:userId
        }).then(data=>{
            res.send({data:data})
        })
    }
    catch(err){
        res.status(400).json({error:err.message});
        console.log(err);
    }
}

module.exports = {uploadNote, getNote, getNoteById}