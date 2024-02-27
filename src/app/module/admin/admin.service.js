const Auth = require("../auth/auth.model");
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
