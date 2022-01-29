const mongoose = require("mongoose")
const Lead = require("./leads")
const Preference = require("./preferences")
const { ObjectId } = mongoose.Schema

const leadcontactSchema = new mongoose.Schema({
	leadId: {
		type: ObjectId,
		ref: Lead,
		required: true
	},
	firstName:{
		type: String,
		trim: true,
		required: false
	},
	lastName: {
		type: String,
		trim: true,
		required: false
	},
	email: {
		type: String,
		trim: true,
		required: false
	},
	contactNumber:{
		type: Number,
		trim: false,
		required: false
	},
	skypeId:{
		type: String,
		trim: true,
		required: false
	},
	linkedin:{
		type: String,
		trim: true,
		required: false
	},
	xing: {
		type: String,
		trim: true,
		required: false
	},
	otherContacts:{
		type: Number,
		trim: false,
		required: false
	},
	birthDate: {
		type: Date,
		trim: true,
		required: false
	},
	anniversaryDate:{
		type: Date,
		trim: true,
		required: false
	},
	preferences:{
		type: ObjectId,
		ref: Preference
	},
	status: {
		type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
	},
},{timestamps: true})

module.exports = mongoose.model("Leadcontact", leadcontactSchema)