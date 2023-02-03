const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) =>{
    try {
        // req.body = newuser
        const {name, age, email, password, phone} = req.body;
        const foundUser = await User.findOne({email});
        if (foundUser){
            res.status(400).send({errors:[{msg: "Email is incorrect try again!!!"}]})
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        //newUser
        const newUser = new User({...req.body});
        newUser.password = hashedPassword;
        //save
        await newUser.save();
        //creation token
        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.SECRET_KEY,
            {expiresIn:"1H"}
        )
        res.status(200).send({msg:'Register successfully...', user: newUser, token});
    } catch (error) {
        res.status(400).send({errors:[{msg: "cannot register the user!!!"}]})
    }
}

exports.login = async (req, res) =>{
    try {
        const {email, password} =req.body;
        const foundUser = await User.findOne({email});
        if (!foundUser){
            res.status(400).send({errors:[{msg: "Email is not valid try again!!!"}]});
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if (!checkPassword){
            res.status(400).send({errors:[{msg: "Email or Password is not valid try again!!!"}]});
        }
         //creation token
         const token = jwt.sign(
            {
                id: foundUser._id
            },
            process.env.SECRET_KEY,
            {expiresIn:"1H"}
        )
        res.status(200).send({msg:'Login successfully...', user: foundUser, token});
    } catch (error) {
        res.status(400).send({errors:[{msg: "cannot login!!!"}]})
    }
}
