// const cloudinary = require("cloudinary");
const ShopModel = require("../model/shop/shop-mongo");
const EventModel = require("./events-mongo");

// Create an event
const createEvent = async (eventData) => {
  try {
    const { shopId, images } = eventData;
    const shop = await ShopModel.findById(shopId);

    if (!shop) {
      throw new Error("Shop ID is invalid!");
    }

    const imageArray = typeof images === "string" ? [images] : images;
    // const imageLinks = await Promise.all(
    //   imageArray.map(async (image) => {
    //     const result = await cloudinary.v2.uploader.upload(image, {
    //       folder: "products",
    //     });
    //     return { public_id: result.public_id, url: result.secure_url };
    //   })
    // );
    // To be refactored
    const imageLinks = imageArray;
    eventData.images = imageLinks;
    eventData.shop = shop;

    const event = await EventModel.create(eventData);
    return event;
  } catch (error) {
    throw new Error("Error creating event: " + error.message);
  }
};

// Get all events
const getAllEvents = async () => {
  try {
    return await Event.find();
  } catch (error) {
    throw new Error("Error fetching events: " + error.message);
  }
};

// Get all events for a specific shop
const getShopEvents = async (shopId) => {
  try {
    return await EventModel.find({ shopId });
  } catch (error) {
    throw new Error("Error fetching shop events: " + error.message);
  }
};

// Delete an event
const deleteEvent = async (eventId) => {
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new Error("Event not found!");
    }

    // await Promise.all(
    //   event.images.map((img) => cloudinary.v2.uploader.destroy(img.public_id))
    // );

    await event.deleteOne();
    return { message: "Event deleted successfully!" };
  } catch (error) {
    throw new Error("Error deleting event: " + error.message);
  }
};

// Get all events for admin
const getAdminEvents = async () => {
  try {
    return await EventModel.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error fetching admin events: " + error.message);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getShopEvents,
  deleteEvent,
  getAdminEvents,
};
