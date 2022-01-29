const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema
const leadSource = require("./leadsources")
const Country = require("./countries")
const User = require("./user")
const Currency = require("./currencies")
const Industry = require("./industries")
const Leadstatus = require("./leadstatus")
const Employeecount = require("./employeeCount")
const Clienttype = require("./clientType")
const Preference = require("./preferences")
const Tag = require("./tags")

const leadSchema = new mongoose.Schema({
	leadSourceId:{
		type: ObjectId,
		ref: leadSource,
		required: false
	},
	userId:{
		type: ObjectId,
		ref: User,
		required: false
	},
	leadStatus:{
		type: ObjectId,
		ref: Leadstatus,
        required: false,
	},
	companyName:{
		type: String,
		required: false,
		trim: true
	},
	email:{
		type: String,
		required: false,
		trim: false
	},
	countryId:{
		type: ObjectId,
		ref: Country
	},
	contactNumber:{
		type: Number,
		required: false,
		trim: false
	},
	companyWebsite: {
		type: String,
		required: false
	},
	address:{
		type: String,
		required: false,
		trim: false
	},
	city:{
		type: String,
		required: false,
		trim: true
	},
	state:{
		type: String,
		required: false,
		trim: true
	},
	zipcode:{
		type: String,
		required: false,
		trim: true
	},
	employeeCount:{
		type: ObjectId,
		ref: Employeecount,
		required: false
	},
	followupCount: {
		type: Number,
		required: false
	},
	industryId:{
		type: ObjectId,
		ref: Industry,
		required: false
	},
	preferences:{
		type: ObjectId,
		ref: Preference,
		required: false
	},
	clientType:{
		type: ObjectId,
		ref: Clienttype,
		required: false
	},
	tag: {
		type: ObjectId,
		ref: Tag,
		required: false
	},
	rate:{
		type: Number,
		required: false,
		trim: true
	},
	currencyId:{
		type: ObjectId,
		ref: Currency,
		required: false
	},
	designation:{
		type: String,
		required: false,
		trim: true
	},
	status:{
		type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
	}
},{timestamps: true})

module.exports = mongoose.model("Lead", leadSchema)

