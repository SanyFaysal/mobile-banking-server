const { findUserByEmailService } = require("../auth/auth.service");
const { userCashInService } = require("./agent.service");

exports.userCashIn = async (req, res) => {
  try {
    const agentAccount = req.user;

    const { userMobileNumber, amount, agentPassword } = req.body;

    const userAccount = await findUserByEmailService(userMobileNumber);

    if (!userAccount) {
      return res.status(401).json({
        status: "failed",
        error: "No User found with this mobile number balance !",
      });
    }

    const isPasswordCorrect = agentAccount.comparePassword(
      agentPassword,
      agentAccount?.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid password !",
      });
    }

    await userCashInService(amount, userAccount, agentAccount);

    return res.status(200).json({
      status: "Success",
      message: "User Cash in success !",
    });
  } catch (error) {}
};
