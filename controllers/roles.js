const Role = require("../models/roles")
const mongoose = require("mongoose")

// Get Id of Role in controller
exports.getRoleById = (req, res, next, id) => {
    try {
        Role.findById(id).populate("permission").exec((err, role) => {
            if(err) {
                return res.status(400).json({
                    error: "Role not found"
                })
            }
            req.role = role
            next()
        })
    } catch(error) {
        console.log(error)
    }
}

// Store Role data in DB
exports.createRole = (req, res) => {
    try{
        const role = new Role(req.body)
        role.save((err, role) => {
            if(err){
                return res.status(400).json({
                    error: "Role not found in DB"
                })
            }
            res.json({role})    
        })
    }catch(error){
        console.log(error)
    }
}

//get Role data
exports.getRole = (req, res) => {
    try {
        return res.json(req.role)
    } catch(error){
        console.log(error)
    }
}

//get All Role Data
exports.getAllRole = (req, res) => {
    try {
        Role.find().exec((err, roles) => {
            if(err) {
                return res.status(400).json({
                    error: "No roles found"
                })
            }
            res.json(roles)
        })
    } catch(error){
        console.log(error)
    }
}

//Update Role Data
exports.updateRole = async(req, res) => {
    try{
        let role = await Permission.findOne({ _id: mongoose.Types.ObjectId(req.body.roleId) })
        if(!role) {
            return res.send("Something Went wrong")
        } else {
            let editRole = await Role.updateMany({ _id: req.body.roleId }, {
                roleName: req.body.roleName,
                permissions: req.body.permissions,
                status: req.body.status
            })
            if(editRole.nModified > 0) {
                let role = await Role.findOne({ _id: mongoose.Types.ObjectId(req.body.roleId)});
                return res.send('Role details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Role Data
exports.deleteRole = (req, res) => {
    try{
        let role = req.role
        Role.deleteOne(role, (err, role) => {
            if(err) {
                return res.status(400).json({
                    error: "No role found"
                })
            }
            res.send('Role details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}