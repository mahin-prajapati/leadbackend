const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
	product_name: {
		type: String,
		trim: true,
	},
	price: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	image: {
		type: String,
		default: null
	}
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)

