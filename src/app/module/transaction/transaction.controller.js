const {
  getUserTransactionsService,
  getAllUsersTransactionsService,
  getAllAgentsTransactionsService,
} = require("./transaction.service");

exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log({ userId });
    const result = await getUserTransactionsService(userId);
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

exports.getAllUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getAllUsersTransactionsService(userId);
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

exports.getAllAgentsTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getAllAgentsTransactionsService(userId);
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
