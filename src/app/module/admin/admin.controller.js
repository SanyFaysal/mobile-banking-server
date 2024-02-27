const { userStatus } = require("../../constants");
const {
  blockUserService,
  unBlockUserService,
  getAgentRequestsService,
  approveAgentService,
  rejectAgentService,
} = require("./admin.service");

exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = { status: userStatus.blocked };
    await blockUserService(userId, data);
    return res.status(200).json({
      status: "Success",
      message: "Blocked Success",
    });
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.unBlockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = { status: userStatus.active };
    await unBlockUserService(userId, data);
    return res.status(200).json({
      status: "Success",
      message: "Unblocked Success",
    });
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.getAgentRequests = async (req, res) => {
  try {
    const result = await getAgentRequestsService();
    return res.status(200).json({
      status: "Success",
      message: " Success",
      data: result,
    });
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.approveAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const data = {
      status: userStatus.active,
    };
    const result = await approveAgentService(agentId, data);
    return res.status(200).json({
      status: "Success",
      message: " Success",
      data: result,
    });
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.rejectAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const data = {
      status: userStatus.reject,
    };
    const result = await rejectAgentService(agentId, data);
    return res.status(200).json({
      status: "Success",
      message: " Success",
      data: result,
    });
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
