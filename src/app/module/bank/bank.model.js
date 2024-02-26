const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const systemSchema = mongoose.Schema({
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

const System = mongoose.model("System", systemSchema);

module.exports = System;
