var mongoose = require("mongoose")
const crypto = require('crypto');
const { v1: uuidv1} = require('uuid');
const { ObjectId } = mongoose.Schema
const Company = require("./companies")
const Role = require("./roles")

var userSchema = new mongoose.Schema({
	companyId:{
		type: ObjectId,
		ref: Company,
		required: true
	},
	roleId:{
		type: ObjectId,
		ref: Role,
		required: true
	},
	firstName: {
		type: String,
		required: true,
		trim:true
	},
	lastName: {
		type: String,
		required: true,
		trim:true
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	encry_password: {
		type: String,
		trim: true
	},
	mobile:{
		type: String,
		trim: true,
		required: true
	},
	contactNum:{
		type: String,
		required: true,
		trim: true
	},
	avtar:{
		data: Buffer,
        contentType: String
	},
	status:{
		type: String,
        default: "Active",
        enum: ["Active","Inactive","Deleted"]
	},
	salt: String
},{timestamps: true})


userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password
    },
    securePassword: function(plainPassword) {
        if(!plainPassword) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex')
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);

