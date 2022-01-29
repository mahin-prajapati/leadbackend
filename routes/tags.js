const express = require('express')
const router = express.Router()

const { createTag, getAllTag, getTag, getTagById, updateTag, deleteTag } = require("../controllers/tags")

//Get Parameter of Tag
router.param("tagId", getTagById)

//Create Communication Type Route
router.post("/create/tags", createTag)

//Read Communication Type Route
router.get("/get/tags/:tagId", getTag)
router.get("/tags", getAllTag)

//Update Communication Type Route
router.put("/edit/tags/:tagId", updateTag)

//Delete Communication Type Route
router.delete("/delete/tags/:tagId", deleteTag)

module.exports = router