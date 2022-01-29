const express = require('express')
const router = express.Router()

const { createCommtype, getCommtype, getCommtypeById, getAllCommType, updateCommtype, deleteCommtype } = require("../controllers/commTypes")

//Get Parameter of Communication Type
router.param("commTypeId", getCommtypeById)

//Create Communication Type Route
router.post("/create/commtypes", createCommtype)

//Read Communication Type Route
router.get("/get/commtypes/:commTypeId", getCommtype)
router.get("/commtypes", getAllCommType)

//Update Communication Type Route
router.put("/edit/commtypes/:commTypeId", updateCommtype)

//Delete Communication Type Route
router.delete("/delete/commtypes/:commTypeId", deleteCommtype)

module.exports = router