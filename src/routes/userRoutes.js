const express = require('express')
const auth = require('../middleware/auth')
const { getSidebaeUsers } = require('../controllers/usersControllers')

const router = new  express.Router()

router.get("/sidebarUsers" ,auth ,getSidebaeUsers)
// router.get("/filterUsers",auth, filterUsers)
// router.get("/filterGroups",auth, filterGroups)
// router.get("/searchUsers", auth, searchUsers)

module.exports = router