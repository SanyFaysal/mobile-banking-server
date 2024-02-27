const express = require("express");
const { verifyToken } = require("../../middleware/verifyToken");
const {
  sendWithdrawRequest,
  approveWithdrawRequest,
  rejectWithdrawRequest,
  getAllWithdrawRequest,
} = require("./withdraw.controller");
const { authorization } = require("../../middleware/authorization");
const { userRole } = require("../../constants");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorization(userRole.agent),
  sendWithdrawRequest
);
router.get(
  "/",
  verifyToken,
  authorization(userRole.admin),
  getAllWithdrawRequest
);
router.patch(
  "/approve",
  verifyToken,
  authorization(userRole.admin),
  approveWithdrawRequest
);
router.patch(
  "/reject",
  verifyToken,
  authorization(userRole.admin),
  rejectWithdrawRequest
);

module.exports = router;
