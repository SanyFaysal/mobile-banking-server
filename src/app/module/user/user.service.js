const User = require("./user.model");

exports.increaseUserBalance = async (id, amount) => {
  const result = await User.updateOne(
    { _id: id },
    { $inc: { balance: amount } }
  );
  return result;
};

exports.decreaseUserBalance = async (id, amount) => {
  const result = await User.updateOne(
    { _id: id },
    { $inc: { balance: -amount } }
  );
  return result;
};

exports.sendMoneyService = async (amount, senderAccount, receiverAccount) => {
  const result = await senderAccount();
};
