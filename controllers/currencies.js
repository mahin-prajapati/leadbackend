const Currency = require("../models/currencies")
const mongoose = require("mongoose")

// Get Id of Currency in controller
exports.getCurrencyById = (req, res, next, id) => {
    try{
        Currency.findById(id).exec((err, currency) => {
            if(err) {
                return res.status(400).json({
                    error: "Currency not found"
                })
            }
            req.currency = currency
            next()
        })
    }catch(error){
        console.log(error)
    }
}

//Store Currency data in DB
exports.createCurrency = (req, res) => {
    try{
        const currency = new Currency(req.body)
        currency.save((err, currency) => {
            if(err){
                return res.status(400).json({
                    error: "Currency not found in DB"
                })
            }
            res.json({currency})    
        })
    }catch(error){
        console.log(error)
    }
}

//Get Currency Data
exports.getCurrency = (req, res) => {
    try{
        return res.json(req.currency)
    } catch(error){
        console.log(error)
    }
}

//Get All Currency Data
exports.getAllCurrency = (req, res) => {
    try{
        Currency.find().exec((err, currencies) => {
            if(err) {
                return res.status(400).json({
                    error: "No currencies found"
                })
            }
            res.json(currencies)
        })
    }catch(error){
        console.log(error)
    }
}

//Update Currency Data
exports.updateCurrency = async(req, res) => {
    try{
        let currency = await Currency.findOne({ _id: mongoose.Types.ObjectId(req.body.currencyId) })
        if(!currency) {
            return res.send("Something Went wrong")
        } else {
            let editCurrency = await Currency.updateMany({ _id: req.body.currencyId }, {
                currencyName: req.body.currencyName,
                country: req.body.country,
                status: req.body.status
            })
            if(editCurrency.nModified > 0) {
                let currency = await Currency.findOne({ _id: mongoose.Types.ObjectId(req.body.currencyId)});
                return res.send('Currency details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Currency Data
exports.deleteCurrency = (req, res) => {
    try{
        let currency = req.currency
        Currency.deleteOne(currency, (err, currency) => {
            if(err) {
                return res.status(400).json({
                    error: "No currency found"
                })
            }
            res.send('Currency details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}