const mongoose = require("mongoose")

const commtypeSchema = new mongoose.Schema({
	commTypeName:{
		type: Array
	},
	status:{
		type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
	}
},{timestamps: true})

module.exports = mongoose.model("Commtype", commtypeSchema)