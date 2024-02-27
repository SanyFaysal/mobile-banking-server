const Transaction = require("./transaction.model");

exports.createTransactionService = async (data) => {
  const result = await Transaction.create(data);
  return result;
};
