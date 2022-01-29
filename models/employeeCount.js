const mongoose = require("mongoose")

const employeeCountSchema = new mongoose.Schema({
    employeeCount: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "Inactive", "Deleted"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Employeecount", employeeCountSchema)