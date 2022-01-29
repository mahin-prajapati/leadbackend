const Commtype = require("../models/commTypes")
const mongoose = require("mongoose")

// Get Id of Communication type in controller
exports.getCommtypeById = (req, res, next, id) => {
    try{
        Commtype.findById(id).exec((err, commType) => {
            if(err) {
                return res.status(400).json({
                    error: "Commtype not found"
                })
            }
            req.commType = commType
            next()
        })
    } catch(error){
        console.log(error)
    }
}

//Store Communication type data in DB
exports.createCommtype = (req, res) => {
    try{
        const commtype = new Commtype(req.body)
        commtype.save((err, commtype) => {
            if(err){
                return res.status(400).json({
                    error: "Commtype not able to save"
                })
            }
            res.json({commtype}) 
        })
    } catch(error) {
        console.log(error)
    }
}

//Get Communication Data
exports.getCommtype = (req, res) => {
    try{
        return res.json(req.commType)
    } catch(error) {
        console.log(error)
    }
}

//Get All Communication Data
exports.getAllCommType = (req, res) => {
    try{
        Commtype.find().exec((err, commType) => {
            if(err) {
                return res.status(400).json({
                    error: "No Communication Type found"
                })
            }
            res.json(commType)
        })
    } catch(error) {
        console.log(error)
    }
}

//Update Communication Type Data
exports.updateCommtype = async(req, res) => {
    try{
        let commtype = await Commtype.findOne({ _id: mongoose.Types.ObjectId(req.body.commTypeId) })
        if(!commtype){
            return res.send("something went wrong")
        } else {
            let editCommtype = await Commtype.updateMany({ _id: req.body.commTypeId },{
                commTypeName: req.body.commTypeName,
                status: req.body.status
            })
            if(editCommtype.nModified > 0){
                let commtype = await Commtype.findOne({ _id: mongoose.Types.ObjectId(req.body.commTypeId) })
                return res.send("Commtype data updated successfully")
            }
        }
    }catch(error){
        console.log(error)
    }
}

//Delete Communication Type Data
exports.deleteCommtype = (req, res) => {
    try{
        let commtype = req.commtype
        Commtype.deleteOne(commtype, (err, commtype) => {
            if(err){
                return res.status(400).json({
                    error: "No Communication Type found"
                })
            }
            return res.send("Communication Type details deleted successfully")
        })
    }catch(error){
        console.log(error)
    }
}