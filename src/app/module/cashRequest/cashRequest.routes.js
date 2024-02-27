const express = require("express");
const {
  createCashRequest,
  getAllCashRequest,
  approveCashRequest,
  rejectCashRequest,
} = require("./cashRequest.controller");
const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createCashRequest);
router.get("/", verifyToken, getAllCashRequest);
router.patch("/approve", verifyToken, approveCashRequest);
router.patch("/reject", verifyToken, rejectCashRequest);

module.exports = router;
