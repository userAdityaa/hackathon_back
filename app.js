require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');
const Roadmap=require('./models/roadmap');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roadmap = require('./models/roadmap');
const app = express();
const port = 3000;


app.use(express.urlencoded({extended: true}));



const uri = process.env.MONGODB_URI;


mongoose.connect(uri)
  .then(() => {
    console.log('Mongoose is successfully connected');

  })
  .catch((err) => {
    console.log(`${err} --> Error Found in connecting.`);
});






app.post('/signup', async (req,res) => {
    const {email,username, password} = req.body;

    const hash = await bcrypt.hash(password, 12);
    try {
        const userDoc = await new User({
            email,
            username,
            password: hash, 
        })
        await userDoc.save();
        console.log(userDoc);
    } catch (error) {
        res.status(400).json(error);    
    }
})




app.post("/login" , async (req,res) => {
    const {email, password}=req.body;
    try{
        const userDoc = await User.findOne({email: email});

        const validPassword = await bcrypt.compare(password, userDoc.password);
        console.log(validPassword);
        if(validPassword){
            const token = jwt.sign({email,id:userDoc._id},"hackathon-secret-key",{})
            res.json({token});
            console.log("User Logged in");
        }
        else{
            res.status(400).json('Wrong Credentials')
        }
    }
    catch(e){
        res.status(401).json('User Not Found');
    }
})


app.get('/user/topic/:id', async(req, res) => {
    const {id} = req.params;
    const topic = await Roadmap.findOne({_id: id});
    res.json(topic.roadmap.days);
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

app.get('/topics', (req,res) => {
    let topicObj=[{}];
    Roadmap.find({})
    .then((docs) => {
        docs.map((res) => {
            topicObj=[...topicObj,{id:res._id,topic:res.topic}]
        })
        let filteredTopics = topicObj.filter(obj => Object.keys(obj).length !== 0);
        res.json(filteredTopics); 
    }
    )
    .catch((err) => console.log(err)); 
     
})

app.listen(port, () => {
    console.log(`Listening to port ${port}.`)
})


