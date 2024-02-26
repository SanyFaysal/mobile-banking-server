const { userStatus, userRole } = require("../../constants");
const { findUserByEmailService } = require("../auth/auth.service");

const { sendMoneyService, cashOutService } = require("./user.service");

exports.sendMoney = async (req, res) => {
  try {
    const senderAccount = req.user;
    const { mobileNumber, amount } = req.body;

    const receiverAccount = await findUserByEmailService(mobileNumber);

    if (senderAccount?.mobileNumber === receiverAccount?.mobileNumber) {
      return res.status(401).json({
        status: "failed",
        error: "You can't send money to your Account !",
      });
    }

    if (!receiverAccount) {
      return res.status(401).json({
        status: "failed",
        error: "No User found with Mobile Number",
      });
    }

    if (amount < 50) {
      return res.status(401).json({
        status: "failed",
        error: "Minimum 50 tk can be sent !",
      });
    }

    await sendMoneyService(amount, senderAccount, receiverAccount);

    return res.status(200).json({
      status: "Success",
      error: "Send Money Successful !",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.cashOut = async (req, res) => {
  try {
    const userAccount = req.user;
    const { agentNumber, amount, password } = req.body;

    if (amount < 50) {
      return res.status(401).json({
        status: "failed",
        error: "Minimum Cash out  limit 50 tk!",
      });
    }

    if (userAccount?.user?.balance < amount) {
      return res.status(401).json({
        status: "failed",
        error: "Insufficient balance !",
      });
    }
    const agentAccount = await findUserByEmailService(agentNumber);

    if (
      !agentAccount ||
      agentAccount?.accountType !== userRole.agent ||
      agentAccount?.status === userStatus.pending
    ) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid Agent Number !",
      });
    }
    const isPasswordCorrect = userAccount.comparePassword(
      password,
      userAccount?.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid password !",
      });
    }
    await cashOutService(amount, userAccount, agentAccount);
    return res.status(200).json({
      status: "Success",
      message: "Cash out successful",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
