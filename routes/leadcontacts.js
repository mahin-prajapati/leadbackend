const express = require('express')
const router = express.Router()

const { 
	createLeadcontacts, 
	getLeadcontactById, 
	getLeadcontact, 
	getAllLeadcontact, 
	updateLeadcontact, 
	deleteLeadcontact 
	} = require('../controllers/leadcontacts')

//Get Parameter of Leadcontact
router.param("leadcontactId", getLeadcontactById)

//Create Leadcontact Route
router.post("/create/leadcontacts", createLeadcontacts)

//Read Leadcontact Route
router.get("/get/leadcontacts/:leadcontactId", getLeadcontact)
router.get("/leadcontacts", getAllLeadcontact)

//Update Leadcontact Route
router.put("/edit/leadcontacts/:leadcontactId", updateLeadcontact)

//Delete Leadcontact Route
router.delete("/delete/leadcontacts/:leadcontactId", deleteLeadcontact)

module.exports = router