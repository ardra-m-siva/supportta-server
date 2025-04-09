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
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,         
                    secure: false   ,          
                    sameSite: 'Strict',    
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                  });
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
        const deletedUser = await users.findByIdAndDelete({ _id: userId })
        res.status(200).json(deletedUser)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.refreshTokenController = async (req, res) => {
    console.log("inside refreshTokenController");
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    
    try {
        if (refreshToken) {
            const decryptedRefreshToken = jwt.verify(refreshToken, process.env.JWTPASSWORD)
            console.log(decryptedRefreshToken);
            if (decryptedRefreshToken) {
                const newAccessToken = jwt.sign({ userId: decryptedRefreshToken.userId }, process.env.JWTPASSWORD, { expiresIn: '1h' })
                res.status(200).json({ accessToken: newAccessToken });
            }
        }else{
            res.status(401).json("No refresh token found" )
        }
    } catch (err) {
        res.status(403).json(err)
    }
}

exports.blockUserController = async (req, res) => {
    const userId = req.userId
    const { targetedUser } = req.body
    try {
        const existingUser = await users.findById({ _id: userId })
        if (existingUser) {
            if(existingUser.blockedUsers.includes(targetedUser)){
                res.status(400).json("User already Blocked")
            }else{
                existingUser.blockedUsers.push(targetedUser);
                await existingUser.save();
                res.status(200).json(existingUser)
            }
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.unblockUserController = async (req, res) => {
    const userId = req.userId
    const { targetedUser } = req.body
    try {
        const existingUser = await users.findById({ _id: userId })
        if (existingUser) {
            if(existingUser.blockedUsers.includes(targetedUser)){
                const unserUnblocked=await users.findByIdAndUpdate({_id:userId},{
                    $pull:{blockedUsers:targetedUser}
                },{new:true})
                res.status(200).json(unserUnblocked)
            }else{
                res.status(400).json("User is not blocked")
            }
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
