require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');
// const user = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;


app.use(express.urlencoded({extended: true}));

console.log(process.env); // Check if your MongoDB URI is present in your environment variables

const uri = process.env.MONGODB_URI;

console.log(uri); 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is successfully connected');

  })
  .catch((err) => {
    console.log(`${err} --> Error Found in connecting.`);
  });

  
  



app.post('/signup', async (req,res) => {
    const {email,username, password, dob, topic, XP,  streak} = req.body;

    const hash = await bcrypt.hash(password, 12);
    // console.log(salt);
    try {
        const userDoc = await new User({
            email,
            username,
            password: hash, 
            dob,
            topic,
            XP,
            streak,
        })
        await userDoc.save();
    } catch (error) {
        res.status(400).json(error);    
    }
})

app.post("/login" , async (req,res) => {
    const {username,password}=req.body;
    const userDoc=await User.findOne({username:username});
    console.log(userDoc);
    const validPassword = await bcrypt.compare(password, userDoc.password);
    console.log(validPassword);
    if(validPassword){
        const token = jwt.sign({username,id:userDoc._id},"hackathon-secret-key",{})
        res.json({token});
    }
    else{
        res.status(400).json('Wrong Credentials')
    }
})



app.post('/logout', async(req,res) => {
    try {
        res.json({
            "isLoggedOut":true,
        })
    } catch (error) {
        console.log(error);
        res.json({
            "isLoggedOut":false,
        })
    }
})

app.listen(port, () => {
    console.log(`Listening to port ${port}.`)
})


