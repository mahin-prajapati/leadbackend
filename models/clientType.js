const mongoose = require("mongoose")

const clientTypeSchema = new mongoose.Schema({
	typeName:{
		type: String,
		required: false
    },
    status:{
        type: String,
        default: "Active",
        enum: ["Active", "Inactive", "Deleted"]
    }
},{timestamps: true})

module.exports = mongoose.model("Clienttype", clientTypeSchema)

