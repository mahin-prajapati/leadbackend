const express = require('express')
const router = express.Router()

const {createLeadstatus, getLeadstatus, getLeadstatusById, getAllLeadstatus, updateLeadstatus, deleteLeadstatus} = require('../controllers/leadstatus')

//Get Parameter of Leadstatus
router.param("leadstatusId", getLeadstatusById)

//Create Leadstatus Route
router.post("/create/leadstatus", createLeadstatus)

//Read Leadstatus Route
router.get("/get/leadstatus/:leadstatusId", getLeadstatus)
router.get("/leadstatus", getAllLeadstatus)

//Update Leadstatus Route
router.put("/edit/leadstatus/:leadstatusId", updateLeadstatus)

//Delete Leadstatus Route
router.delete("/delete/leadstatus/:leadStatusId", deleteLeadstatus)

module.exports = router