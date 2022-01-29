const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema
const Lead = require("./leads")
const Leadsource = require("./leadsources")
const Leadcontact = require("./leadcontacts")
const User = require("./user")
const Commtype = require("./commTypes")

const leadcommunicationSchema = new mongoose.Schema({
    leadId: {
        type: ObjectId,
        ref: Lead,
        required: false
    },
    leadContactId: {
        type: ObjectId,
        ref: Leadcontact,
        required: false
    },
	userId: {
        type: ObjectId,
        ref: User,
        required: false
    },
    commType: {
        type: ObjectId,
        ref: Commtype,
        required: false
    },
    commSource: {
        type: ObjectId,
        ref: Leadsource,
        required: false
    },
    date: {
        type: Date,
        trim: true,
        required: false
    },
    nextDate: {
        type: Date,
        trim: true,
        required: false
    },
    message: {
        type: String,
        required: false,
    },
	status:{
        type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
    },
},{timestamps: true})

module.exports = mongoose.model("Leadcommunication", leadcommunicationSchema)