const express = require("express");
const { verifyToken } = require("../../middleware/verifyToken");
const {
  sendWithdrawRequest,
  approveWithdrawRequest,
  rejectWithdrawRequest,
  getAllWithdrawRequest,
} = require("./withdraw.controller");

const router = express.Router();

router.post("/", verifyToken, sendWithdrawRequest);
router.get("/", verifyToken, getAllWithdrawRequest);
router.patch("/approve", verifyToken, approveWithdrawRequest);
router.patch("/reject", verifyToken, rejectWithdrawRequest);

module.exports = router;
