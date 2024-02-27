const express = require("express");
const {
  createCashRequest,
  getAllCashRequest,
  approveCashRequest,
  rejectCashRequest,
} = require("./cashRequest.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const { authorization } = require("../../middleware/authorization");
const { userRole } = require("../../constants");

const router = express.Router();

router.post("/", verifyToken, authorization(userRole.agent), createCashRequest);
router.get("/", verifyToken, authorization(userRole.admin), getAllCashRequest);
router.patch(
  "/approve",
  verifyToken,
  authorization(userRole.admin),
  approveCashRequest
);
router.patch(
  "/reject",
  verifyToken,
  authorization(userRole.admin),
  rejectCashRequest
);

module.exports = router;
