const mongoose = require("mongoose")
const Permission = require("./permissions")

const { ObjectId } = mongoose.Schema

const roleSchema = new mongoose.Schema({
	roleName:{
		type: String,
		trim: true,
		required: true
	},
	permissions:{
		type: ObjectId,
		ref: Permission,
		required: true
	},
	status:{
        type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
    },
},{timestamps: true})

module.exports = mongoose.model("Role", roleSchema)