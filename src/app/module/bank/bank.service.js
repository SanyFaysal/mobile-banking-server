const Bank = require("./bank.model");

exports.investMoneyService = async () => {
  await Bank.create({ balance: 10000000 });
};
exports.increaseBankBalance = async (amount) => {
  const bankDetails = await Bank.find({});
  await Bank.updateOne(
    { _id: bankDetails[0]?._id },
    { $inc: { balance: amount } }
  );
};
