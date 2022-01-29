const Leadstatus = require("../models/leadstatus")

// Get Id of Leadstatus in controller
exports.getLeadstatusById = (req, res, next, id) => {
    try{
        Leadstatus.findById(id).exec((err, leadstatus) => {
            if(err) {
                return res.status(400).json({
                    error: "Leadstatus not found"
                })
            }
            req.leadstatus = leadstatus
            next()
        })
    }catch(error){
        console.log(error)
    }
}

//Store Leadstatus data in DB
exports.createLeadstatus = (req, res) => {
    try{
        const leadstatus = new Leadstatus(req.body)
        leadstatus.save((err, leadstatus) => {
            if(err){
                return res.status(400).json({
                    error: "Leadstatus not found in DB"
                })
            }
            return res.json({leadstatus})  
        })
    }catch(error){
        console.log(error)
    }
}

//Get Leadstatus Data
exports.getLeadstatus = (req, res) => {
    try{
        return res.json(req.leadstatus)
    } catch(error){
        console.log(error)
    }
}

//Get All Leadstatus Data
exports.getAllLeadstatus = (req, res) => {
    try{
        Leadstatus.find().exec((err, leadstatus) => {
            if(err) {
                return res.status(400).json({
                    error: "No leadstatus found"
                })
            }
            return res.json(leadstatus)
        })
    }catch(error){
        console.log(error)
    }
}

//Update Lead status Data
exports.updateLeadstatus = async(req, res) => {
    try{
        let leadstatus = await Leadstatus.findOne({ _id: mongoose.Types.ObjectId(req.body.leadStatusId) })
        if(!leadstatus) {
            return res.send("Something Went wrong")
        } else {
            let editLeadstatus = await Leadstatus.updateMany({ _id: req.body.leadStatusId }, {
                statusName: req.body.statusName,
                statusKey: req.body.statusKey,
                status: req.body.status
            })
            if(editLeadstatus.nModified > 0) {
                let leadstatus = await Leadstatus.findOne({ _id: mongoose.Types.ObjectId(req.body.leadStatusId)});
                return res.send('Leadstatus details updated successfully');
            }
        }
    } catch(error){
        console.log(error)
    }
}

//Delete Lead Status Data
exports.deleteLeadstatus = (req, res) => {
    try{
        let leadstatus = req.leadstatus
        Leadstatus.deleteOne(leadstatus, (err, leadstatus) => {
            if(err){
                return res.status(400).json({
                    error: "No Lead Status found"
                })
            }
            return res.send("Lead Status Detail Deleted Successfully")
        })
    }catch(error){
        console.log(error)
    }
}