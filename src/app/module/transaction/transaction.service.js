const { userRole } = require("../../constants");
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
exports.getAllUsersTransactionsService = async () => {
  let result;
  await Transaction.find({})
    .populate("auth")
    .then((transactions) => {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.auth?.accountType === userRole.user
      );
      result = filteredTransactions;
    })
    .catch((err) => {
      console.error(err);
    });
  return result;
};
exports.getAllAgentsTransactionsService = async () => {
  let result;
  await Transaction.find({})
    .populate("auth")
    .then((transactions) => {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.auth?.accountType === userRole.agent
      );
      result = filteredTransactions;
    })
    .catch((err) => {
      console.error(err);
    });
  return result;
};
