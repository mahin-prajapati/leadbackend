const mongoose = require("mongoose")
const Country = require("./countries")
const { ObjectId } = mongoose.Schema

const currencySchema = new mongoose.Schema({
	currencyName:{
		type: String,
		trim: true,
		required: true
	},
	country:{
		type: ObjectId,
		ref: Country,
		required: true,
	},
	status:{
        type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
    },
},{timestamps: true})

module.exports = mongoose.model("Currency", currencySchema)