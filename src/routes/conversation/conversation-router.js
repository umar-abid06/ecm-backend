const express = require("express");
const {
  httpCreateConversation,
  httpGetSellerConversations,
  httpGetUserConversations,
  httpUpdateLastMessage,
} = require("./conversation-controller");

const conversationRouter = express.Router();

conversationRouter.post("/create-conversation", httpCreateConversation); // POST /conversation/create-conversation  - create a new conversation    // create a new conversation POST "/create-conversation",  // create a new conversation POST "/create-conversation",
conversationRouter.get(
  "/get-seller-conversations/:sellerId",
  httpGetSellerConversations
); // GET /conversation/get-seller-conversations/:sellerId - get all conversations for a seller    // get all conversations for a seller GET "/get-seller-conversations/:sellerId",  // get all conversations for a seller GET "/get-seller-conversations/:sellerId",   // get all conversations for a seller GET "/get-seller-conversations/:sellerId",
conversationRouter.get(
  "/get-user-conversations/:userId",
  httpGetUserConversations
); // GET /conversation/get-user-conversations/:userId - get all conversations for a user    // get all conversations for a user GET "/get-user-conversations/:userId",  // get all conversations for a user GET "/get-user-conversations/:userId",
conversationRouter.put("/update-last-message/:id", httpUpdateLastMessage); // PUT /conversation/update-last-message/:id - update the last message in a conversation    // update the last message in a conversation PUT "/update-last-message/:id",  // update the last message in a conversation PUT "/update-last-message/:id",   // update the last message in a conversation PUT "/update-last-message/:id",

module.exports = conversationRouter;
