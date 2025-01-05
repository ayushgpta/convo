const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const cors=require('cors');
const User=require('./models/user.model.js');


const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:process.env.CLEINT_URL
}))

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
const jwtsecret=process.env.JWT_SECRET;

app.get('/test', (req, res) => {
    res.json("test ok");
});



//register api

app.post('/register', async (req, res) => {
const {username,password}=req.body;
try {
    const createduser=await User.create({username,password});
 jwt.sign({userId:createduser._id},jwtsecret,{},(err,token)=>{
    if(err) throw err;
    res.cookie('token',token,{httpOnly:true}).status(201).json({
        id:createduser._id,
        username:createduser.username
    });
 });

} catch (error) {
    console.log('there is error');
    if (error) throw error;
}
 
});






app.listen(8080, () => {
    console.log('Server is running on port 8080');
});