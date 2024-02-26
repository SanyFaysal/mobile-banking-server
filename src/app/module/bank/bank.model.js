const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
  balance: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Bank = mongoose.model("Bank", userSchema);

module.exports = Bank;
