require("dotenv").config();
const { UserModel } = require("../models/user");
const { signinSchema } = require("../resources/zod/validationSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function signinUser(req, res){
    const userData = signinSchema.safeParse(req.body);

    if(!userData.success){
        const errors = {};

        userData.error.errors.forEach((e)=>{
            errors[e.path[0]] = e.message;
        })

        return res.status(400).json({ errors });
       
    }

    const {email, password} = userData.data;

    try{

        const userFound = await UserModel.findOne({email});

        if(!userFound){
            return res.status(404).json({error: "User not found"});
           
        }

        const isPasswordValid = bcrypt.compare(password, userFound.password);

        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid password"});    
        }

        const token = jwt.sign({id: userFound._id}, JWT_SECRET);

        return res.status(200).json({msg: "User logged", token});
        

    } catch(err){

        return res.status(500).json({error: "Cannot Login, Try again"})
    
    }

}

module.exports = {signinUser}