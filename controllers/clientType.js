const Clienttype = require("../models/clientType")
const mongoose = require("mongoose")

// Get Id of Client Type in controller
exports.getClienttypeById = (req, res, next, id) => {
    try{
        Clienttype.findById(id).exec((err, clientType) => {
            if(err) {
                return res.status(400).json({
                    error: "ClientType not found"
                })
            }
            req.clientType = clientType
            next()
        })
    } catch(error){
        console.log(error)
    }
}

//Create Client Type data in DB
exports.createClienttype = (req, res) => {
    try{
        const clientType = new Clienttype(req.body)
        clientType.save((err, client) => {
            if(err){
                return res.status(400).json({
                    error: "Clienttype not able to save."
                })
            }
            res.json({client}) 
        })
    } catch(error) {
        console.log(error)
    }
}

//Get Client Type Data
exports.getClienttype = (req, res) => {
    try{
        return res.json(req.clientType)
    } catch(error) {
        console.log(error)
    }
}

//Get All Client Type Data
exports.getAllClienttype = (req, res) => {
    try{
        Clienttype.find().exec((err, clientType) => {
            if(err) {
                return res.status(400).json({
                    error: "No clientType found"
                })
            }
            res.json(clientType)
        })
    } catch(error) {
        console.log(error)
    }
}

//Update Client Type Data
exports.updateClienttype = async(req, res) => {
    try{
        let client = await Clienttype.findOne({ _id: mongoose.Types.ObjectId(req.body.clientTypeId) })
        if(!client) {
            return res.send("Something Went wrong")
        } else {
            let editClienttype = await Clienttype.updateMany({ _id: req.body.clientTypeId }, {
                typeName: req.body.typeName,
                status: req.body.status
            })
            if(editClienttype.nModified > 0) {
                let client = await Clienttype.findOne({ _id: mongoose.Types.ObjectId(req.body.clientTypeId)});
                return res.send('Clienttype details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Client Type Data
exports.deleteClienttype = (req, res) => {
    try{
        let clienttype = req.clienttype
        Clienttype.deleteOne(clienttype, (err, clienttype) => {
            if(err) {
                return res.status(400).json({
                    error: "No Client Type found"
                })
            }
            res.send('Client Type details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}