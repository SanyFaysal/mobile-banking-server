const { default: mongoose } = require("mongoose");
const { transactionType } = require("../../constants");
const { ObjectId } = mongoose.Schema.Types;

const cashRequestSchema = mongoose.Schema({
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

const CashRequest = mongoose.model("CashRequest", cashRequestSchema);

module.exports = CashRequest;
