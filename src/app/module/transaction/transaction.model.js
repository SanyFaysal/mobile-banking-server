const { default: mongoose } = require("mongoose");
const { transactionType } = require("../../constants");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
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
      ],
      message: "{VALUE} can't be a transaction type",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
