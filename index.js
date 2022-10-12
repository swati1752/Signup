const express = require('express');
require('./db/db')
const path = require('path');

const User = require('./models/user');
const app = express()

app.use(express.json());

const SignUpRouter = express.Router();
app.use('/signup',SignUpRouter);

// const publicDirectoryPath = path.join(__dirname, '/public/index.html');
// console.log(publicDirectoryPath);

getSignUpPage =  (req,res)=>{
    res.sendFile('/public/index.html' , {root:__dirname})
}

postSignUpData =  async(req,res) =>{
    const user = await User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        // console.log(token);
        res.status(201).send({user , token});
    }catch (e){
        res.status(400).send(e);
    }
};

SignUpRouter
.route('/')
.get(getSignUpPage)
.post(postSignUpData)




app.listen(3000 , ()=>{
    console.log(`server running at port 3000`);
})