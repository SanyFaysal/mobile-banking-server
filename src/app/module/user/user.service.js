const { default: mongoose } = require("mongoose");
const { transactionType, systemId, adminId } = require("../../constants");
const Admin = require("../admin/admin.model");
const { increaseAdminIncome } = require("../admin/admin.service");
const System = require("../bank/bank.model");
const { increaseBankBalance } = require("../bank/bank.service");
const Transaction = require("../transaction/transaction.model");
const {
  createTransactionService,
} = require("../transaction/transaction.service");
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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.updateOne(
      { _id: senderAccount?.user?._id },
      { $inc: { balance: amount > 100 ? -(amount + 5) : -amount } },
      { session }
    );
    const senderTransactionData = {
      auth: senderAccount?._id,
      amount: amount,
      transactionType: transactionType.sendMoney,
    };

    await Transaction.create([senderTransactionData], { session });

    await User.updateOne(
      { _id: receiverAccount?.user?._id },
      { $inc: { balance: amount } },
      { session }
    );

    const receiverTransactionData = {
      auth: receiverAccount?._id,
      amount: amount,
      transactionType: transactionType.cashIn,
    };
    await Transaction.create([receiverTransactionData], { session });

    if (amount > 100) {
      await System.updateOne(
        { _id: systemId },
        { $inc: { balance: amount } },
        { session }
      );
      await Admin.updateOne(
        { _id: adminId },
        { $inc: { income: amount } },
        { session }
      );
    }
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};
