const { userRole, userStatus } = require("../../constants");
const Auth = require("./auth.model");

exports.signupService = async (data) => {
  if (data?.accountType === userRole.agent) {
    data.status = userStatus.pending;
  }
  const result = await Auth.create(data);
  return result;
};
exports.findUserByEmailService = async (email) => {
  const result = await Auth.findOne({ or: [email, { mobileNumber: email }] });
  return result;
};
