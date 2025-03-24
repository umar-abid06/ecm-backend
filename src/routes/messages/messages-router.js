const {
  httpCreateMessage,
  httpGetMessagesByConversation,
} = require("./messages-controller");

const express = require("express");
const messagesRouter = express.Router();

messagesRouter.post("/create-message", httpCreateMessage); // POST "/create-message" create a new message
messagesRouter.get(
  "/get-messages/:conversationId",
  httpGetMessagesByConversation
); // GET "/get-messages/:conversationId" get all messages by conversation ID
module.exports = messagesRouter;
