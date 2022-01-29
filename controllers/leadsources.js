const Leadsource = require("../models/leadsources")
const mongoose = require("mongoose")

// Get Id of leadSource in controller
exports.getLeadsourceById = (req, res, next, id) => {
    try{
        Leadsource.findById(id).exec((err, leadsource) => {
            if(err) {
                return res.status(400).json({
                    error: "Product not found"
                })
            }
            req.leadsource = leadsource
            next()
        })
    } catch(error) {
        console.log(error)
    }
}

//Store Leadsource data in DB
exports.createLeadsource = (req, res) => {
    try {
        const leadsource = new Leadsource(req.body)
        leadsource.save((err, leadsource) => {
            if(err){
                return res.status(400).json({
                    error: "Leadsource not found in DB"
                })
            }
            res.json({leadsource})  
        })
    } catch(error) {
        console.log(error)
    }
}

//Get LeadSource data
exports.getLeadsource = (req, res) => {
    try {
        return res.json(req.leadsource)
    } catch(error) {
        console.log(error)
    }
}

//Get All LeadSource data
exports.getAllLeadsource = (req, res) => {
    try {
        Leadsource.find().exec((err, leadsources) => {
            if(err) {
                return res.status(400).json({
                    error: "No leadsources found"
                })
            }
            res.json(leadsources)
        })
    } catch(error) {
        console.log(error)
    }
}

//Update LeadSource Data
exports.updateLeadsource = async(req, res) => {
    try {
        let leadSource = await Leadsource.findOne({ _id: mongoose.Types.ObjectId(req.body.sourceId) })
        console.log(leadSource)
        if(!leadSource) {
            return res.send("Something Went wrong")
        } else {
            let updateLeadsource = await Leadsource.updateMany({ _id: req.body.sourceId }, {
                sourceName: req.body.sourceName,
                accountLink: req.body.accountLink,
                status: req.body.status
            })
            console.log(updateLeadsource)
            if(updateLeadsource.nModified > 0) {
                let leadSource = await Leadsource.findOne({ _id: mongoose.Types.ObjectId(req.body.sourceId)});
                return res.send('LeadSource details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Leadsource Data
exports.deleteLeadsource = (req, res) => {
    try{
        let leadsource = req.leadsource
        Leadsource.deleteOne(leadsource, (err, leadsource) => {
            if(err) {
                return res.status(400).json({
                    error: "No leadsource found"
                })
            }
            res.send('Leadsource details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}