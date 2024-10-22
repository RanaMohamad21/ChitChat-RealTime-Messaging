const express = require('express');
const { sendMessage, getMessage } = require('../controllers/MessagesControllers');
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/sendMessage',auth,sendMessage)  // send a message to reciever(id) from sender(auth) 
router.post('/getMessage',auth,getMessage) // get messages between sender(auth) and reciever(id)

module.exports = router;