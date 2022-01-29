const express = require('express')
const router = express.Router()

const { createPermission, getPermissionById, getPermission, getAllPermission, updatePermission, deletePermission } = require("../controllers/permissions")

//Get Parameter of Route
router.param("permissionId", getPermissionById)

//Create Permission Route
router.post("/create/permissions", createPermission)

//Read Permission Route
router.get("/get/permissions/:permissionId", getPermission)
router.get("/permissions", getAllPermission)

//Update Permission Route
router.put("/edit/permissions/:permissionId", updatePermission)

//Delete Permisssion Route
router.delete("/delete/permissions/:permissionId", deletePermission)

module.exports = router
