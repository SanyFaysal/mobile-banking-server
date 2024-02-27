const { userRole, userStatus, transactionType } = require("../../constants");
const Agent = require("../agent/agent.model");
const Auth = require("../auth/auth.model");
const {
  createTransactionService,
} = require("../transaction/transaction.service");
const Admin = require("./admin.model");

exports.increaseAdminIncome = async (amount) => {
  await Admin.updateOne(
    { _id: "65dcd92dbaadeb50e0915ece" },
    { $inc: { income: amount } }
  );
};

exports.blockUserService = async (userId, data) => {
  const result = await Auth.updateOne({ _id: userId }, data);
  return result;
};
exports.unBlockUserService = async (userId, data) => {
  const result = await Auth.updateOne({ _id: userId }, data);
  return result;
};
exports.getAgentRequestsService = async () => {
  const result = await Auth.find({
    accountType: userRole.agent,
    status: userStatus.pending,
  });
  return result;
};
exports.approveAgentService = async (agentId, data) => {
  const result = await Auth.updateOne(
    {
      _id: agentId,
    },
    data
  );
  const authDetails = await Auth.findOne({ _id: agentId });
  if (authDetails && authDetails?.accountType === userRole.agent) {
    const agentData = {
      auth: authDetails?._id,
      balance: 100000,
    };
    const res = await Agent.create(agentData);
    await Auth.updateOne({ _id: authDetails?._id }, { agent: res?._id });
    const transactionData = {
      auth: authDetails?._id,
      amount: 100000,
      transactionType: transactionType.openingBonus,
    };
    await createTransactionService(transactionData);
  }
  return result;
};
exports.rejectAgentService = async (agentId, data) => {
  const result = await Auth.updateOne(
    {
      _id: agentId,
    },
    data
  );

  return result;
};
