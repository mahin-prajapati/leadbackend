const express = require('express')
const router = express.Router()

const { createCurrency, getCurrencyById, getCurrency, getAllCurrency, updateCurrency, deleteCurrency } = require("../controllers/currencies")

//Get Parameter of Currency
router.param("currencyId", getCurrencyById)

//Create Currency Route
router.post("/create/currencies", createCurrency)

//Read Currency Route
router.get("/get/currencies/:currencyId", getCurrency)
router.get("/currencies", getAllCurrency)

//Update Currency Route
router.put("/edit/currencies/:currencyId", updateCurrency)

//Delete Currency Route
router.delete("/delete/currencies/:currencyId", deleteCurrency)

module.exports = router