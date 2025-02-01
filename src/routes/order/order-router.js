const express = require("express");
const {
  httpCreateOrder,
  httpGetAllOrders,
  httpGetSellerOrders,
  httpUpdateOrderStatus,
  httpRequestOrderRefund,
  httpAcceptOrderRefund,
  httpGetAllOrdersForAdmin,
} = require("./order-controller");

const orderRouter = express.Router();

orderRouter.post("/create-order", httpCreateOrder); // POST /order/create-order  - create a new order
orderRouter.get("/get-all-orders/:userId", httpGetAllOrders); // GET /order/get-all-orders/:userId - get all orders of a user
orderRouter.get("/get-seller-all-orders/:shopId", httpGetSellerOrders); // GET /order/get-seller-all-orders/:shopId - get all orders of a seller
orderRouter.put("/update-order-status/:orderId", httpUpdateOrderStatus); // PUT /order/update-order-status/:orderId - update order status
orderRouter.put("/request-order-refund/:orderId", httpRequestOrderRefund); // PUT /order/request-order-refund/:orderId - request order refund
orderRouter.put("/accept-order-refund/:orderId", httpAcceptOrderRefund); // PUT /order/accept-order-refund/:orderId - accept order refund
orderRouter.get("/get-all-orders-for-admin", httpGetAllOrdersForAdmin); // GET /order/get-all-orders-for-admin - get all orders for admin

module.exports = orderRouter;
