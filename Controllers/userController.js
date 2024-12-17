const mongoose=require('mongoose')

const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')

//Register logic
exports.registerAPI =async(req,res)=>{
    console.log('Inside register')
    const{username,email,password}=req.body
    //if user already exists
    const existinguser=await users.findOne({email})
    if(existinguser){
        res.status(402).json({message:'user already existing..'})
    }
    else{
        const newUser=new users({
            username:username,
            email:email,
            password:password,
            github:"",
            linkedIn:"",
            profilePic:""
        })
        //await new user
        await newUser.save()
        res.status(200).json("user registratiion successful")
    }
}

//Login Logic
exports.loginAPI=async(req,res)=>{
    console.log('Inside login')
    const{email,password}=req.body
    //if user already exists
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},process.env.jwtkey)
            console.log(token)
            res.status(200).json({currentUser:existingUser,token})
        }
        else{
            res.status(404).json("Incorrect email or password")
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

