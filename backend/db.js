const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:Bh%407204517094@cluster0.zjn1vva.mongodb.net/")

//Simple way: 

// const userSchema = new mongoose.Schema({
//     username:String,
//     password:String,
//     firstname: String, // String is shorthand for {type: String}
//     lastname: String
// });

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }

})

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}