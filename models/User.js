const  mongoose  = require("mongoose");

// Schema
const {Schema, model}= mongoose

// create schema
const UserSchema = new Schema ({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: Number
});

// export
module.exports = User = model("user", UserSchema);