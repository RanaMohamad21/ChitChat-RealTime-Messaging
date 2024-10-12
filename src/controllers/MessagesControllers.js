const Conversation = require('../models/conversation')
const Message = require('../models/message')

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id.toString()
        console.log(senderId)

        // find if conversation between sender and receiver already exists
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        //sending message for first time
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        await newMessage.save()


        conversation.messages.push(newMessage._id)
        await conversation.save()


        res.status(201).json(newMessage)
    } catch (error) {
        console.error(error.message, 'message controller')
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getMessage = async(req,res)=>{
    try{
        const {id: userToChatId } = req.params
        const senderId = req.user._id.toString()

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,  userToChatId]}
        }).populate("messages") //to put actual messages expect messages id

        if (!conversation) return res.status(200).json([])

        return res.status(200).json(conversation.messages)
    }catch(error){
        console.error(error.message, 'get message controller')
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = {
    sendMessage,
    getMessage
}