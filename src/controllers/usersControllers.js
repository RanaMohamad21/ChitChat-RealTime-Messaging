const conversation = require("../models/conversation");
const User = require("../models/users")

const getSidebaeUsers = async (req, res) => {
    try {
        const userId = req.user._id
        // Find all conversations where the current user is a participant
        const conversations = await conversation.find({
            participants: userId
        }).select("participants");

        // Extract unique participant IDs, excluding the current user's ID
        let participantIds = [];
        
        conversations.forEach((conversation) => {
            conversation.participants.forEach((participant) => {
                if (participant.toString() !== userId && !participantIds.includes(participant.toString())) {
                    participantIds.push(participant.toString());
                }
            });
        });

        // Fetch user details of the participants, excluding their passwords
        const users = await User.find({ _id: { $in: participantIds } }).select("-password");
        res.status(200).json(users)

    } catch (error) {
        console.error("Error in get sidebar users controllers", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    getSidebaeUsers
}