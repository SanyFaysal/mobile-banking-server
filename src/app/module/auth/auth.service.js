const { userRole, userStatus } = require("../../constants");
const Agent = require("../agent/agent.model");
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
    await User.create(userData);
  }

  if (result && result?.accountType === userRole.agent) {
    const agentData = {
      auth: result?._id,
      balance: 100000,
    };
    await Agent.create(agentData);
  }
  return result;
};
exports.findUserByEmailService = async (email) => {
  const result = await Auth.findOne({
    $or: [{ email }, { mobileNumber: email }],
  }).populate("user agent admin");
  return result;
};
