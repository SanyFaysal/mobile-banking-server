const { generateToken } = require("../../utils/token");
const { findUserByEmailService, signupService } = require("./auth.service");

exports.signup = async (req, res) => {
  try {
    const data = req.body;

    const { email } = data;

    const isAvailableUser = await findUserByEmailService(email);
    if (isAvailableUser) {
      return res.status(404).json({
        status: "failed",
        error: "User already existed",
      });
    }

    const result = await signupService(data);
    const token = generateToken(result);
    res.status(200).json({
      status: "Success",
      message: "Signup successful",
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.findUserByEmail = async (req, res) => {
  try {
    const { emailOrMobileNumber, password } = req.body;

    if (!emailOrMobileNumber || !password) {
      return res.status(401).json({
        status: "failed",
        error: "Please give your credentials",
      });
    }

    const user = await findUserByEmailService(emailOrMobileNumber);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "No result found with this email",
      });
    }

    const isValidPassword = user.comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: "failed",
        error: "Password not matched",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
