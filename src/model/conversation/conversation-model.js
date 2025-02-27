const ConversationModel = require("./conversation-mongo");

// Create a new conversation
const createConversation = async (conversationData) => {
  try {
    const { groupTitle, userId, sellerId } = conversationData;

    const isConversationExist = await ConversationModel.findOne({ groupTitle });

    if (isConversationExist) {
      return isConversationExist;
    }

    const conversation = new ConversationModel({
      members: [userId, sellerId],
      groupTitle,
    });

    await conversation.save();
    return conversation;
  } catch (error) {
    throw new Error("Error creating conversation: " + error.message);
  }
};

// Get all conversations for a seller
const getSellerConversations = async (sellerId) => {
  try {
    const conversations = await ConversationModel.find({
      members: { $in: [sellerId] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    return conversations;
  } catch (error) {
    throw new Error("Error fetching seller conversations: " + error.message);
  }
};

// Get all conversations for a user
const getUserConversations = async (userId) => {
  try {
    const conversations = await ConversationModel.find({
      members: { $in: [userId] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    return conversations;
  } catch (error) {
    throw new Error("Error fetching user conversations: " + error.message);
  }
};

// Update the last message in a conversation
const updateLastMessage = async (id, updateData) => {
  try {
    const { lastMessage, lastMessageId } = updateData;

    const conversation = await ConversationModel.findByIdAndUpdate(
      id,
      { lastMessage, lastMessageId },
      { new: true }
    );

    return conversation;
  } catch (error) {
    throw new Error("Error updating last message: " + error.message);
  }
};

module.exports = {
  createConversation,
  getSellerConversations,
  getUserConversations,
  updateLastMessage,
};
