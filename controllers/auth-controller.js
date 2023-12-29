const User = require('../models/user-model'); 
const bcrypt = require('bcrypt');

 // Home Logic
 const home = async (req,res) => {
    try {
        res
        .status(200)
        .send("home Working...");
    } catch (error) {
        console.log(error);
    }
 }

 // Registration Logic
 const register = async (req,res) => {
    try {
        //console.log(req.body);
        const { username, email, phone, password } = req.body;

        //check if User already exists or not
        const userExist = await User.findOne({ email });

        if(userExist) {
            return res
                .status(400)
                .json({ message : "Email Already Exists!" });
        }

        console.log(req.body);
        const userCreated = await User.create({
            username, 
            email, 
            phone, 
            password,
        });
        res
        .status(201)
        .json({ 
            createdUser : 'User has been created', 
            //instance method
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        res
        .status(500)
        .json("Internal Server Error!");
    }
 }

 //Login logic 

 const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const userExist = await User.findOne({email});
        if(!userExist) {
            return res
                .status(400)
                .json({ message : "Invalid Credentials!" });
        }

        const passwordMatch = userExist.comparePassword(password);

        if(passwordMatch) {
            const token = await userExist.generateToken();
            //console.log(token); // Log the generated token
            res.status(200).json({
                loggedInUser : 'Login Succesful', 
                //instance method
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        } else {
            res
            .status(401)
            .json({
                message : "Invalid Email or Password"
            })
        }

    } catch (error) {
        //console.log(error);
        res
        .status(500)
        .json("Internal Server Error!");
    }
 }

 module.exports = {home,register,login};