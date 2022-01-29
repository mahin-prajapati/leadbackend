const mongoose = require("mongoose")

const leadsourceSchema = new mongoose.Schema({
	sourceName:{
		type: String,
		trim: true,
		required: true
	},
	accountLink:{
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

module.exports = mongoose.model("Leadsource", leadsourceSchema)