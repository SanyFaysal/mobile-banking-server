const {
  sentWithdrawRequestService,
  getAllWithdrawRequestService,
  approveWithdrawRequestService,
  rejectWithdrawRequestService,
} = require("./withdraw.service");

exports.sendWithdrawRequest = async (req, res) => {
  try {
    const agent = req.user;
    const data = req.body;
    data.agent = agent._id;
    if (agent?.agent?.income < data?.amount) {
      return res.status(400).json({
        status: "failed",
        error: "You don't have much money !!",
      });
    }
    const result = await sentWithdrawRequestService(data);
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.getAllWithdrawRequest = async (req, res) => {
  try {
    const result = await getAllWithdrawRequestService();
    return res.status(200).json({
      status: "Success",
      message: "Successfully fetched",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.approveWithdrawRequest = async (req, res) => {
  try {
    const { agentId, requestId, amount } = req.body;
    const agent = req.user;
    console.log({ agent });
    if (agent?.agent?.income < amount) {
      return res.status(400).json({
        status: "failed",
        error: "Agent don't have much money !!",
      });
    }
    const result = await approveWithdrawRequestService(
      agentId,
      requestId,
      amount
    );
    return res.status(200).json({
      status: "Success",
      message: "Successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.rejectWithdrawRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const result = await rejectWithdrawRequestService(requestId);
    return res.status(200).json({
      status: "Success",
      message: "Successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
