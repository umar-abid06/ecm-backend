const ShopModel = require("./shop-mongo");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/email-service");
const sendShopToken = require("../../services/shopToken-service");

const createShop = async (shopData) => {
  try {
    const { email, avatar } = shopData;

    const existingShop = await ShopModel.findOne({ email });
    if (existingShop) throw new Error("User already exists");

    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });

    // shopData.avatar = {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // };

    // Create activation token
    const activationToken = createActivationToken(shopData);

    // Define activation URL (to be refactored with your deployed URL in production)
    const activationUrl = `http://localhost:${process.env.PORT}/api/v1/shop/activate-shop/${activationToken}`;

    // Send activation email to the shop owner
    await sendEmail({
      email,
      subject: "Activate your Shop",
      html: `<p>Hello ${shopData.name}, please click on the link to activate your shop</p><p>Press <a href="${activationUrl}">HERE</a> to proceed.</p>`,
    });

    return {
      success: true,
      message: `Please check your email: ${email} to activate your shop!`,
    };
  } catch (error) {
    throw new Error("Error creating shop: " + error.message);
  }
};

const createActivationToken = (shopData) => {
  if (typeof shopData !== "object" || shopData === null) {
    throw new Error("Invalid shop data");
  }

  return jwt.sign(shopData, process.env.ACTIVATION_SECRET, {
    expiresIn: 600, // 600 seconds = 10 minutes
  });
};

// Function to activate the shop after clicking the activation link
const activateShop = async (activationToken, res) => {
  try {
    // Verify the activation token
    const newShopData = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET
    );
    if (!newShopData) throw new Error("Invalid token");

    // Check if the shop already exists
    const existingShop = await ShopModel.findOne({ email: newShopData.email });
    if (existingShop) throw new Error("Shop already exists");

    // Create the shop in the database
    const shop = await ShopModel.create(newShopData);

    // Send shop token (Assuming this sends back a token for the newly created shop)
    return sendShopToken(shop, 200, res);
  } catch (error) {
    throw new Error("Error activating shop: " + error.message);
  }
};
const loginShop = async (credentials, res) => {
  const { email, password } = credentials;
  try {
    if (!email || !password) throw new Error("Please provide all fields!");

    const seller = await ShopModel.findOne({ email }).select("+password");
    if (!seller) throw new Error("User doesn't exist!");

    const isPasswordValid = await seller.comparePassword(password);
    if (!isPasswordValid) throw new Error("Incorrect credentials");

    return sendShopToken(seller, 200, res);
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};
const getSellerInfo = async (sellerId) => {
  try {
    const seller = await ShopModel.findById(sellerId);
    if (!seller) throw new Error("User doesn't exist");

    return seller;
  } catch (error) {
    throw new Error("Error fetching seller info: " + error.message);
  }
};
const logoutShop = async () => {
  try {
    return {
      success: true,
      message: "Log out successful!",
      cookies: {
        seller_token: null,
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    };
  } catch (error) {
    throw new Error("Error logging out: " + error.message);
  }
};
const getShopById = async (shopId) => {
  try {
    const shop = await ShopModel.findById(shopId);
    if (!shop) throw new Error("Shop not found");

    return shop;
  } catch (error) {
    throw new Error("Error fetching shop info: " + error.message);
  }
};
const updateShopAvatar = async (sellerId, avatar) => {
  try {
    let seller = await ShopModel.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    // await cloudinary.v2.uploader.destroy(seller.avatar.public_id);

    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    //   width: 150,
    // });

    // seller.avatar = {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // };

    await seller.save();
    return seller;
  } catch (error) {
    throw new Error("Error updating shop avatar: " + error.message);
  }
};
const updateSellerInfo = async (sellerId, updateData) => {
  try {
    const seller = await ShopModel.findById(sellerId);
    if (!seller) throw new Error("User not found");

    Object.assign(seller, updateData);
    await seller.save();

    return seller;
  } catch (error) {
    throw new Error("Error updating seller info: " + error.message);
  }
};
const updatePaymentMethods = async (sellerId, withdrawMethod) => {
  try {
    const seller = await ShopModel.findByIdAndUpdate(sellerId, {
      withdrawMethod,
    });
    return seller;
  } catch (error) {
    throw new Error("Error updating payment methods: " + error.message);
  }
};
const deleteWithdrawMethod = async (sellerId) => {
  try {
    const seller = await ShopModel.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    seller.withdrawMethod = null;
    await seller.save();

    return seller;
  } catch (error) {
    throw new Error("Error deleting withdraw method: " + error.message);
  }
};
// For Admins
const getAllSellers = async () => {
  try {
    const sellers = await ShopModel.find().sort({ createdAt: -1 });
    return sellers;
  } catch (error) {
    throw new Error("Error fetching sellers: " + error.message);
  }
};
const deleteSeller = async (sellerId) => {
  try {
    const seller = await ShopModel.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    await ShopModel.findByIdAndDelete(sellerId);
    return { success: true, message: "Seller deleted successfully!" };
  } catch (error) {
    throw new Error("Error deleting seller: " + error.message);
  }
};

module.exports = {
  createShop,
  activateShop,
  loginShop,
  getSellerInfo,
  logoutShop,
  getShopById,
  updateShopAvatar,
  updateSellerInfo,
  updatePaymentMethods,
  deleteWithdrawMethod,
  getAllSellers,
  deleteSeller,
};
