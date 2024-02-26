const express = require("express");
const { sendMoney } = require("./user.controller");
const router = express.Router();

router.post("/send-money", sendMoney);

module.exports = router;
