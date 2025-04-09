const users = require('../models/userModel')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUserController = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(409).json("User Already Exists.. Login to Continue")
        } else {
            const encrypterPassword = await bycrypt.hash(password, 16)
            const newUser = new users({
                username, email, password: encrypterPassword, profilePhoto: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.loginUserController = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const decryptedPassword = await bycrypt.compare(password, existingUser.password)
            if (decryptedPassword) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD, { expiresIn: '1h', notBefore: '0' })
                const refreshToken = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD, { expiresIn: '7d', notBefore: '0' })
                res.status(200).json({ user: existingUser, accessToken: token, refreshToken })
            }
        } else {
            res.status(404).json("New User? Please Register")
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.editUserController = async (req, res) => {
    const { username, email, password, profilePhoto } = req.body
    const updatedProfilePhoto = req.file ? req.file.filename : profilePhoto
    const userId = req.userId
    try {
        const updatedUser = await users.findByIdAndUpdate({ _id: userId }, {
            username, email, password, profilePhoto: updatedProfilePhoto
        }, { new: true })
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteUserController = async (req, res) => {
    const userId = req.userId
    try {
        const deletedUser = await users.findByIdAndDelete( {_id:userId} )
        res.status(200).json(deletedUser)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.refreshTokenController=async(req,res)=>{
    console.log("inside refreshTokenController");
    const {refreshToken} = req.body
    
    try{
        if(refreshToken){
            const decryptedRefreshToken=jwt.verify(refreshToken,process.env.JWTPASSWORD)
            console.log(decryptedRefreshToken);
            if(decryptedRefreshToken){
                const newAccessToken=jwt.sign({userId:decryptedRefreshToken.userId}, process.env.JWTPASSWORD, { expiresIn: '1h' })
                res.status(200).json({ accessToken: newAccessToken });
            }
        }
    }catch(err){
        res.status(403).json(err)
    }
}

