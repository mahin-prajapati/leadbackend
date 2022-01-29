const Employeecount = require("../models/employeeCount")
const mongoose = require("mongoose")

// Get Id of Employee count in controller
exports.getEmployeecountById = (req, res, next, id) => {
    try{
        Employeecount.findById(id).exec((err, employeeCount) => {
            if(err) {
                return res.status(400).json({
                    error: "employeeCount not found"
                })
            }
            req.employeeCount = employeeCount
            next()
        })
    } catch(error){
        console.log(error)
    }
}

//Store Employeecount data in DB
exports.createEmployeecount = (req, res) => {
    try{
        const employeeCount = new Employeecount(req.body)
        employeeCount.save((err, employee) => {
            if(err){
                return res.status(400).json({
                    error: "Employeecount not able to save."
                })
            }
            res.json({employee}) 
        })
    } catch(error) {
        console.log(error)
    }
}

//Get Employeecount Data
exports.getEmployeecount = (req, res) => {
    try{
        return res.json(req.employeeCount)
    } catch(error) {
        console.log(error)
    }
}

//Get All Employee count Data
exports.getAllEmployeecount = (req, res) => {
    try{
        Employeecount.find().exec((err, employeeCount) => {
            if(err) {
                return res.status(400).json({
                    error: "No employeeCount found"
                })
            }
            res.json(employeeCount)
        })
    } catch(error) {
        console.log(error)
    }
}

//Update Employee count Data
exports.updateEmployeecount = async(req, res) => {
    try{
        let employee = await Employeecount.findOne({ _id: mongoose.Types.ObjectId(req.body.employeeCountId) })
        if(!employee) {
            return res.send("Something Went wrong")
        } else {
            let editEmployeecount = await Employeecount.updateMany({ _id: req.body.employeeCountId }, {
                employeeCount: req.body.employeeCount,
                status: req.body.status
            })
            if(editEmployeecount.nModified > 0) {
                let company = await Employeecount.findOne({ _id: mongoose.Types.ObjectId(req.body.employeeCountId)});
                return res.send('Employeecount details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Employee Count Data
exports.deleteEmployeecount = (req, res) => {
    try{
        let employee = req.employeeCount
        Employeecount.deleteOne(employee, (err, employeeCount) => {
            if(err){
                return res.status(400).json({
                    error: "No Employee Count found"
                })
            }
            return res.send("Employee Count Details Deleted Successfully")
        })
    }catch(error){
        console.log(error)
    }
}