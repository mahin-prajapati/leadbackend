const express = require('express')
const router = express.Router()

const { createPreference, getPreferenceById, getPreference, getAllPreference, updatePreference, deletePreference } = require("../controllers/preferences")

//Get Parameter of Preference Route
router.param("preferenceId", getPreferenceById)

//Create Preference Route
router.post("/create/preferences", createPreference)

//Read Preference Route
router.get("/get/preferences/:preferenceId", getPreference)
router.get("/preferences", getAllPreference)

//Update Preference Route
router.put("/edit/preferences/:preferenceId", updatePreference)

//Delete Preference Route
router.delete("/delete/preferences/:preferenceId", deletePreference)

module.exports = router
