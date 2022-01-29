const express = require('express')
const router = express.Router()

const { createEmployeecount, getEmployeecountById, getEmployeecount, getAllEmployeecount, updateEmployeecount, deleteEmployeecount} = require("../controllers/employeeCount")

//Get Parameter of Employeecount
router.param("employeeCountId", getEmployeecountById)

//Create Employeecount Route
router.post("/create/employeeCount", createEmployeecount)

//Read Employeecount Route
router.get("/get/employeeCount/:employeeCountId", getEmployeecount)
router.get("/employeeCount", getAllEmployeecount)

//Update Employeecount Route
router.put("/edit/employeeCount/:employeeCountId", updateEmployeecount)

//Delete Employeecount Route
router.delete("/delete/employeeCount/:employeeCountId", deleteEmployeecount)

module.exports = router