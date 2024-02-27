const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const agentSchema = mongoose.Schema({
  auth: {
    type: ObjectId,
    ref: "Auth",
  },
  balance: {
    type: Number,
  },
  income: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
