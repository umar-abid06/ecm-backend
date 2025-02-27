const {
  createMessage,
  getMessagesByConversation,
} = require("../../model/messages/messages-model");

async function httpCreateMessage(req, res) {
  const messageData = req.body;

  try {
    const message = await createMessage(messageData);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetMessagesByConversation(req, res) {
  const { conversationId } = req.params;

  try {
    const messages = await getMessagesByConversation(conversationId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  httpCreateMessage,
  httpGetMessagesByConversation,
};
