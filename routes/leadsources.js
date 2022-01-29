const express = require('express')
const router = express.Router()

const { createLeadsource, getLeadsourceById, getAllLeadsource, getLeadsource, updateLeadsource, deleteLeadsource } = require("../controllers/leadsources")

//Get Parameter of Leadsource
router.param("leadsourceId", getLeadsourceById)

//Create LeadSource Route
router.post("/create/leadsources", createLeadsource)

//Read Leadsource Route
router.get("/get/leadsources/:leadsourceId", getLeadsource)
router.get("/leadsources", getAllLeadsource)

//Update Leadsource Route
router.put("/edit/leadsources/:leadsourceId", updateLeadsource)

//Delete Leadsource Route
router.delete("/delete/leadsources/:leadsourceId", deleteLeadsource)

module.exports = router