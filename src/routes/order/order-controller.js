const {
  createOrder,
  getAllOrders,
  getSellerOrders,
  updateOrderStatus,
  requestOrderRefund,
  acceptOrderRefund,
  getAllOrdersForAdmin,
} = require("../../model/order/order-model");

async function httpCreateOrder(req, res) {
  const orderData = req.body;

  try {
    const newOrder = await createOrder(orderData);
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetAllOrders(req, res) {
  const userId = req.params.userId;

  try {
    const orders = await getAllOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetSellerOrders(req, res) {
  const shopId = req.params.shopId;

  try {
    const orders = await getSellerOrders(shopId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpUpdateOrderStatus(req, res) {
  const orderId = req.params.orderId;
  const status = req.body.status;

  try {
    const updatedOrder = await updateOrderStatus(orderId, status);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpRequestOrderRefund(req, res) {
  const orderId = req.params.orderId;

  try {
    const refund = await requestOrderRefund(orderId);
    res.json(refund);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpAcceptOrderRefund(req, res) {
  const orderId = req.params.orderId;

  try {
    const refund = await acceptOrderRefund(orderId);
    res.json(refund);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetAllOrdersForAdmin(req, res) {
  try {
    const orders = await getAllOrdersForAdmin();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  httpCreateOrder,
  httpGetAllOrders,
  httpGetSellerOrders,
  httpUpdateOrderStatus,
  httpRequestOrderRefund,
  httpAcceptOrderRefund,
  httpGetAllOrdersForAdmin,
};
