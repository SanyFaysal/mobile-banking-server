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
const { getPercentageValue } = require("../../utils/getPErcentageValue");
const Agent = require("../agent/agent.model");

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
      receiver: receiverAccount?.user?._id,
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
      sender: senderAccount?._id,
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

exports.cashOutService = async (amount, userAccount, agentAccount) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const agentPercentage = getPercentageValue(amount, 1);
    const adminPercentage = getPercentageValue(amount, 0.5);

    await User.updateOne(
      { _id: userAccount?.user?._id },
      { $inc: { balance: -(amount + agentPercentage + adminPercentage) } },
      { session }
    );

    await Agent.updateOne(
      { _id: agentAccount?.agent?._id },
      { $inc: { balance: amount, income: agentPercentage } },
      { session }
    );
    await Admin.updateOne(
      { _id: adminId },
      { $inc: { income: adminPercentage } },
      { session }
    );

    await System.updateOne(
      { _id: systemId },
      { $inc: { balance: amount } },
      { session }
    );

    const transactionData = {
      auth: userAccount?.user?._id,
      amount: amount,
      receiver: agentAccount?.agent?._id,
      transactionType: transactionType.cashOut,
    };

    await Transaction.create([transactionData], { session });

    await session.commitTransaction();

    return true;
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};
