const express = require('express')
const router = express.Router()

const {createCountry, getCountry, getAllCountry, getCountryById, updateCountry, deleteCountry} = require('../controllers/countries')

//Get Parameter of Country
router.param("countryId", getCountryById)

//Create Country Route
router.post("/create/countries", createCountry)

//Read Country Route
router.get("/get/countries/:countryId", getCountry)
router.get("/countries", getAllCountry)

//Update Country Route
router.put("/edit/countries/:countryId", updateCountry)

//Delete Country Route
router.delete("/delete/countries/:countryId", deleteCountry)

module.exports = router