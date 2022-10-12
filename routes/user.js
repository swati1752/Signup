const express = require('express');
const User = require('../models/user');
const app = express()

app.use(express.json());

const SignUpRouter = express.Router();
app.use('/signup',SignUpRouter);


getSignUpPage =  (req,res)=>{
    res.sendFile(__dirname + './public/index.html' )
}

postSignUpData =  async(req,res) =>{
    const user = await User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        console.log(token);
        res.status(201).send({user , token});
        // res.redirect('home.hbs')
    }catch (e){
        res.status(400).send(e);
    }
};

SignUpRouter
.route('/signup')
.get(getSignUpPage)
.post(postSignUpData)

module.exports = SignUpRouter;
