const Conversation = require('../models/conversation')
const Message = require('../models/message')
const { getReceiverSocketId } = require('../socket/socket')

const sendMessage = async (req, res) => {
    try {
        const { message, receiverIds } = req.body; // Get multiple receiver IDs from the request body
        const senderId = req.user._id.toString();

        const messages = [];

        // Loop through each receiver ID and handle sending the message
        for (const receiverId of receiverIds) {
            // Find if conversation between sender and receiver already exists
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });

            // If no conversation exists, create a new one
            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                    messages: []
                });
            }

            // Create new message for this receiver
            const newMessage = new Message({
                senderId,
                receiverId,
                message
            });

            // Push the message ID into the conversation
            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            // Save the conversation and the message in parallel
            await Promise.all([conversation.save(), newMessage.save()]);

            // Store the message to return later
            messages.push(newMessage);

            // Optionally, send the message to the receiver's socket
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }
        }

        // Respond with all sent messages
        res.status(201).json(messages);
    } catch (error) {
        console.error(error.message, 'message controller');
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getMessage = async (req, res) => {
    try {
        const { userToChatIds } = req.body; // Get multiple user IDs from the request body
        const senderId = req.user._id.toString();

        // Find all conversations that involve the sender and any of the specified participants
        const conversations = await Conversation.find({
            participants: { $all: senderId,  $in: userToChatIds  }
        }).populate("messages"); // Populate to get actual messages

        // If no conversation is found, return an empty array
        if (!conversations.length) return res.status(200).json([]);

        // Extract messages from all found conversations
        const messages = conversations.flatMap(conversation => conversation.messages);

        res.status(200).json(messages);
    } catch (error) {
        console.error(error.message, 'get message controller');
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    sendMessage,
    getMessage
}