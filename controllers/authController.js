const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { v4 : uuidv4 } = require("uuid")
const User = require("../models/userModel")
const otpService = require("../services/otpService")
const tokenService = require("../services/tokenService")
const logger = require("../utils/logger")

exports.register = async (req,res) => {
    try {
        const {username, dob, referralCode, passCode} = req.body;

        const existingUser = await User.findOne({username});
        if(existingUser){ 
            logger.warn(`Registration failed Username ${username} already exists`)
            return res.status(400).json({message : "User already exists"})
        }

        const hashedPasscode = await bcrypt.hash(passCode, 10)
        
        const user = new User({
            userId : uuidv4(),
            username,
            dob,
            referralCode,
            passCode : hashedPasscode
        })

        await user.save()
        logger.info(`User registered : ${username}`)
        res.status(201).json({message : "User registerd Successfully"})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
}


exports.login = async (req,res) => {
    try {
        const {username, passCode, otp} = req.body;

        const user = await User.findOne({username});
        if(!user){
            logger.warn(`Login attempt failed Username ${username} doesnot exist`)
            return res.status(404).json({message : "Not found"})
        } 
        
        const isMatch = await bcrypt.compare(passCode, user.passCode);
        if(!isMatch){
            logger.warn(`Login attempt failed passCode doesnot match`)
            return res.status(401).json({message : "Invalid credentials"})
        }

        const isotpValid = await otpService.verifyOtp(username, otp);
        if(!isotpValid){
            logger.warn(`Login attempt failed Invalid otp provided`)
            return res.status(401).json({message : "Invalid otp"})
        }
        
        const token = tokenService.generateToken(user)
        logger.info(`User LoggedIn : ${username}`)
        res.status(201).json({ token })
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
}


exports.sendOtp = async (req,res) => {
    try {
        const {username} = req.body;

        const user = await User.findOne({username});
        if(!user){
            logger.warn(`Login attempt failed Username ${username} doesnot exist`)
            return res.status(404).json({message : "Not found"})
        }
        
        const otp = otpService.generateOtp(username);
        
        logger.info(`otp generated for ${username}`);

        res.status(201).json(otp)
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
}