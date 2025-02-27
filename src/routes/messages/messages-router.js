const {
  httpCreateMessage,
  httpGetMessagesByConversation,
} = require("./messages-controller");

const express = require("express");
const messagesRouter = express.Router();

messagesRouter.post("/create-message", httpCreateMessage); // create a new message POST "/create-message",
messagesRouter.get(
  "/get-messages/:conversationId",
  httpGetMessagesByConversation
); // get all messages by conversation ID GET "/get-messages/:conversationId",
module.exports = messagesRouter;
