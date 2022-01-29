const express = require('express')
const router = express.Router()

const { createClienttype, getClienttypeById, getClienttype, getAllClienttype, updateClienttype, deleteClienttype } = require("../controllers/clientType")

//Get Parameter of Client Type
router.param("clientTypeId", getClienttypeById)

//Create Client Type Route
router.post("/create/clientType", createClienttype)

//Read Client Type Route
router.get("/get/clientType/:clientTypeId", getClienttype)
router.get("/clientType", getAllClienttype)

//Update Client Type Route
router.put("/edit/clientType/:clientTypeId", updateClienttype)

//Delete Client Type Route
router.delete("/delete/clientType/:clientTypeId", deleteClienttype)

module.exports = router