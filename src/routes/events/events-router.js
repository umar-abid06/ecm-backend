const {
  httpCreateEvent,
  httpGetAllEvents,
  httpGetShopEvents,
  httpDeleteEvent,
  httpGetAdminEvents,
} = require("./events-controller");
const express = require("express");
const eventsRouter = express.Router();
eventsRouter.post("/create-event", httpCreateEvent); // create a new event POST "/create-event",
eventsRouter.get("/get-all-events", httpGetAllEvents); // get all events GET "/get-all-events",
eventsRouter.get("/get-shop-events/:shopId", httpGetShopEvents); // get all events by shop ID GET "/get-shop-events/:shopId",
eventsRouter.delete("/delete-event/:eventId", httpDeleteEvent); // delete an event DELETE "/delete-event/:eventId",
eventsRouter.get("/get-admin-events", httpGetAdminEvents); // get all events for admin GET "/get-admin-events",
module.exports = eventsRouter;
