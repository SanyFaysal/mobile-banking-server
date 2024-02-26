const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { findUserByEmailService } = require("../module/auth/auth.service");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token?.length) {
      return res.status(403).json({
        status: "failed",
        error: "Token not found",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    if (!decoded?.email) {
      return res.status(403).json({
        status: "failed",
        error: "Token is invalid !",
      });
    }
    const user = await findUserByEmailService(decoded.email);
    req.user = user;
    next();
  } catch (error) {}
};
