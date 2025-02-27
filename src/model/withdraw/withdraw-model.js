const ShopModel = require("../shop/shop-mongo");
const WithdrawModel = require("./withdraw-mongo");
const sendEmail = require("../../services/email-service");

// Create a withdraw request (Seller only)
const createWithdrawRequest = async (seller, amount) => {
  try {
    const withdrawData = {
      seller,
      amount,
    };

    await sendEmail({
      email: seller.email,
      subject: "Withdraw Request",
      message: `Hello ${seller.name}, Your withdraw request of $${amount} is processing. It will take 3 to 7 days for processing.`,
    });

    const withdraw = await WithdrawModel.create(withdrawData);
    const shop = await ShopModel.findById(seller._id);

    if (!shop) {
      throw new Error("Shop not found!");
    }

    shop.availableBalance -= amount;
    await shop.save();

    return withdraw;
  } catch (error) {
    throw new Error("Error creating withdraw request: " + error.message);
  }
};

// Get all withdraw requests (Admin only)
const getAllWithdrawRequests = async () => {
  try {
    return await WithdrawModel.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error fetching withdraw requests: " + error.message);
  }
};

// Update a withdraw request (Admin only)
const updateWithdrawRequest = async (withdrawId, sellerId) => {
  try {
    const withdraw = await WithdrawModel.findByIdAndUpdate(
      withdrawId,
      { status: "succeed", updatedAt: Date.now() },
      { new: true }
    );

    if (!withdraw) {
      throw new Error("Withdraw request not found!");
    }

    const seller = await ShopModel.findById(sellerId);
    if (!seller) {
      throw new Error("Seller not found!");
    }

    const transaction = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };

    seller.transactions = [...seller.transactions, transaction];
    await seller.save();

    await sendEmail({
      email: seller.email,
      subject: "Payment Confirmation",
      message: `Hello ${seller.name}, Your withdraw request of $${withdraw.amount} is on the way. Delivery time depends on your bank's rules, usually taking 3 to 7 days.`,
    });

    return withdraw;
  } catch (error) {
    throw new Error("Error updating withdraw request: " + error.message);
  }
};

module.exports = {
  createWithdrawRequest,
  getAllWithdrawRequests,
  updateWithdrawRequest,
};
