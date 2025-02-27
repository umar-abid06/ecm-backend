const {
  createEvent,
  getAllEvents,
  getShopEvents,
  deleteEvent,
  getAdminEvents,
} = require("../../model/events/events-model");

async function httpCreateEvent(req, res) {
  const eventData = req.body;

  try {
    const event = await createEvent(eventData);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpGetAllEvents(req, res) {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetShopEvents(req, res) {
  const { shopId } = req.params;
  try {
    const events = await getShopEvents(shopId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpDeleteEvent(req, res) {
  const { eventId } = req.params;

  try {
    const message = await deleteEvent(eventId);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetAdminEvents(req, res) {
  try {
    const events = await getAdminEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  httpCreateEvent,
  httpGetAllEvents,
  httpGetShopEvents,
  httpDeleteEvent,
  httpGetAdminEvents,
};
