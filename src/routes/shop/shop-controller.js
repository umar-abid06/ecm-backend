const {
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
} = require("../../model/shop/shop-model");

async function httpCreateShop(req, res) {
  const shopData = req.body;

  try {
    const newShop = await createShop(shopData);
    return res.json(newShop);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function httpActivateShop(req, res) {
  const { activationToken } = req.params;

  try {
    const activatedShop = await activateShop(activationToken, res);
    return res.json({
      shop: activatedShop,
      message: "Shop activated successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function httpLoginShop(req, res) {
  const loginData = req.body;

  try {
    const seller = await loginShop(loginData, res);
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetSellerInfo(req, res) {
  const shopId = req.params.id;

  try {
    const seller = await getSellerInfo(shopId);
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpLogoutShop(req, res) {
  const shopId = req.params.id;

  try {
    const seller = await logoutShop(shopId);
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetShopById(req, res) {
  const shopId = req.params.id;

  try {
    const shop = await getShopById(shopId);
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpUpdateShopAvatar(req, res) {
  const shopId = req.params.id;
  const avatar = req.body.avatar;

  try {
    const updatedShop = await updateShopAvatar(shopId, avatar);
    res.json(updatedShop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpUpdateSellerInfo(req, res) {
  const shopId = req.params.id;
  const updateData = req.body;

  try {
    const updatedSeller = await updateSellerInfo(shopId, updateData);
    res.json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpUpdatePaymentMethods(req, res) {
  const shopId = req.params.id;
  const withdrawMethod = req.body.withdrawMethod;

  try {
    const updatedSeller = await updatePaymentMethods(shopId, withdrawMethod);
    res.json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpDeleteWithdrawMethod(req, res) {
  const shopId = req.params.id;

  try {
    const updatedSeller = await deleteWithdrawMethod(shopId);
    res.json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetAllSellers(req, res) {
  try {
    const sellers = await getAllSellers();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpDeleteSeller(req, res) {
  const shopId = req.params.id;

  try {
    const deletedSeller = await deleteSeller(shopId);
    res.json(deletedSeller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  httpCreateShop,
  httpActivateShop,
  httpLoginShop,
  httpGetSellerInfo,
  httpLogoutShop,
  httpGetShopById,
  httpUpdateShopAvatar,
  httpUpdateSellerInfo,
  httpUpdatePaymentMethods,
  httpDeleteWithdrawMethod,
  httpGetAllSellers,
  httpDeleteSeller,
};
