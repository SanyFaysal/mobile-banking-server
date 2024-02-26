const express = require("express");
const { sendMoney, cashOut } = require("./user.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/send-money", verifyToken, sendMoney);
router.post("/cash-out", verifyToken, cashOut);

module.exports = router;
