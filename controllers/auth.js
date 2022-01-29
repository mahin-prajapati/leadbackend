const formidable = require("formidable")
const User = require("../models/user")
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const fs = require("fs")
const _ = require("lodash")
const { check, validationResult } = require("express-validator");

// Get Id of User in controller
exports.getUserById = (req, res, next, id) => {
    try{
        User.findById(id).exec((err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "User not found"
                })
            }
            return req.user = user
            next()
        })
    }catch(error){
        console.log(error)
    }
}

// Create User Data
exports.createUser = (req, res) => {
    try {
        let form = new formidable.IncomingForm({multiples: true});
        form.keepExtensions = true;

        form.parse(req, (err, fields, file) => {
            if(err) {
                return res.status(400).json({
                    error:"problem with image"
                })
            }
            // Destructure the field
            const { companyId, roleId, firstName, lastName, email, password, mobile, contactNum } = fields;

            if(!companyId || !roleId || !firstName || !lastName || !email || !password || !mobile || !contactNum) {
                return res.status(400).json({
                    error: "Please include all fields"
                })
            }

            let user = new User(fields)
            // Handle file here
            if(file.avtar) {
                if(file.avtar.size > 3000000 ) {
                    return res.status(400).json({
                        error: "File size to big"
                    })
                }
                user.avtar.data = fs.readFileSync(file.avtar.path)
                user.avtar.contentType = file.avtar.type
            }

            // Save to the DB
            user.save((err, user) => {
                if(err) {
                    return res.status(400).json({
                        error: "Saving user in DB failed"
                    })
                }
                return res.json(user)
            })
        })      
    } catch(error) {
        console.log(error)
        res.send("something went wrong")
    }
}

//Create Signin for user
exports.signin = (req, res) => {
    try {
        const errors = validationResult(req)
        const {email, password} = req.body

        if(!errors.isEmpty()){
            return res.status(422).json({
                error: errors.array()[0].msg
            })
        }

        User.findOne({email}, (err, user) => {
            if(err || !user){
                return res.status(400).json({
                    error : "User email does not exist"
                })
            }

            if(!user.authenticate(password)){
                return res.status(401).json({
                    error: "Email and password do not match"
                })
            }

            const token = jwt.sign({_id: user._id}, process.env.SECRET)
            res.cookie("token", token, {expire: new Date() + 9999})

            const { _id, companyId, roleId, firstName, lastName, email, mobile, contactNum, status } = user
            return res.json({ token, user: { _id, companyId, roleId, firstName, lastName, email, mobile, contactNum, status } })
        })    
    } catch(error) {
        console.log(error)
    }
    
}

//Get User Information
exports.getUser = (req, res) => {
    try{
        return res.json(req.user)
    }catch(error){
        console.log(error)
    }
}

//Get All User Information
exports.getAllUser = (req, res) => {
    try{
        User.find().populate("companyId roleId").exec((err, user) => {
        if(err) {
            return res.status(400).json({
                error: "No user found"
            })
        }
        return res.json(user)
    })
    }catch(error){
        console.log(error)
    }
}

//Update User Data
exports.updateUser = async(req, res) => {
    try{
        let form = new formidable.IncomingForm({multiples: true});
            form.keepExtensions = true;

            form.parse(req, (err, fields, file) => {
                if(err) {
                    return res.status(400).json({
                        error:"problem with image"
                    })
                }

                let user = req.user
                user = _.extend(user, fields)
                
                // Handle file here
                if(file.avtar) {
                    if(file.avtar.size > 3000000 ) {
                        return res.status(400).json({
                            error: "File size to big"
                        })
                    }
                    user.avtar.data = fs.readFileSync(file.avtar.path)
                    user.avtar.contentType = file.avtar.type
                }

                // Save to the DB
                user.save((err, user) => {
                    if(err) {
                        return res.status(400).json({
                            error: "Update user failed"
                        })
                    }
                    return res.json(user)
                })
            })
    } catch(error) {
        console.log(error)
    }
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout"
    })
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not admin. Access Denied"
        })
    }
    next()
}