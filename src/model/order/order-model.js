const ProductModel = require("../product/product-mongo");
const OrderModel = require("./order-mongo");

// create new order POST "/create-order",
const createOrder = async (orderData) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = orderData;

    // Group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // Create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = new OrderModel({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      await order.save();
      orders.push(order);
    }

    return orders;
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
};

// get all orders of user  GET "/get-all-orders/:userId",
const getAllOrders = async (userId) => {
  try {
    const orders = await OrderModel.find({ "user._id": userId }).sort({
      createdAt: -1,
    });

    return orders;
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
};

// get all orders of seller GET "/get-seller-all-orders/:shopId",
const getSellerOrders = async (shopId) => {
  try {
    const orders = await OrderModel.find({ "cart.shopId": shopId }).sort({
      createdAt: -1,
    });

    return orders;
  } catch (error) {
    throw new Error("Error fetching seller orders: " + error.message);
  }
};

// update order status for seller PUT   "/update-order-status/:id",
const updateOrderStatus = async (orderId, status, sellerId) => {
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error("Order not found with this ID");

    if (status === "Transferred to delivery partner") {
      for (const item of order.cart) {
        await updateProductStock(item._id, item.qty);
      }
    }

    order.status = status;

    if (status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.1;
      await updateSellerBalance(sellerId, order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    return order;
  } catch (error) {
    throw new Error("Error updating order status: " + error.message);
  }
};

// Helper functions
const updateProductStock = async (productId, qty) => {
  const product = await ProductModel.findById(productId);
  product.stock -= qty;
  product.sold_out += qty;
  await product.save({ validateBeforeSave: false });
};

const updateSellerBalance = async (sellerId, amount) => {
  //   const seller = await Shop.findById(sellerId);
  //   seller.availableBalance = amount;
  //   await seller.save();
  console.log("SELLER");
};

// give a refund ----- user PUT  "/order-refund/:id", ("/request-order-refund/:orderId")
const requestOrderRefund = async (orderId, status) => {
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error("Order not found with this ID");

    order.status = status;
    await order.save({ validateBeforeSave: false });

    return {
      order,
      message: "Request For Order Refund Is Successful!",
    };
  } catch (error) {
    throw new Error("Error requesting refund: " + error.message);
  }
};

// accept the refund PUT ---- seller "/order-refund-success/:id",("/accept-order-refund/:orderId")
const acceptOrderRefund = async (orderId, status) => {
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error("Order not found with this ID");

    order.status = status;
    await order.save();

    if (status === "Refund Success") {
      for (const item of order.cart) {
        await restoreProductStock(item._id, item.qty);
      }
    }

    return { message: "Order Refund successful!" };
  } catch (error) {
    throw new Error("Error processing refund: " + error.message);
  }
};

// Helper function
const restoreProductStock = async (productId, qty) => {
  const product = await ProductModel.findById(productId);
  product.stock += qty;
  product.sold_out -= qty;
  await product.save({ validateBeforeSave: false });
};

// all orders --- for admin GET "/admin-all-orders",
const getAllOrdersForAdmin = async () => {
  try {
    const orders = await OrderModel.find().sort({
      deliveredAt: -1,
      createdAt: -1,
    });

    return orders;
  } catch (error) {
    throw new Error("Error fetching all orders: " + error.message);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getSellerOrders,
  updateOrderStatus,
  requestOrderRefund,
  acceptOrderRefund,
  getAllOrdersForAdmin,
};
