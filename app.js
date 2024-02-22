require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');
const Roadmap=require('./models/roadmap');
// const user = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
    const {email,username, password, dob, topic, XP,  streak} = req.body;

    const hash = await bcrypt.hash(password, 12);
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


// app.post("/roadmap/graphql", async (req,res) => {
//   try {
//     const graphqlDoc= new Roadmap({
//       topic:"GraphQl",
//       roadmap:                    
//       })
//     await graphqlDoc.save()
//     console.log('Done');
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.post("/roadmap/aws", async (req,res) => {
//   try {
//     const awsDoc= new Roadmap({
//       topic:"AWS",
//       roadmap:                    
//       })
//     await awsDoc.save()
//     console.log('Done');
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.post("/roadmap/docker", async (req,res) => {
//   try {
//     const dockerDoc= new Roadmap({
//       topic:"Docker",
//       roadmap:                    
//       })
//     await dockerDoc.save()
//     console.log('Done');
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.post("/roadmap/kubernetes", async (req,res) => {
//   try {
//     const kuberDoc= new Roadmap({
//       topic:"Kubernetes",
//       roadmap:                    
//       })
//     await kuberDoc.save()
//     console.log('Done');
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.post("/roadmap/mongodb", async (req,res) => {
//   try {
//     const mongoDoc= new Roadmap({
//       topic:"MongoDB",
//       roadmap:                    
//       })
//     await mongoDoc.save()
//     console.log('Done');
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// app.post("/roadmap/promptengineering", async (req,res) => {
//   try {
//     const promptDoc= new Roadmap({
//       topic:"PromptEngineering",
//       roadmap:                    
//       })
//     await promptDoc.save()
//     console.log('Done');
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

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


