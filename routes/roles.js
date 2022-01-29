const express = require('express')
const router = express.Router()

const { createRole, getRoleById, getRole, getAllRole, updateRole, deleteRole } = require("../controllers/roles")

//Get Parameter of route
router.param("roleId", getRoleById)

//Create Role Route
router.post("/create/role", createRole)

//Read Role Route
router.get("/get/role/:roleId", getRole)
router.get("/role", getAllRole)

//Update Role Route
router.put("/edit/role/:roleId", updateRole)

//Delete Role Route
router.delete("/delete/role/:roleId", deleteRole)

module.exports = router