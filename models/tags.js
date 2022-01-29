const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
	tagName:{
		type: Array
	},
	status:{
		type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
	}
},{timestamps: true})

module.exports = mongoose.model("Tag", tagSchema)