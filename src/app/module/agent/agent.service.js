const { default: mongoose } = require("mongoose");
const User = require("../user/user.model");
const System = require("../bank/bank.model");
const { systemId } = require("../../constants");
const Transaction = require("../transaction/transaction.model");
const { transactionType } = require("../../constants");
const Agent = require("./agent.model");

exports.userCashInService = async (amount, userAccount, agentAccount) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await session.commitTransaction();

    await Agent.updateOne(
      { _id: agentAccount?.agent?._id },
      { $inc: { balance: -amount } },
      { session }
    );

    await User.updateOne(
      { _id: userAccount?.user?._id },
      { $inc: { balance: amount } },
      { session }
    );
    await System.updateOne(
      { _id: systemId },
      { $inc: { balance: -amount } },
      { session }
    );

    const userTransactionData = {
      auth: userAccount?.user?._id,
      sender: agentAccount?.agent?._id,
      transactionType: transactionType.cashIn,
      amount,
    };
    await Transaction.create([userTransactionData], { session });

    const agentTransactionData = {
      auth: agentAccount?.agent?._id,
      receiver: userAccount?.user?._id,
      transactionType: transactionType.userCashIn,
      amount,
    };
    await Transaction.create([agentTransactionData], { session });

    return true;
  } catch (error) {
    await session.abortTransaction();
    return error;
  } finally {
    session.endSession();
  }
};
