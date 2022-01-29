const Permission = require("../models/permissions")
const mongoose = require("mongoose")

// Get Id of lead in controller
exports.getPermissionById = (req, res, next, id) => {
    try {
        Permission.findById(id).exec((err, permission) => {
            if(err) {
                return res.status(400).json({
                    error: "Permission not found"
                })
            }
            return req.permission = permission
            next()
        })
    } catch(error) {
        console.log(error)
    }
}

//Store Permission data in DB
exports.createPermission = (req, res) => {
    try{
        const permission = new Permission(req.body)
        permission.save((err, permission) => {
            if(err){
                return res.status(400).json({
                    error: "Permission not found in DB"
                })
            }
            return res.json({permission})  
        })
    }catch(error){
        console.log(error)
    }
}


//get Permission data
exports.getPermission = (req, res) => {
    try {
        return res.json(req.permission)
    } catch(error){
        console.log(error)
    }
}

//get All Permission Data
exports.getAllPermission = (req, res) => {
    try {
        Permission.find().exec((err, permissions) => {
            if(err) {
                return res.status(400).json({
                    error: "No permissions found"
                })
            }
            return res.json(permissions)
        })
    } catch(error){
        console.log(error)
    }
}


//Update Permission Data
exports.updatePermission = async(req, res) => {
    try{
        let permission = await Permission.findOne({ _id: mongoose.Types.ObjectId(req.body.permissionId) })
        if(!permission) {
            return res.send("Something Went wrong")
        } else {
            let editPermission = await Permission.updateMany({ _id: req.body.permissionId }, {
                permissionName: req.body.permissionName,
                moduleName: req.body.moduleName,
                status: req.body.status
            })
            if(editPermission.nModified > 0) {
                let permission = await Permission.findOne({ _id: mongoose.Types.ObjectId(req.body.permissionId)});
                return res.send('Permission details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Permission Data
exports.deletePermission = (req, res) => {
    try{
        let permission = req.permission
        Permission.deleteOne(permission, (err, permission) => {
            if(err) {
                return res.status(400).json({
                    error: "No permission found"
                })
            }
            return res.send('Permission details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}