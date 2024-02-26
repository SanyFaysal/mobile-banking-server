const { default: mongoose } = require("mongoose");
const { transactionType } = require("../../constants");
const { increaseAdminIncome } = require("../admin/admin.service");
const { findUserByEmailService } = require("../auth/auth.service");
const { increaseBankBalance } = require("../bank/bank.service");
const {
  createTransactionService,
} = require("../transaction/transaction.service");
const {
  increaseUserBalance,
  decreaseUserBalance,
  sendMoneyService,
} = require("./user.service");

exports.sendMoney = async (req, res) => {
  try {
    const senderAccount = req.user;
    const { mobileNumber, amount } = req.body;

    const receiverAccount = await findUserByEmailService(mobileNumber);

    if (senderAccount?.mobileNumber === receiverAccount?.mobileNumber) {
      return res.status(401).json({
        status: "failed",
        error: "You can't send money to your Account !",
      });
    }

    if (!receiverAccount) {
      return res.status(401).json({
        status: "failed",
        error: "No User found with Mobile Number",
      });
    }

    if (amount < 50) {
      return res.status(401).json({
        status: "failed",
        error: "Minimum 50 tk can be sent !",
      });
    }

    await sendMoneyService(amount, senderAccount, receiverAccount);

    return res.status(200).json({
      status: "Success",
      error: "Send Money Successful !",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
