const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
	countryName:{
		type: String,
		required: true,
		trim: true
	},
	status:{
		type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
	}
},{timestamps: true})

module.exports = mongoose.model("Country", countrySchema)