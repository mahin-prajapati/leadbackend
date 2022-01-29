const express = require('express')
const router = express.Router()

const { createLead, getLeadById, getLead, getAllLead, updateLead, deleteLead, readLeadDataInExcel } = require("../controllers/leads")

//Get Parameter of Lead
router.param("leadId", getLeadById)

//Create Lead Route
router.post("/create/leads", createLead)

//Read Lead Route
router.get("/get/leads/:leadId", getLead)
router.get("/leads", getAllLead)

//Update Lead Route
router.put("/edit/leads/:leadId", updateLead)

//Delete Lead Route
router.delete("/delete/leads/:leadId", deleteLead)

//Import Lead Data in Excel Sheet Route
router.get("/readLeads", readLeadDataInExcel)

module.exports = router