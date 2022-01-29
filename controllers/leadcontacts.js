const Leadcontact = require("../models/leadcontacts")
const mongoose = require("mongoose")

// Get Id of Leadcontacts in controller
exports.getLeadcontactById = (req, res, next, id) => {
	try{
		Leadcontact.findById(id).exec((err, leadcontact) => {
	        if(err) {
	            return res.status(400).json({
	                error: "Leadcontact not found"
	            })
	        }
	        req.leadcontact = leadcontact
	        next()
	    })
	}catch(error) {
		console.log(error)
	}
}

// Store Leadcontact data in DB
exports.createLeadcontacts = (req, res) => {
	try{
		const leadcontact = new Leadcontact(req.body)
		leadcontact.save((err, leadcontact) => {
			if(err){
				return res.status(400).json({
					error: "Leadcontact not able to save"
				})
			}
			return res.json({leadcontact})
		})
	} catch(error){
		console.log(error)
	}
}

//Get Leadcontact Data
exports.getLeadcontact = (req, res) => {
	try {
		return res.json(req.leadcontact)
	} catch(error) {
		console.log(error)
	}
}

//Get All Leadcontact Data
exports.getAllLeadcontact = (req, res) => {
	try{
		Leadcontact.find().populate("leadId").exec((err, leadcontact) => {
	        if(err) {
	            return res.status(400).json({
	                error: "No leadcontact found"
	            })
	        }
	        return res.json(leadcontact)
	    })
	} catch(error) {
		console.log(error)
	}
}

//Update Leadcontact Data
exports.updateLeadcontact = async(req, res) => {
    try{
        let leadcontact = await Leadcontact.findOne({ _id: mongoose.Types.ObjectId(req.body.leadContactId) })
        console.log(leadcontact)
        if(!leadcontact) {
            return res.send("Something Went wrong")
        } else {
            let editLeadcontact = await Leadcontact.updateMany({ _id: req.body.leadContactId }, {
                leadId: req.body.leadId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                skypeId: req.body.skypeId,
                linkedin: req.body.linkedin,
                xing: req.body.xing,
                otherContacts: req.body.otherContacts,
                birthDate: req.body.birthDate,
                anniversaryDate: req.body.anniversaryDate,
                preferences: req.body.preferences,
                status: req.body.status,
            })
            if(editLeadcontact.nModified > 0) {
                let leadcontact = await Leadcontact.findOne({ _id: mongoose.Types.ObjectId(req.body.leadContactId)});
                return res.send('Leadcontact details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Leadcontact Data
exports.deleteLeadcontact = (req, res) => {
    try{
        let leadcontact = req.leadcontact
        Leadcontact.deleteOne(leadcontact, (err, leadcontact) => {
            if(err) {
                return res.status(400).json({
                    error: "No leadcontact found"
                })
            }
            return res.send('Leadcontact details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}