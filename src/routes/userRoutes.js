const express = require('express')
const auth = require('../middleware/auth')
const { getSidebaeUsers } = require('../controllers/usersControllers')

const router = new  express.Router()

router.get("/sidebarUsers" ,auth ,getSidebaeUsers)

module.exports = router