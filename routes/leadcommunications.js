const express = require('express')
const router = express.Router()

const { 
    createLeadcommunication, 
    getLeadcommunicationById, 
    getLeadcommunication, 
    getAllLeadcommunication, 
    updateLeadcommunication, 
    deleteLeadcommunication 
} = require("../controllers/leadcommunications")

//Get Parameter of Lead Communication
router.param("leadCommId", getLeadcommunicationById)

//Create Lead Communication Route
router.post("/create/leadcomm", createLeadcommunication)

//Read Lead Communication Route
router.get("/get/leadcomm/:leadCommId", getLeadcommunication)
router.get("/leadcomm", getAllLeadcommunication)

//Update Lead Communication Route
router.put("/edit/leadcomm/:leadCommId", updateLeadcommunication)

//Delete Lead Communication Route
router.delete("/delete/leadcomm/:leadCommId", deleteLeadcommunication)

module.exports = router