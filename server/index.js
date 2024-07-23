const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./Routes/auth');  
const noteRoutes = require('./Routes/notes');   

const app = express();
const port = process.env.PORT || 5000;  

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

try{
    mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully!!');    
}
catch(err){
    console.log(err);
}
 
app.get("/",(req,res)=>{ 
    res.send("Server is running");
})

app.use("/auth",authRoutes);
app.use("/notes",noteRoutes);

app.use("/files", express.static("files")); //For open the pdf file in browser


app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});