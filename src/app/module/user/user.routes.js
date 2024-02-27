const express = require("express");
const { sendMoney, cashOut } = require("./user.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const { authorization } = require("../../middleware/authorization");
const { userRole } = require("../../constants");
const router = express.Router();

router.post(
  "/send-money",
  verifyToken,
  authorization(userRole.user),
  sendMoney
);
router.post(
  "/cash-out",
  verifyToken,
  verifyToken,
  authorization(userRole.user),
  cashOut
);

module.exports = router;
