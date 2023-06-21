const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true

    },
    location : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("email invalid")
            }
        }
    },
    password : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})


const User = new mongoose.model("User", usersSchema)

module.exports = User