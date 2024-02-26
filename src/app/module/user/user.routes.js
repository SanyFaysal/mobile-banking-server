const express = require("express");
const { sendMoney } = require("./user.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/send-money", verifyToken, sendMoney);

module.exports = router;
