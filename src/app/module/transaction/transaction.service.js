const Transaction = require("./transaction.model");

exports.createTransactionService = async (data) => {
  const result = await Transaction.create(data);
  return result;
};

exports.getUserTransactionsService = async (userId) => {
  const result = await Transaction.find({ auth: userId }).populate(
    "auth receiver sender"
  );
  return result;
};
