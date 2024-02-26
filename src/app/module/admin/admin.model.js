const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const adminSchema = mongoose.Schema({
  auth: {
    type: ObjectId,
    ref: "Auth",
  },
  income: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Admin = mongoose.model("Bank", adminSchema);

module.exports = Admin;
