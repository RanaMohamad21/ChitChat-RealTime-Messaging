const conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/users");

const getParticipants = async (userId) => {
    try {
        // Find all conversations where the current user is a participant
        const conversations = await conversation.find({
            participants: userId
        }).select("participants");

        // Extract unique participant IDs, excluding the current user's ID
        let participantIds = [];
        conversations.forEach((conversation) => {
            conversation.participants.forEach((participant) => {
                if (!participantIds.includes(participant.toString())) {
                    participantIds.push(participant.toString());
                }
            });
        });

        return participantIds;
    } catch (error) {
        console.error("Error in getParticipants", error.message);
        throw new Error("Error getting participants.");
    }
};

const getSidebaeUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const participantIds = await getParticipants(userId);

        const users = await User.find({ _id: { $in: participantIds } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getSidebaeUsers", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const search = async (req, res) => {
    try {
        const userId = req.user._id;
        const searchTerm = req.params.searched;

        const participantIds = await getParticipants(userId);
        // Search for participants based on the search term (username or email)
        const users = await User.find({
            $and: [
                { _id: { $in: participantIds } }, // Filter by participants in the user's conversations
                {
                    $or: [
                        { userName: { $regex: searchTerm, $options: "i" } },
                        { email: { $regex: searchTerm, $options: "i" } }
                    ]
                }
            ]
        }).select("-password");

        // Step 4: Search for messages in those conversations containing the search term

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: { $in: participantIds } }, // Messages sent by the user to participants
                { senderId: { $in: participantIds }, receiverId: userId }  // Messages received by the user from participants
            ],
            message: { $regex: searchTerm, $options: "i" } // Search within message content
        });
        // console.log(conversations.map((conv) => conv._id))
        res.status(200).json({ users, messages });
    } catch (error) {
        console.error("Error searching users and messages:", error.message);
        res.status(500).json({ error: "Failed to search users and messages." });
    }
};

const filterUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        // Use aggregation to filter one-on-one conversations
        const oneOnOneConversations = await conversation.aggregate([
            { $match: { participants: userId } }, // Match conversations where the user is a participant
            { $project: { participants: 1, participantCount: { $size: "$participants" } } }, // Add a field with the size of the participants array
            { $match: { participantCount: 2 } } // Filter to conversations with exactly 2 participants
        ]);

        if (oneOnOneConversations.length > 0) {
            // Collect the participant IDs from these filtered conversations
            let oneOnOneParticipantIds = [];
            oneOnOneConversations.forEach(conversation => {
                conversation.participants.forEach(participant => {
                    if (participant.toString() !== userId && !oneOnOneParticipantIds.includes(participant.toString())) {
                        oneOnOneParticipantIds.push(participant.toString());
                    }
                });
            });

            // Fetch user details for these participants
            const users = await User.find({ _id: { $in: oneOnOneParticipantIds } }).select("-password");

            res.status(200).json(users);
        } else {
            res.status(200).json("You have no  conversations yet.");
        }
    } catch (error) {
        console.error("Error filtering user conversations:", error.message);
        res.status(500).json({ error: "Failed to filter user conversations." });
    }
};

const filterGroups = async (req, res) => {
    try {
        const userId = req.user._id;

        // Use aggregation to filter group conversations
        const groupConversations = await conversation.aggregate([
            { $match: { participants: userId } }, // Match conversations where the user is a participant
            { $project: { participants: 1, participantCount: { $size: "$participants" } } }, // Add a field with the size of the participants array
            { $match: { participantCount: { $gt: 2 } } } // Filter to conversations with more than 2 participants
        ]);

        if (groupConversations.length > 0) {
            // Collect the participant IDs from these filtered conversations
            let groupParticipantIds = [];
            groupConversations.forEach(conversation => {
                conversation.participants.forEach(participant => {
                    if (participant.toString() !== userId && !groupParticipantIds.includes(participant.toString())) {
                        groupParticipantIds.push(participant.toString());
                    }
                });
            });

            // Fetch user details for these group participants
            const users = await User.find({ _id: { $in: groupParticipantIds } }).select("-password");

            res.status(200).json(users);
        } else {
            res.status(200).json("You have no group conversations yet.");
        }
    } catch (error) {
        console.error("Error filtering group conversations:", error.message);
        res.status(500).json({ error: "Failed to filter group conversations." });
    }
};



module.exports = {
    getSidebaeUsers,
    search,
    filterGroups,
    filterUsers
};
