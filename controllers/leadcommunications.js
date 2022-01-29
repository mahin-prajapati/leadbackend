const Leadcommunication = require("../models/leadcommunications")
const mongoose = require("mongoose")
const leadcommunications = require("../models/leadcommunications")

// Get Id of Lead Communication in controller
exports.getLeadcommunicationById = (req, res, next, id) => {
    try{
        Leadcommunication.findById(id).exec((err, leadComm) => {
            if(err) {
                return res.status(400).json({
                    error: "Leadcommunication not found"
                })
            }
            req.leadComm = leadComm
            next()
        })
    } catch(error){
        console.log(error)
    }
}

//Store Lead Communication data in DB
exports.createLeadcommunication = (req, res) => {
    try{
        const leadcommunication = new Leadcommunication(req.body)
        console.log(leadcommunication)
        leadcommunication.save((err, leadcommunication) => {
            if(err){
                return res.status(400).json({
                    error: "Leadcommunication not able to save"
                })
            }
            return res.json({leadcommunication}) 
        })
    } catch(error) {
        console.log(error)
    }
}

//Get Lead Communication Data
exports.getLeadcommunication = (req, res) => {
    try{
        return res.json(req.leadComm)
    } catch(error) {
        console.log(error)
    }
}

//Get All Lead Communication Data
exports.getAllLeadcommunication = (req, res) => {
    try{
        Leadcommunication.find().exec((err, leadComm) => {
            if(err) {
                return res.status(400).json({
                    error: "No Lead Communication Type found"
                })
            }
            res.json(leadComm)
        })
    } catch(error) {
        console.log(error)
    }
}

//Update Lead Communication Data
exports.updateLeadcommunication = async(req, res) => {
    try{
        let leadcommunication = await Leadcommunication.findOne({ _id: mongoose.Types.ObjectId(req.body.leadCommunicationId) })
        if(!leadcommunication){
            return res.send("Something went wrong")
        } else{
            let editLeadcommunication = await Leadcommunication.updateMany({ _id: req.body.leadCommunicationId }, {
                leadId: req.body.leadId,
                leadContactId: req.body.leadContactId,
                userId: req.body.userId,
                commType: req.body.commType,
                commSource: req.body.commSource,
                date: req.body.date,
                nextDate: req.body.nextDate,
                message: req.body.message,
                status: req.body.status
            })
            if(editLeadcommunication.nModified > 0) {
                let leadcommunication = await Leadcommunication.findOne({ _id: mongoose.Types.ObjectId(req.body.leadCommunicationId) })
                return res.send("Lead Communication updated successfully")
            }
        }
    }catch(error){
        console.log(error)
    }
}

//Delete Lead Communication Data
exports.deleteLeadcommunication = (req, res) => {
    try{
        let leadcommunication = req.leadComm
        Leadcommunication.deleteOne(leadcommunication, (err, leadcomm) => {
            if(err) {
                return res.status(400).json({
                    error: "No Lead Communication found"
                })
            }
            return res.send("Lead Communication Detail Deleted Successfully")
        })
    }catch(error){
        console.log(error)
    }
}