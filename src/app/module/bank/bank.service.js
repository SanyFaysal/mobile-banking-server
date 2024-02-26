const System = require("./bank.model");

exports.investMoneyService = async () => {
  await System.create({ balance: 10000000 });
};
exports.increaseBankBalance = async (amount) => {
  const bankDetails = await System.find({});
  await System.updateOne(
    { _id: bankDetails[0]?._id },
    { $inc: { balance: amount } }
  );
};
