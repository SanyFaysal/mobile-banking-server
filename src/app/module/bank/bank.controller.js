const { investMoneyService } = require("./bank.service");

exports.investMoney = async (req, res) => {
  try {
    await investMoneyService();
    res.status(200).json({
      status: "Success",
      message: "Bank Invest Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
