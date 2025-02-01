const ShopModel = require("./shop-mongo");

const createShop = async (shopData) => {
  try {
    const { email, avatar } = shopData;

    const existingShop = await ShopModel.findOne({ email });
    if (existingShop) throw new Error("User already exists");

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    shopData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const activationToken = createActivationToken(shopData);
    const activationUrl = `https://eshop-tutorial-pyri.vercel.app/seller/activation/${activationToken}`;

    await sendMail({
      email,
      subject: "Activate your Shop",
      message: `Hello ${shopData.name}, please click on the link to activate your shop: ${activationUrl}`,
    });

    return {
      success: true,
      message: `Please check your email: ${email} to activate your shop!`,
    };
  } catch (error) {
    throw new Error("Error creating shop: " + error.message);
  }
};

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};
const activateShop = async (activationToken) => {
  try {
    const newSeller = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET
    );
    if (!newSeller) throw new Error("Invalid token");

    const existingSeller = await ShopModel.findOne({ email: newSeller.email });
    if (existingSeller) throw new Error("User already exists");

    const seller = await ShopModel.create(newSeller);
    return sendShopToken(seller);
  } catch (error) {
    throw new Error("Error activating shop: " + error.message);
  }
};
const loginShop = async (email, password) => {
  try {
    if (!email || !password) throw new Error("Please provide all fields!");

    const seller = await ShopModel.findOne({ email }).select("+password");
    if (!seller) throw new Error("User doesn't exist!");

    const isPasswordValid = await seller.comparePassword(password);
    if (!isPasswordValid) throw new Error("Incorrect credentials");

    return sendShopToken(seller);
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

    await cloudinary.v2.uploader.destroy(seller.avatar.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
    });

    seller.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

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
