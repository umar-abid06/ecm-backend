const express = require("express");
const {
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
} = require("./shop-controller");
const shopRouter = express.Router();

shopRouter.post("/create-shop", httpCreateShop); // POST /shop/create-shop  - create a new shop for a user  // create a new shop for a user POST "/create-shop",    // create a new shop for a user POST "/create-shop",
shopRouter.put("/activate-shop/:id", httpActivateShop); // PUT /shop/activate-shop/:id - activate a shop    // activate a shop PUT "/activate-shop/:id",
shopRouter.post("/login-shop", httpLoginShop); // POST /shop/login-shop - login a shop    // login a shop POST "/login-shop",
shopRouter.get("/get-seller-info/:id", httpGetSellerInfo); // GET /shop/get-seller-info/:id - get seller info    // get seller info GET "/get-seller-info/:id",
shopRouter.put("/logout-shop/:id", httpLogoutShop); // PUT /shop/logout-shop/:id - logout a shop    // logout a shop PUT "/logout-shop/:id",
shopRouter.get("/get-shop/:id", httpGetShopById); // GET /shop/get-shop/:id - get shop by ID    // get shop by ID GET "/get-shop/:id",
shopRouter.put("/update-shop-avatar/:id", httpUpdateShopAvatar); // PUT /shop/update-shop-avatar/:id - update shop avatar    // update shop avatar PUT "/update-shop-avatar/:id",
shopRouter.put("/update-seller-info/:id", httpUpdateSellerInfo); // PUT /shop/update-seller-info/:id - update seller info    // update seller info PUT "/update-seller-info/:id",
shopRouter.put("/update-payment-methods/:id", httpUpdatePaymentMethods); // PUT /shop/update-payment-methods/:id - update payment methods    // update payment methods PUT "/update-payment-methods/:id",
shopRouter.delete("/delete-withdraw-method/:id", httpDeleteWithdrawMethod); // DELETE /shop/delete-withdraw-method/:id - delete withdraw method    // delete withdraw method DELETE "/delete-withdraw-method/:id",
shopRouter.get("/get-all-sellers", httpGetAllSellers); // GET /shop/get-all-sellers - get all sellers    // get all sellers GET "/get-all-sellers",
shopRouter.delete("/delete-seller/:id", httpDeleteSeller); // DELETE /shop/delete-seller/:id - delete a seller    // delete a seller DELETE "/delete-seller/:id",

module.exports = shopRouter;
