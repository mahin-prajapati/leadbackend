const Industry = require("../models/industries")
const mongoose = require("mongoose")

// Get Id of Industry in controller
exports.getIndutsryById = (req, res, next, id) => {
    try {
        Industry.findById(id).exec((err, industry) => {
            if(err) {
                return res.status(400).json({
                    error: "Industry not found"
                })
            }
            req.industry = industry
            next()
        })
    } catch(error) {
        console.log(error)
    }
}

//Store Industry data in DB
exports.createIndustry = (req, res) => {
    try {
        const industry = new Industry(req.body)
        industry.save((err, industry) => {
            if(err){
                return res.status(400).json({
                    error: "Industry not found in DB"
                })
            }
            res.json({industry})    
        })
    } catch(error) {
        console.log(error)
    }
}

//Get Industry data
exports.getIndutsry = (req, res) => {
    try{
	   return res.json(req.industry) 
    } catch(error) {
        console.log(error)
    }
}

//Get All Industry Data
exports.getAllIndustry = (req, res) => {
    try{
        Industry.find().exec((err, industries) => {
            if(err) {
                return res.status(400).json({
                    error: "No industries found"
                })
            }
            res.json(industries)
        })
    } catch(error){
        console.log(error)
    }
}

//Update Industry Data
exports.updateIndustry = async(req, res) => {
    try{
        let industry = await Industry.findOne({ _id: mongoose.Types.ObjectId(req.body.industryId) })
        if(!industry) {
            return res.send("Something Went wrong")
        } else {
            let editIndustry = await Industry.updateMany({ _id: req.body.industryId }, {
                industryName: req.body.industryName,
                status: req.body.status
            })
            if(editIndustry.nModified > 0) {
                let industry = await Industry.findOne({ _id: mongoose.Types.ObjectId(req.body.industryId)});
                return res.send('Industry details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Industry Data
exports.deleteIndustry = (req, res) => {
    try{
        let industry = req.industry
        Industry.deleteOne(industry, (err, industry) => {
            if(err) {
                return res.status(400).json({
                    error: "No industry found"
                })
            }
            res.send('Industry details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}