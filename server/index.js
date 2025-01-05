const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const cors=require('cors');
const User=require('./models/user.model.js');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcryptjs');


const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:process.env.CLEINT_URL
}))
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
const jwtsecret=process.env.JWT_SECRET;
const bcryptsalt=bcrypt.genSaltSync(10);

app.get('/test', (req, res) => {
    res.json("test ok");
});

//profile api
app.get('/profile',(req,res)=>{
   const token=req.cookies?.token; 
   if(token){
    jwt.verify(token,jwtsecret,{},(err,userdata)=>{
        if (err) throw err;
        res.json(userdata);
      })
   }else{
    res.json('no token').status(401);
   }
 
})

//register api

app.post('/register', async (req, res) => {
const {username,password}=req.body;
try {
    const hashpassword= bcrypt.hashSync(password,bcryptsalt);
    const createduser=await User.create({
        username:username,
        password:hashpassword
    });
 jwt.sign({userId:createduser._id,username},jwtsecret,{},(err,token)=>{
    if(err) throw err;
    res.cookie('token',token,{sameSite:'none',httpOnly:true,secure:true}).status(201).json({
        id:createduser._id,
        username:createduser.username
    });
 });

} catch (error) {
    console.log('there is error');
    if (error) throw error;
}
 
});


//login api
app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
   const founduser=await User.findOne({username});
   if (founduser){
       const passsame=bcrypt.compare(password,founduser.password);
       if(passsame){
        jwt.sign({userId:founduser._id,username},jwtsecret,{},(err,token)=>{
            res.cookie('token',token).json({
                id:founduser._id,
                username:founduser.username
            });
        });
       }
          
   }

})








app.listen(8080, () => {
    console.log('Server is running on port 8080');
});