const mongoose = require("mongoose")

const permissionSchema = new mongoose.Schema({
	permissionName:{
		type: String,
		trim: true,
		required: true
	},
	moduleName:{
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

module.exports = mongoose.model("Permission", permissionSchema)