const express = require('express')
const auth = require('../middleware/auth')
const { getSidebaeUsers, search } = require('../controllers/usersControllers')

const router = new  express.Router()

router.get("/sidebarUsers" ,auth ,getSidebaeUsers)
router.get("/search/:searched", auth, search)
// router.get("/filterUsers",auth, filterUsers)
// router.get("/filterGroups",auth, filterGroups)

module.exports = router