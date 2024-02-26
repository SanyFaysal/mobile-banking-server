const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
  auth: {
    type: ObjectId,
    ref: "Auth",
  },
  balance: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
