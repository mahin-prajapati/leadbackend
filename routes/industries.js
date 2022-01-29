const express = require('express')
const router = express.Router()

const { createIndustry, getIndutsryById, getIndutsry, getAllIndustry, updateIndustry, deleteIndustry } = require("../controllers/industries")

//Get Parameter of Industry
router.param("industryId", getIndutsryById)

//Create Industry Route
router.post("/create/industries", createIndustry)

//Read Industry Route
router.get("/get/industries/:industryId", getIndutsry)
router.get("/industries", getAllIndustry)

//Update Industry Route
router.put("/edit/industries/:industryId", updateIndustry)

//Delete Industry Route
router.delete("/delete/industries/:industryId", deleteIndustry)

module.exports = router