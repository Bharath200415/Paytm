const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
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
                "$regex":filter
            }
            
        },{
            lastName:{
                "$regex":filter

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