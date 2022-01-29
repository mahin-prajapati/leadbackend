const mongoose = require("mongoose")

const leadstatusSchema = new mongoose.Schema({
	statusName:{
		type: String,
		required: true,
		trim: true
	},
	statusKey: {
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

module.exports = mongoose.model("Leadstatus", leadstatusSchema)