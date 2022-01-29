const Country = require("../models/countries")
const mongoose = require("mongoose")

// Get Id of Country in controller
exports.getCountryById = (req, res, next, id) => {
    try {
        Country.findById(id).exec((err, country) => {
            if(err) {
                return res.status(400).json({
                    error: "Country not found"
                })
            }
            req.country = country
            next()
        })
    }catch(error) {
        console.log(error)
    }
}

//Store Country data in DB
exports.createCountry = (req, res) => {
    try{
        const country = new Country(req.body)
        country.save((err, country) => {
            if(err){
                return res.status(400).json({
                    error: "Country not found in DB"
                })
            }
            res.json({country}) 
        })
    }catch(error){
        console.log(error)
    }
}

//Get Country Data
exports.getCountry = (req, res) => {
    try{
        return res.json(req.country)
    }catch(error){
        console.log(error)
    }
}

//Get All Country Data
exports.getAllCountry = (req, res) => {
    try{
        Country.find().exec((err, countries) => {
            if(err) {
                return res.status(400).json({
                    error: "No countries found"
                })
            }
            res.json(countries)
        })
    }catch(error){
        console.log(error)
    }
}

//Update Country Data
exports.updateCountry = async(req, res) => {
    try{
        let country = await Country.findOne({ _id: mongoose.Types.ObjectId(req.body.countryId) })
        if(!country) {
            return res.send("Something Went wrong")
        } else {
            let editCountry = await Country.updateMany({ _id: req.body.countryId }, {
                countryName: req.body.countryName,
                status: req.body.status
            })
            if(editCountry.nModified > 0) {
                let country = await Country.findOne({ _id: mongoose.Types.ObjectId(req.body.countryId)});
                return res.send('Country details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Country Data
exports.deleteCountry = (req, res) => {
    try{
        let country = req.country
        Country.deleteOne(country, (err, country) => {
            if(err) {
                return res.status(400).json({
                    error: "No country found"
                })
            }
            res.send('Country details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}