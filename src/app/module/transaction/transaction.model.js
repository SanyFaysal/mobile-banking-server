const { default: mongoose } = require("mongoose");
const { transactionType } = require("../../constants");
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = mongoose.Schema({
  auth: {
    type: ObjectId,
    ref: "Auth",
  },
  sender: {
    type: ObjectId,
    ref: "Auth",
  },
  receiver: {
    type: ObjectId,
    ref: "Auth",
  },
  amount: {
    type: Number,
  },
  transactionType: {
    type: String,
    enum: {
      values: [
        transactionType.cashIn,
        transactionType.cashOut,
        transactionType.sendMoney,
        transactionType.withdraw,
        transactionType.openingBonus,
        transactionType.userCashIn,
      ],
      message: "{VALUE} can't be a transaction type",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
