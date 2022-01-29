const mongoose = require("mongoose")

const preferenceSchema = new mongoose.Schema({
	preferenceName:{
		type: Array
    },
    status:{
        type: String,
        default: "Active",
        enum: ["Active", "Inactive", "Deleted"]
    }
},{timestamps: true})

module.exports = mongoose.model("Preference", preferenceSchema)