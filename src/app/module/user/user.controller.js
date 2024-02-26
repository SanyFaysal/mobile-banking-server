const { findUserByEmailService } = require("../auth/auth.service");

exports.sendMoney = async (req, res) => {
  try {
    const { mobileNumber, amount } = req.body;
    const recipientAccount = await findUserByEmailService(mobileNumber);
    console.log({ recipientAccount });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
