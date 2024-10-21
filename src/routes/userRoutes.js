const express = require('express')
const auth = require('../middleware/auth')
const usersControllers = require('../controllers/usersControllers')

const router = new  express.Router()

router.get("/sidebarUsers" ,auth , usersControllers.getSidebaeUsers)
router.get("/search/:searched", auth, usersControllers.search)
router.get("/filterUsers",auth, usersControllers.filterUsers)
router.get("/filterGroups",auth, usersControllers.filterGroups)

module.exports = router