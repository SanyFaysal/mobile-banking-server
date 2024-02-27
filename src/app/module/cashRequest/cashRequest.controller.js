const {
  createCashRequestService,
  getAllCashRequestService,
  approveCashRequestService,
  rejectCashRequestService,
} = require("./cashRequest.service");

exports.createCashRequest = async (req, res) => {
  try {
    const { _id: agentId } = req.user;
    const data = {
      agent: agentId,
      amount: 100000,
    };
    const result = await createCashRequestService(data);
    return res.status(200).json({
      status: "Success",
      message: "Successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.getAllCashRequest = async (req, res) => {
  try {
    const result = await getAllCashRequestService();
    return res.status(200).json({
      status: "Success",
      message: "Successfully fetched",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.approveCashRequest = async (req, res) => {
  try {
    const { agentId, requestId } = req.body;
    const result = await approveCashRequestService(agentId, requestId);
    return res.status(200).json({
      status: "Success",
      message: "Successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.rejectCashRequest = async (req, res) => {
  try {
    const { agentId, requestId } = req.body;
    const result = await rejectCashRequestService(agentId, requestId);
    return res.status(200).json({
      status: "Success",
      message: "Successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
