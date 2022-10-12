const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
    },
    email: {
        type: String,
        required:true,
        // unique : true,
        trim: true,
        // lowercase: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    pass:{
        type:String,
        required:true,
        minlength:7,
    },
    date:{
        type:Date,
        // required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    tokens:
    [{
        token:{
            type:String,
            required: true,
        }
    }],
}, {
    timestamps:true,
}
);


userSchema.methods.generateAuthToken = async function(){
    const user = this;
    var token = jwt.sign({_id: user._id.toString()}, 'heyythere');

    user.token = user.tokens.concat({token});
    await user.save();

    return token;
}



userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('pass')){
        user.pass = await bcrypt.hash(user.pass , 7)
    }
    next();
});


const User = new mongoose.model("User", userSchema);

module.exports = User;