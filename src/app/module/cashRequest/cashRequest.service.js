const { transactionType } = require("../../constants");
const Agent = require("../agent/agent.model");
const Auth = require("../auth/auth.model");
const {
  createTransactionService,
} = require("../transaction/transaction.service");
const CashRequest = require("./cashRequest.model");

exports.createCashRequestService = async (data) => {
  const result = await CashRequest.create(data);
  return result;
};
exports.getAllCashRequestService = async () => {
  const result = await CashRequest.find({ status: "pending" }).populate({
    path: "agent",
    model: "Auth",
    populate: {
      path: "agent",
      model: "Agent",
    },
  });
  return result;
};
exports.approveCashRequestService = async (agentId, requestId) => {
  const result = await CashRequest.updateOne(
    { _id: requestId },
    { status: "approve" }
  );

  if (result) {
    await Agent.updateOne({ auth: agentId }, { $inc: { balance: 100000 } });
    const transactionData = {
      auth: agentId,
      amount: 100000,
      transactionType: transactionType.openingBonus,
    };
    await createTransactionService(transactionData);
  }
  return result;
};
exports.rejectCashRequestService = async (agentId, requestId) => {
  const result = await CashRequest.updateOne(
    { _id: requestId },
    { status: "reject" }
  );

  return result;
};
