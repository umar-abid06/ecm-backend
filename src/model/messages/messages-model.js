// const cloudinary = require("cloudinary");
const MessagesModel = require("./messages-mongo");

// Create a new message
const createMessage = async (messageData) => {
  try {
    const { conversationId, sender, text, images } = messageData;
    let imageData = null;

    // if (images) {
    //   const uploadedImage = await cloudinary.v2.uploader.upload(images, {
    //     folder: "messages",
    //   });

    //   imageData = {
    //     public_id: uploadedImage.public_id,
    //     url: uploadedImage.url,
    //   };
    // }

    const message = new MessagesModel({
      conversationId,
      sender,
      text,
      images: imageData || undefined,
    });

    await message.save();
    return message;
  } catch (error) {
    throw new Error("Error creating message: " + error.message);
  }
};

// Get all messages for a conversation
const getMessagesByConversation = async (conversationId) => {
  try {
    return await MessagesModel.find({ conversationId });
  } catch (error) {
    throw new Error("Error fetching messages: " + error.message);
  }
};

module.exports = {
  createMessage,
  getMessagesByConversation,
};
