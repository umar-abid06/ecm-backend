const {
  createConversation,
  getSellerConversations,
  getUserConversations,
  updateLastMessage,
} = require("../../model/conversation/conversation-model");

async function httpCreateConversation(req, res) {
  const { userId, sellerId, groupTitle } = req.body;

  try {
    const conversation = await createConversation(userId, sellerId, groupTitle);
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetSellerConversations(req, res) {
  const { sellerId } = req.params;

  try {
    const conversations = await getSellerConversations(sellerId);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetUserConversations(req, res) {
  const { userId } = req.params;

  try {
    const conversations = await getUserConversations(userId);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpUpdateLastMessage(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const conversation = await updateLastMessage(id, updateData);
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  httpCreateConversation,
  httpGetSellerConversations,
  httpGetUserConversations,
  httpUpdateLastMessage,
};
