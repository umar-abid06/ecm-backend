const {
  httpCreateEvent,
  httpGetAllEvents,
  httpGetShopEvents,
  httpDeleteEvent,
  httpGetAdminEvents,
} = require("./events-controller");
const express = require("express");
const eventsRouter = express.Router();
eventsRouter.post("/create-event", httpCreateEvent); // POST "/create-event", create a new event
eventsRouter.get("/get-all-events", httpGetAllEvents); // GET "/get-all-events", get all events
eventsRouter.get("/get-shop-events/:shopId", httpGetShopEvents); //  GET "/get-shop-events/:shopId", get all events by shop ID
eventsRouter.delete("/delete-event/:eventId", httpDeleteEvent); // DELETE "/delete-event/:eventId", delete an event
eventsRouter.get("/get-admin-events", httpGetAdminEvents); // GET "/get-admin-events", get all events for admin
module.exports = eventsRouter;
