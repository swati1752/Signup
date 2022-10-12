const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log(`connection succesful`);
}).catch((e) =>{
    console.log(`no connection`);
});

