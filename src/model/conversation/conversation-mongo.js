const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupTitle: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProfileModel",
        required: true,
      },
    ],
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // Assuming "Message" is your message model
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "conversations" },
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);
module.exports = ConversationModel;
