const express = require('express');
const { sendMessage } = require('../controllers/MessagesControllers');
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/sendMessage/:receiverId',auth,sendMessage)

module.exports = router;