const Preference = require("../models/preferences")
const mongoose = require("mongoose")

// Get Id of Employee count in controller
exports.getPreferenceById = (req, res, next, id) => {
    try{
        Preference.findById(id).exec((err, preference) => {
            if(err) {
                return res.status(400).json({
                    error: "Preference not found"
                })
            }
            req.preference = preference
            next()
        })
    } catch(error){
        console.log(error)
    }
}

//Store Employeecount data in DB
exports.createPreference = (req, res) => {
    try{
        const preference = new Preference(req.body)
        preference.save((err, preferences) => {
            if(err){
                return res.status(400).json({
                    error: "Preference not able to save."
                })
            }
            return res.json({preferences}) 
        })
    } catch(error) {
        console.log(error)
    }
}

//Get Employeecount Data
exports.getPreference = (req, res) => {
    try{
        return res.json(req.preference)
    } catch(error) {
        console.log(error)
    }
}

//Get All Employee count Data
exports.getAllPreference = (req, res) => {
    try{
        Preference.find().exec((err, preference) => {
            if(err) {
                return res.status(400).json({
                    error: "No preference found"
                })
            }
            return res.json(preference)
        })
    } catch(error) {
        console.log(error)
    }
}

//Update Employee count Data
exports.updatePreference = async(req, res) => {
    try{
        let preference = await Preference.findOne({ _id: mongoose.Types.ObjectId(req.body.preferenceId) })
        if(!preference) {
            return res.send("Something Went wrong")
        } else {
            let editPreference = await Preference.updateMany({ _id: req.body.preferenceId }, {
                preferenceName: req.body.preferenceName,
                status: req.body.status
            })
            if(editPreference.nModified > 0) {
                let preference = await Preference.findOne({ _id: mongoose.Types.ObjectId(req.body.preferenceId)});
                return res.send('Preference details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Preference Data
exports.deletePreference = (req, res) => {
    try{
        let preference = req.preference
        Preference.deleteOne(preference, (err, preference) => {
            if(err){
                return res.status(400).json({
                    error: "No Lead Status found"
                })
            }
            return res.send("Preference Detail Deleted Successfully")
        })
    }catch(error){
        console.log(error)
    }
}