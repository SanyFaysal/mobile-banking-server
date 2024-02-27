const { default: mongoose } = require("mongoose");
const { transactionType } = require("../../constants");
const { ObjectId } = mongoose.Schema.Types;

const withdrawSchema = mongoose.Schema({
  agent: {
    type: ObjectId,
    ref: "Auth",
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    default: "pending",
    enum: {
      values: ["pending", "approve", "reject"],
      message: "{VALUE} can't be a status",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Withdraw = mongoose.model("Withdraw", withdrawSchema);

module.exports = Withdraw;
