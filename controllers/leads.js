const Lead = require("../models/leads")
const Leadcontact = require("../models/leadcontacts")
const mongoose = require("mongoose")
const XLSX = require("xlsx")
const Clienttype = require("../models/clientType")
const { split } = require("lodash")
const Country = require("../models/countries")
const Leadsource = require("../models/leadsources")
const Employeecount = require("../models/employeeCount")

// Get Id of lead in controller
exports.getLeadById = (req, res, next, id) => {
    try {
        Lead.findById(id).exec((err, lead) => {
            if(err) {
                return res.status(400).json({
                    error: "Lead data not found"
                })
            }
            req.lead = lead
            next()
        })

    } catch(error) {
        console.log(error)
    }
}

//Store Lead Data in Lead Collection
exports.createLead = (req, res) => {
    try {
        const lead = new Lead(req.body)
        lead.save((err, lead) => {
            if(err){
                return res.status(400).json({
                    error: "Lead not able to save."
                })
            }
            //Store Leadcontact in Lead Collection
            if(req.body.leadContact){
                const leadcontact = req.body.leadContact
                leadcontact.leadId = lead._id
                const leadContactModal = new Leadcontact(leadcontact)
                leadContactModal.save((err, leadcontact) => {
                    if(err){
                        return res.status(400).json({
                            error: "Leadcontact not able to save."
                        })
                    }
                    lead.leadContact = leadcontact
                    return res.json({lead})
                })
            }else{
                return res.json({lead})
            }    
        })    
    } catch(error) {
        console.log(error)
    }
}

//get Lead data
exports.getLead = (req, res) => {
    try {
        return res.json(req.lead)
    } catch(error){
        console.log(error)
    }
}

//get All Lead Data
exports.getAllLead = (req, res) => {
    try {
        Lead.find().populate("leadSourceId countryId industryId currencyId userId preferenceId clientTypeId employeeCountId leadStatus").exec((err, leads) => {
            if(err) {
                return res.status(400).json({
                    error: "No leads found"
                })
            }
            return res.json(leads)
        })
    } catch(error){
        console.log(error)
    }
}


//Update Lead Data
exports.updateLead = async(req, res) => {
    try {
        let lead = await Lead.findOne({ _id: mongoose.Types.ObjectId(req.body.leadId) })
        if(!lead) {
            return res.send("Something Went wrong")
        } else {
            let editLead = await Lead.updateMany({ _id: req.body.leadId }, {
                leadSourceId: req.body.leadSourceId,
                userId: req.body.userId,
                companyName: req.body.companyName,
                companyWebsite: req.body.companyWebsite,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                countryId: req.body.countryId,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                employeeCount: req.body.employeeCount,
                followupCount: req.body.followupCount,
                industryId: req.body.industryId,
                preferences: req.body.preferences,
                clientType: req.body.clientType,
                tag: req.body.tag,
                rate: req.body.rate,
                currencyId: req.body.currencyId,
                leadStatus: req.body.leadStatus,
                designation: req.body.designation,
                status: req.body.status
            })
            if(editLead.nModified > 0) {
                let lead = await Lead.findOne({ _id: mongoose.Types.ObjectId(req.body.leadId)});
                return res.send('Lead details updated successfully');
            }
        }
    } catch(error) {
        console.log(error)
    }
}

//Delete Lead Data
exports.deleteLead = (req, res) => {
    try{
        let lead = req.lead
        Lead.deleteOne(lead, (err, lead) => {
            if(err) {
                return res.status(400).json({
                    error: "No leads found"
                })
            }
            return res.send('Lead details deleted successfully')
        })
    } catch(error) {
        console.log(error)
    }
}

//Import Lead and Lead Contact data in Database through excel sheet
exports.readLeadDataInExcel = async(req, res) => {
    try{
        let workbook = XLSX.readFile('import-sheet.xlsx');
        let sheet_name_list = workbook.SheetNames;
        let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        if(!xlData){
            return res.send("Something Went wrong")
        } else {
            xlData.forEach(async(item) => {
                let name = item.ContactPerson
                let array = name.split(" ")
                item.firstName = array[0] ? array[0] : null
                item.lastName = array[1] ? array[1] : null
                let countryData = await Country.findOne({countryName: item.countryId})
                item.countryId = countryData._id
                let sourceData = await Leadsource.findOne({sourceName: item.leadSourceId})
                item.leadSourceId = sourceData._id
                let clientTypeData = await Clienttype.findOne({typeName: item.clientType})
                item.clientType = clientTypeData._id
                let employeeCountData = await Employeecount.findOne({employeeCount: item.employeeCount})
                item.employeeCount = employeeCountData._id 
                const lead = new Lead(item)
                lead.save((err, leadData) => {
                    if(err) throw err
                    item.leadId = leadData._id
                    const leadContactData = new Leadcontact(item)
                    leadContactData.save((err) => {
                        if(err) throw err
                    })
                })
            })
        }
    } catch(error){
        console.log(error)
    }
}