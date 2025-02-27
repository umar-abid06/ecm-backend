const {
  createWithdrawRequest,
  getAllWithdrawRequests,
  updateWithdrawRequest,
} = require("../../model/withdraw/withdraw-model");

async function httpCreateWithdrawRequest(req, res) {
  const { seller, amount } = req.body;

  try {
    const withdraw = await createWithdrawRequest(seller, amount);
    res.json(withdraw);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetAllWithdrawRequests(req, res) {
  try {
    const withdraws = await getAllWithdrawRequests();
    res.json(withdraws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpUpdateWithdrawRequest(req, res) {
  const { withdrawId, sellerId } = req.body;

  try {
    const withdraw = await updateWithdrawRequest(withdrawId, sellerId);
    res.json(withdraw);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  httpCreateWithdrawRequest,
  httpGetAllWithdrawRequests,
  httpUpdateWithdrawRequest,
};
