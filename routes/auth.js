var express = require('express')
var router = express.Router()

const {
	signout, 
	createUser, 
	signin, 
	isSignedIn, 
	getUserById, 
	getUser, 
	getAllUser, 
	updateUser } = require("../controllers/auth")

//Get Parameter of user
router.param("userId", getUserById)

//Create user Route
router.post("/create/users", createUser)

//Read User Route
router.get("/get/users/:userId", getUser)
router.get("/users", getAllUser)

//Update User Route
router.put("/edit/users/:userId", updateUser)

//Create signin Route
router.post("/signin", signin)

//Create Signout Route
router.get("/signout", signout)

module.exports = router