const express = require("express");
const { userCashIn } = require("./agent.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const { authorization } = require("../../middleware/authorization");
const { userRole } = require("../../constants");

const router = express.Router();

router.post(
  "/user-cash-in",
  verifyToken,
  authorization(userRole.agent),
  userCashIn
);

module.exports = router;
