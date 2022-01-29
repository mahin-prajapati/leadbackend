const mongoose = require("mongoose")

const industrySchema = new mongoose.Schema({
	industryName:{
		type: String,
		trim: true,
		required: true
	},
	status:{
        type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
    },
},{timestamps: true})

module.exports = mongoose.model("Industry", industrySchema)