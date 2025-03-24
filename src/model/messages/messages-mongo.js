const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    collection: "messages",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for conversationId equal to _id
messagesSchema.virtual("conversationId").get(function () {
  return this._id.toString();
});

const MessagesModel = mongoose.model("MessagesSchema", messagesSchema);
module.exports = MessagesModel;
