const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

const router = express.Router();

const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string()
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (!success){
        return res.json({
            message:"Email already taken"
        })
    }

    const Existinguser = await User.findOne({
        username:req.body.username,
    })

    if (Existinguser){
        return res.status(411).json({
            message:"User already exists, Signin instead"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    const userId = user._id;
 
    await Account.create({
        userId,
        balance:1+Math.random()*10000

    })
    const token = jwt.sign({
        userId
    },JWT_SECRET);
    
    res.json({
        message:"user created successfully",
        token:token
    })
 
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (!success){
        return res.json({
            message:"Email already taken"
        })
    }

    const Existinguser = await User.findOne({
        username:req.body.username,
    })

    if (Existinguser){
        return res.status(411).json({
            message:"Email alaready taken"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"user created successfully",
        token:token
    })
 
});

router.get("/bulk",async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName:{
                "$regex":filter,
                "$options": "i"
            }
            
        },{
            lastName:{
                "$regex":filter,
                "$options": "i"

            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router;