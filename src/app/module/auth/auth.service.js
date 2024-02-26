const { userRole, userStatus, transactionType } = require("../../constants");
const Agent = require("../agent/agent.model");
const {
  createTransactionService,
} = require("../transaction/transaction.service");
const User = require("../user/user.model");
const Auth = require("./auth.model");

exports.signupService = async (data) => {
  if (data?.accountType === userRole.agent) {
    data.status = userStatus.pending;
  }
  const result = await Auth.create(data);

  if (result && result?.accountType === userRole.user) {
    const userData = {
      auth: result?._id,
      balance: 40,
    };
    const res = await User.create(userData);
    await Auth.updateOne({ _id: result?._id }, { user: res?._id });
    const transactionData = {
      auth: result?._id,
      amount: 40,
      transactionType: transactionType.openingBonus,
    };
    await createTransactionService(transactionData);
  }

  if (result && result?.accountType === userRole.agent) {
    const agentData = {
      auth: result?._id,
      balance: 100000,
    };
    const res = await Agent.create(agentData);
    await Auth.updateOne({ _id: result?._id }, { agent: res?._id });
    const transactionData = {
      auth: result?._id,
      amount: 100000,
      transactionType: transactionType.openingBonus,
    };
    await createTransactionService(transactionData);
  }

  return result;
};
exports.findUserByEmailService = async (email) => {
  const result = await Auth.findOne({
    $or: [{ email }, { mobileNumber: email }],
  }).populate("user agent admin");
  return result;
};
