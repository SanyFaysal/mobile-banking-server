const { transactionType, adminId } = require("../../constants");
const Admin = require("../admin/admin.model");
const Agent = require("../agent/agent.model");
const {
  createTransactionService,
} = require("../transaction/transaction.service");
const Withdraw = require("./withdraw.model");

exports.getAllWithdrawRequestService = async () => {
  const result = await Withdraw.find({ status: "pending" }).populate({
    path: "agent",
    model: "Auth",
    populate: {
      path: "agent",
      model: "Agent",
    },
  });
  return result;
};
exports.sentWithdrawRequestService = async (data) => {
  const result = await Withdraw.create(data);
  return result;
};

exports.approveWithdrawRequestService = async (agentId, requestId, amount) => {
  const result = await Withdraw.updateOne(
    { _id: requestId },
    { status: "approve" }
  );

  if (result) {
    await Agent.updateOne({ auth: agentId }, { $inc: { income: -amount } });
    await Admin.updateOne({ _id: adminId }, { $inc: { income: amount } });

    const transactionData = {
      auth: agentId,
      amount: amount,
      transactionType: transactionType.withdraw,
    };
    await createTransactionService(transactionData);
  }
  return result;
};

exports.rejectWithdrawRequestService = async (requestId) => {
  const result = await Withdraw.updateOne(
    { _id: requestId },
    { status: "reject" }
  );

  return result;
};
